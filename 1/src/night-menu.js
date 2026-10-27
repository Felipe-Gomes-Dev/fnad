/* Extra menu entries drawn inside FNAF 1's canvas, in its original coordinate space. */
window.FnafNightMenu = (() => {
    let application;
    let opened = false;
    let selected = 0;
    let hovering = false;
    let suppressUntil = 0;
    let message = '';
    const entry = { x: 150, y: 320, width: 540, height: 65 };
    const rows = [415, 465, 515, 565, 615, 675];

    function inMenu() {
        return application?.currentFrame === 0 && !application.loading &&
            application.run?.rhObjectList?.some(object => object?.ext?.iniName === 'freddy');
    }

    function start(night) {
        if (!inMenu() || !Number.isInteger(night) || night < 1 || night > 5) return false;
        const ini = application.run.rhObjectList.find(object => object?.ext?.iniName === 'freddy')?.ext.ini;
        if (!ini) return false;
        try {
            ini.writePrivateProfileString('freddy', 'level', String(night), 'freddy');
            ini.saveIni();
            // These global counters carry the selection into the intro, HUD and calls.
            for (const object of application.run.rhObjectList) {
                if (object && ['night number', 'night number 2'].includes(object.hoOiList?.oilName)) {
                    object.cpt_Change(night);
                }
            }
            // Same NEXTLEVEL action as the original Continue option.
            application.run.rhQuit = 1;
            application.subAppStopped = true;
            opened = false;
            hovering = false;
            suppressUntil = performance.now() + 500;
            application.canvas.style.cursor = '';
            return true;
        } catch (error) {
            message = 'Não foi possível salvar a noite.';
            console.error('Não foi possível iniciar a noite:', error);
            return false;
        }
    }

    function open() {
        if (!inMenu()) return false;
        opened = true;
        message = '';
        const counter = application.run.rhObjectList.find(object => object?.hoOiList?.oilName === 'night number');
        selected = Math.max(0, Math.min(4, (counter?.rsValue || 1) - 1));
        // Keep menu clicks from carrying into the original New Game / Continue.
        application.mouseX = -1;
        application.mouseY = -1;
        application.canvas.focus();
        return true;
    }

    function close() {
        opened = false;
        hovering = false;
        message = '';
        application.canvas.style.cursor = '';
    }

    function draw() {
        if (!inMenu()) {
            opened = false;
            return;
        }
        const canvas = application.canvas;
        const context = canvas.getContext('2d');
        const renderer = application.context;
        const oldEffect = renderer.oldEffect;
        const oldSmoothing = renderer.oldSmoothing;
        context.save();
        context.setTransform(canvas.width / 1280, 0, 0, canvas.height / 720, 0, 0);
        context.globalAlpha = 1;
        context.globalCompositeOperation = 'source-over';
        context.textAlign = 'left';
        context.textBaseline = 'alphabetic';
        context.font = '43px Consolas, monospace';
        context.fillStyle = '#eee';
        if (opened) {
            // Only replace the option list. Keep the title, Docão and original static.
            context.fillStyle = '#000';
            context.fillRect(70, 315, 660, 383);
            // Restore the game's moving static over the cleared option area.
            const noise = application.run.rhObjectList.find(object => object?.hoOiList?.oilName === 'static');
            if (noise) {
                context.save();
                context.beginPath();
                context.rect(70, 315, 660, 383);
                context.clip();
                renderer.oldEffect = -1;
                noise.draw(renderer, 0, 0);
                context.restore();
            }
            context.globalAlpha = 1;
            context.fillStyle = '#ddd';
            context.font = '30px Consolas, monospace';
            context.fillText('Escolher noite', 170, 357);
            context.font = '43px Consolas, monospace';
            rows.forEach((y, index) => {
                if (index === 5) context.font = '30px Consolas, monospace';
                context.fillText(index === 5 ? 'Voltar' : 'Noite ' + (index + 1), 170, y);
                if (selected === index) context.fillText('>>', 100, y);
            });
            if (message) {
                context.font = '19px Consolas, monospace';
                context.fillText(message, 170, 700);
            }
        } else {
            context.fillText('Escolher noite', 170, 365);
            if (hovering) context.fillText('>>', 100, 365);
        }
        context.restore();
        renderer.oldEffect = oldEffect;
        renderer.oldSmoothing = oldSmoothing;
    }

    function point(event) {
        const source = event.changedTouches?.[0] || event;
        const rect = application.canvas.getBoundingClientRect();
        return {
            x: (source.clientX - rect.left) * 1280 / rect.width,
            y: (source.clientY - rect.top) * 720 / rect.height
        };
    }

    function hit(position) {
        if (!opened) {
            return position.x >= entry.x && position.x <= entry.x + entry.width &&
                position.y >= entry.y && position.y <= entry.y + entry.height ? 0 : -1;
        }
        if (position.x < 90 || position.x > 700) return -1;
        return rows.findIndex(y => position.y >= y - 38 && position.y <= y + 8);
    }

    function pointer(event) {
        if (!inMenu() && performance.now() >= suppressUntil) return;
        const index = hit(point(event));
        const consumed = opened || index !== -1 || performance.now() < suppressUntil;
        if (!consumed) {
            hovering = false;
            application.canvas.style.cursor = '';
            return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        if (event.type === 'pointermove' || event.type === 'mousemove' || event.type === 'touchmove') {
            hovering = index !== -1;
            if (opened && index !== -1) selected = index;
            application.canvas.style.cursor = index !== -1 ? 'pointer' : '';
        }
        const activate = event.type === 'pointerdown' ||
            (!window.PointerEvent && (event.type === 'mousedown' || event.type === 'touchstart'));
        if (!activate || performance.now() < suppressUntil || index === -1) return;
        if (!opened) open();
        else if (index === 5) close();
        else start(index + 1);
    }

    function keyboard(event) {
        if (!inMenu()) return;
        if (!opened) {
            if (event.key.toLowerCase() !== 'n') return;
            event.preventDefault();
            event.stopImmediatePropagation();
            open();
            return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        if (event.key === 'Escape') close();
        else if (event.key === 'ArrowDown' || event.key === 'Tab' && !event.shiftKey) selected = (selected + 1) % 6;
        else if (event.key === 'ArrowUp' || event.key === 'Tab' && event.shiftKey) selected = (selected + 5) % 6;
        else if (/^[1-5]$/.test(event.key)) start(Number(event.key));
        else if (event.key === 'Enter' || event.key === ' ') {
            if (selected === 5) close();
            else start(selected + 1);
        }
    }

    return {
        start,
        open,
        close,
        attach(app) {
            application = app;
            application.canvas.tabIndex = 0;
            // Draw within the original canvas, including when it is fullscreen.
            const step = application.stepApplication;
            application.stepApplication = function (...args) {
                const result = step.apply(this, args);
                draw();
                return result;
            };
            for (const type of ['pointerdown', 'pointermove', 'pointerup', 'mousedown', 'mousemove', 'mouseup', 'click', 'touchstart', 'touchmove', 'touchend']) {
                application.canvas.addEventListener(type, pointer, { capture: true, passive: false });
            }
            window.addEventListener('keydown', keyboard, true);
        }
    };
})();
