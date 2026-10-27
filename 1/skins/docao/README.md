# Skin Docão — FNAF 1

Skin criada a partir da referência enviada pelo usuário. Ativa por padrão no FNAF 1.

- Jogar: http://localhost:8000/1/
- Comparar com original: http://localhost:8000/1/?skin=original
- Galeria das substituições: http://localhost:8000/1/skins/?skin=docao

Contém 61 PNGs substitutos: seis cenas de palco; duas animações de susto (20 e 28 quadros); quatro quadros do menu; sala de peças, refeitório e close-up de alucinação. O recorte `preview.png` aparece no carregamento.
Os cenários e poses foram adaptados com geração de imagem; não são uma troca de modelo 3D. A lógica, os sons e as demais imagens continuam sendo os do jogo. Cartazes, ícones e cabeças decorativas do cenário podem continuar mostrando o Freddy original. Alguns quadros foram gerados em atlas e ampliados ao tamanho exigido pelo runtime, por isso podem ter menos definição que as texturas originais.

Edite os PNGs em `images/`, preservando nomes e dimensões. O manifesto lista apenas as substituições: o restante vem do ZIP original. Os arquivos desta skin são versionáveis; os arquivos extraídos da skin `default` continuam ignorados.

## Geração dos recursos

Ferramenta usada: image_gen integrada (sem CLI/API externa). Referência original preservada em `reference.jpeg`. Atlas gerados foram separados e redimensionados mecanicamente, sem mudar a ordem dos quadros. Todos os PNGs finais mantêm as dimensões esperadas pelos recursos originais.

Correção de iluminação: os seis quadros do palco (`0002.png`, `0019.png`,
`0068.png`, `0223.png`, `0224.png`, `0355.png`) foram escurecidos para integrar
o Docão à iluminação dos outros animatrônicos. As dimensões continuam 1600 × 720.

Prompts utilizados:

### Correção da exposição do palco

Use case: lighting-weather (localized exposure correction). Asset type: FNAF 1 stage camera six-frame sprite atlas. Image 1 is the EDIT TARGET: 2 columns x3 rows, six landscape cells with Docão the gold-orange pig on the RIGHT of each cell. Image 2 is ONLY a LIGHTING REFERENCE: original stage with Freddy bear on right, showing how deeply shadowed the right-side animatronic must be. Edit Image 1 ONLY by substantially DARKENING Docão in ALL SIX cells to match the dark exposure of the reference bear and the neighboring Bonnie/Chica. The current bright warm studio keylight on Docão is wrong. Remove that strong orange/yellow illumination, reduce diffuse exposure on head/body/ears/snout by around 2.5 stops (~80% less light), use cool dim ambient stage light and deep black shadow across chest and face like reference. Keep subtle highlights on microphone and faint blue eyes, allow red cheeks/snout to remain barely visible in shadow; do not make him luminous. Docão should blend naturally into this VERY DARK stage and never be the brightest character. PRESERVE EXACT Docão pig identity, pointed ears, red pig snout/cheeks, black top hat, bowtie, red C! chest, all six poses, camera framing and scale. Preserve Bonnie, Chica, stage, stars, floor, walls, and all pixels outside Docão as closely as possible; do NOT darken whole sheet. Do NOT restore Freddy. STRICT same 2-column 3-row edge-to-edge grid without margins/gutters/labels/text. Return corrected Image1 atlas only.

### Retrato inicial do menu

Use case: precise-object-edit. Asset type: FNAF 1 browser game main menu background, landscape 1280x720. Image 1 is the character identity reference Docão, an orange-gold pig animatronic with pointed ears, red round cheeks, red pig snout with two nostrils, pale blue eyes, black top hat and bow tie, scratched plastic and metal. Image 2 is the edit target (0431.png). Replace Freddy's head and shoulder on the RIGHT with this exact Docão identity, matching the target's closeup pose, scary dark lighting, scale and cropping. Keep LEFT 55 percent perfectly black empty space for existing game UI. Keep black background, harsh very dim light, game-render aesthetic. Do not add text, UI, watermark or other characters. Single seamless image, not a sheet.

### Palco: 2 × 3 quadros

Use case: precise-object-edit. Asset type: game sprite atlas. Image 1 is Docão character identity reference. Image 2 is EDIT TARGET, an EXACT 2 columns by 3 rows atlas of SIX 1600:720 landscape stage camera frames. Keep the exact 2x3 regular grid, NO margins, NO gutters, NO labels. Replace ONLY Freddy the brown BEAR standing on RIGHT of EVERY cell with the reference orange-gold PIG Docão: pointed pig ears, wide red snout with 2 nostrils, round red cheeks, blue eyes, black top hat/bow tie, red chest with cream C! emblem. Match Freddy's exact location, scale, pose, microphone and shadow in each frame. Preserve Bonnie purple rabbit and Chica yellow chicken and their poses precisely in cells where present. Preserve all stage walls, stars, checkered tiles, camera angle and composition. Same spooky dark low-light early 3D render game aesthetic. Do not add characters in empty areas. Maintain every panel's independent composition. Render sharp high resolution 3200x2160 if possible. Output ONLY the modified six-frame atlas.

### Susto no escuro: 4 × 5 quadros

