/* Replace PNG resources while keeping the original archive as a fallback. */
window.FnafSkins = (() => {
    const skin = new URLSearchParams(location.search).get('skin') ||
        document.currentScript.dataset.defaultSkin || 'default';
    const revision = Date.now();
    const safeFile = /^[a-zA-Z0-9_-]+\.png$/;
    const safeSkin = /^[a-zA-Z0-9_-]+$/;
    async function loadSkin(name, seen = new Set()) {
        if (name === 'original' || !safeSkin.test(name) || seen.has(name)) {
            throw new Error('Herança de skin inválida');
        }
        seen.add(name);
        const base = new URL(`skins/${name}/`, location.href);
        const response = await fetch(new URL('manifest.json', base), { cache: 'no-store' });
        if (!response.ok) throw new Error(`Skin indisponível: ${name}`);
        const manifest = await response.json();
        if (!Array.isArray(manifest.images)) throw new Error('Manifesto inválido');
        const layers = manifest.baseSkin ? await loadSkin(manifest.baseSkin, seen) : [];
        return [...layers, { base, manifest }];
    }
    // Load once, early enough to also replace the loading-screen character.
    const manifestPromise = (async () => {
        if (skin === 'original') return null;
        if (!safeSkin.test(skin)) return null;
        try {
            const layers = await loadSkin(skin);
            for (const { base, manifest } of layers) {
                if (typeof manifest.launcher === 'string' && safeFile.test(manifest.launcher)) {
                    const character = document.getElementById('animatronic');
                    if (character) character.src = new URL(`${manifest.launcher}?v=${revision}`, base).href;
                }
            }
            return layers;
        } catch (error) {
            console.warn('Não foi possível carregar a skin. Usando imagens originais.', error);
            return null;
        }
    })();
    return {
        async apply(resources) {
            const loaded = await manifestPromise;
            if (!loaded) return;
            for (const { base, manifest } of loaded) {
                for (const entry of manifest.images) {
                    if (!entry || typeof entry.name !== 'string' || !safeFile.test(entry.name)) continue;
                    // A unique query avoids showing an older version after an edit.
                    const url = new URL(`images/${entry.name}`, base);
                    url.searchParams.set('v', revision);
                    resources.set(entry.name, url.href);
                }
            }
        }
    };
})();
