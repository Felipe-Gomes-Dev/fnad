/* Replace PNG resources while keeping the original archive as a fallback. */
window.FnafSkins = (() => {
    const skin = new URLSearchParams(location.search).get('skin') ||
        document.currentScript.dataset.defaultSkin || 'default';
    const revision = Date.now();
    const safeFile = /^[a-zA-Z0-9_-]+\.png$/;
    // Load once, early enough to also replace the loading-screen character.
    const manifestPromise = (async () => {
        if (skin === 'original') return null;
        if (!/^[a-zA-Z0-9_-]+$/.test(skin)) return null;
        try {
            const base = new URL(`skins/${skin}/`, location.href);
            const response = await fetch(new URL('manifest.json', base), { cache: 'no-store' });
            if (!response.ok) return null;
            const manifest = await response.json();
            if (!Array.isArray(manifest.images)) throw new Error('Manifesto inválido');
            if (typeof manifest.launcher === 'string' && safeFile.test(manifest.launcher)) {
                const character = document.getElementById('animatronic');
                if (character) character.src = new URL(`${manifest.launcher}?v=${revision}`, base).href;
            }
            return { base, manifest };
        } catch (error) {
            console.warn('Não foi possível carregar a skin. Usando imagens originais.', error);
            return null;
        }
    })();
    return {
        async apply(resources) {
            const loaded = await manifestPromise;
            if (!loaded) return;
            for (const entry of loaded.manifest.images) {
                if (!entry || typeof entry.name !== 'string' || !safeFile.test(entry.name)) continue;
                // A unique query avoids showing an older version after an edit.
                const url = new URL(`images/${entry.name}`, loaded.base);
                url.searchParams.set('v', revision);
                resources.set(entry.name, url.href);
            }
        }
    };
})();
