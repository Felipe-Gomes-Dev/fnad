const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('1/skins/loader.js', 'utf8');
async function load(search = '', manifests) {
    const requests = [];
    const character = {};
    const context = { URL, URLSearchParams, Date, Set, console: { warn() {} },
        location: { search, href: `http://localhost/1/${search}` },
        document: { currentScript: { dataset: { defaultSkin: 'lia' } }, getElementById: () => character },
        fetch: async url => {
            const skin = new URL(url).pathname.split('/')[3];
            requests.push(skin);
            const manifest = manifests ? manifests[skin] : JSON.parse(fs.readFileSync(`1/skins/${skin}/manifest.json`));
            return { ok: !!manifest, json: async () => manifest };
        }, window: {} };
    vm.runInNewContext(source, context);
    const resources = new Map([['untouched.png', 'original']]);
    await context.window.FnafSkins.apply(resources);
    return { resources, requests, character };
}
test('Lia overrides shared stages, inherits Docão and preserves fallback resources', async () => {
    const { resources, character } = await load();
    assert.match(resources.get('0002.png'), /skins\/lia\/images\/0002.png/);
    assert.match(resources.get('0065.png'), /skins\/lia\/images\/0065.png/);
    assert.match(resources.get('0431.png'), /skins\/docao\/images\/0431.png/);
    assert.match(character.src, /skins\/docao\/preview.png/);
    assert.equal(resources.size, 85);
    assert.equal(resources.get('untouched.png'), 'original');
});
test('Original bypasses manifests and Docão remains independently selectable', async () => {
    const original = await load('?skin=original');
    assert.equal(original.resources.size, 1);
    assert.equal(original.requests.length, 0);
    const docao = await load('?skin=docao');
    assert.equal(docao.resources.size, 62);
    assert.equal(docao.resources.has('0065.png'), false);
});
test('Missing parents, inheritance cycles and unsafe names fall back without partial overrides', async () => {
    for (const manifests of [
        { lia: { baseSkin: 'missing', images: [] } },
        { lia: { baseSkin: 'lia', images: [] } },
        { lia: { baseSkin: '../escape', images: [] } },
    ]) {
        const { resources } = await load('', manifests);
        assert.equal(resources.size, 1);
    }
});