Use case: precise-object-edit. Asset type: FNAF 1 blackout jumpscare animation sprite atlas. Image 1: Docão identity reference, a gold-orange pig animatronic, pointed ears, red round cheeks, red snout two nostrils, blue eyes, black top hat, black bow tie, red chest with cream C! emblem. Image 2: EDIT TARGET, a STRICT FOUR COLUMNS and FIVE ROWS sprite sheet (20 equal LANDSCAPE 16:9 cells). Replace Freddy bear with this reference Docão pig in EVERY cell, preserving each cell's EXACT independent framing, relative subject scale, progression, head rotations and motion blur. Start with top of hat entering from bottom in row 1, then full face appears in row 2, then tilted head approaches camera rows 3-4, then extreme closeup eyes/snout in row 5. Last cell row5 col4 is top of head entering, preserve that pose. Keep pure BLACK backgrounds, no office. Scary yet non-gory 3D game render, realistic worn metal/plastic. Red snout MUST be pig snout, not bear nose. Keep EXACT four-by-five edge-to-edge grid and uniform cells; no borders, labels, text, gutters, padding or extra rows. Preserve all 20 frames. Render 2560x1800 if possible. Output modified sprite atlas ONLY.

### Susto no escritório: 4 × 7 quadros

Use case: precise-object-edit. Asset type: FNAF1 office jumpscare sprite animation atlas, STRICT FOUR columns x SEVEN rows =28 equal landscape cells. Image1 is identity reference Docão: worn golden-orange PIG animatronic with pointed ears, circular red cheek plates, red pig snout with TWO nostrils (not bear nose), blue eyes, black top hat and bowtie, red torso cream C! emblem. Image2 is the EDIT TARGET 4x7 animation sprite atlas. Replace ONLY Freddy bear in every one of 28 cells with Docão, same exact pose/progression/scale/rotation, mouth opening, lunging movement and framing. Preserve office backgrounds in each cell, security desk, fan, posters, doorways, dark red and cold light. First row starts with barely visible hat rising from bottom-right; by second row open mouth face rises center; later rows lunge with angled head filling view. Preserve those pose differences; do NOT use identical faces for all frames. Keep exact 4 COLUMNS and 7 ROWS edge-to-edge uniform grid and background alignment, NO margins/gutters/labels/borders. Match input aspect ratio and render as high resolution as possible (3200x2520). Only modify Freddy's character identity. No gore. Return ONLY modified 28-frame atlas.

### Cenas adicionais: 2 × 2 quadros

Use case: precise-object-edit. Asset type: game texture atlas. Image1 is Docão reference, gold-orange pig robot with pointed ears, red snout two nostrils, round red cheeks, blue eyes, black hat and bowtie, red torso with cream C! emblem. Image2 is edit target EXACT 2 COLUMNS by 2 ROWS atlas (four equal landscape 20:9 panels). Keep EXACT 2x2 edge-to-edge grid NO padding/borders/labels. In TOP LEFT replace foreground Freddy bear in storage room with Docão, keep body position/scale, all spare heads and room background unchanged. TOP RIGHT contains Freddy mostly in shadow at rear center of dining room behind tables: replace distant shadow Freddy with Docão at same distance, keep all tables/hats/chairs/light/background precisely unchanged, faint red pig snout under eyes, do not add foreground character. BOTTOM LEFT replace extreme full-frontal Freddy bear face with the same Docão pig face at same extreme-close-up scale, large staring blue eyes and prominent pig snout. BOTTOM RIGHT replace Freddy's menu portrait on right with Docão's head shoulder at same position and dim lighting, keep left half black. Keep every panel distinct, match original framing and dark game-render style. Render high resolution 3200x1440 if possible. Output only four-panel modified atlas.

### Recorte do carregamento

Use case: background-extraction. Asset type: browser game loading-screen character cutout. Edit the input Docão character reference: remove ONLY the black background and reflective floor. Preserve exactly the entire pig animatronic character, all its details, colors, pose, black top hat and bowtie, gold-orange body, red snout, red cheeks, blue eyes, red chest C! emblem and microphone. Full body visible from top of hat to bottom of feet with a small transparent margin. Actual transparent alpha background, no floor or shadow, no checkerboard painted into image. Sharp clean edges, no added elements.

### Animação do menu: 2 × 2 quadros

Use case: precise-object-edit. Asset: 2x2 sprite sheet of FOUR FNAF1 menu flicker animation frames. Image1 is Docão identity (gold-orange pig, pointed ears, red cheek discs, red two-nostril pig snout, blue eyes, black hat bowtie). Image2 EDIT TARGET is strict 2 columns x2 rows atlas four equal 16:9 cells. Image3 supporting approved Docão menu portrait reference for lighting/identity. Replace Freddy with Docão in same right-side position and head scale in each cell, preserving pose differences: top-left normal closed jaw staring, top-right jaw wide open mechanical mouth, bottom-left tilted head eyes looking sideways and mouth ajar, bottom-right same pig's exposed chrome mechanical endoskeleton skull with eyes and jaws, no outer orange face. Each frame keep LEFT 55% empty pure BLACK for menu text. Same dim hard light from left, scary early 3D render, no gore. Exact 2x2 equal edge-to-edge grid, no extra panels/gutters/borders/labels/text. Match reference head identity and preserve each panel's independent composition. Output only modified atlas, high resolution 2560x1440 if possible.
