# Lia / Chica — FNAF 1

A Lia da referência substitui a Chica em 26 PNGs: três quadros do palco,
refeitório, seis cenas de câmera (banheiros, corredor e canto leste) e os
16 quadros do susto no escritório. O laço vinho, as bochechas rosas, o focinho
com duas narinas, os olhos luminosos e o babador “Lia” seguem `reference.png`.

Ativa por padrão em http://localhost:8000/1/.
Galeria: http://localhost:8000/1/skins/?skin=lia.
Somente Docão: http://localhost:8000/1/?skin=docao.
Original: http://localhost:8000/1/?skin=original.

O manifesto usa `baseSkin: docao`: primeiro são carregadas as substituições
do Freddy pelo Docão; depois os quadros da Lia. Os três palcos compartilhados
já contêm os dois personagens. As demais imagens do Docão são reutilizadas
diretamente, sem duplicação. A galeria Lia exibe somente seus 26 PNGs.

As imagens foram criadas com a ferramenta integrada `image_gen`, usando a
referência enviada e atlas das cenas existentes. Os prompts completos estão
em `prompts.md`. Os três atlas finais estão em `atlases/`; `frames.json`
registra os nomes e o número de colunas de cada atlas, em ordem de leitura.
Cada célula foi separada e redimensionada para as dimensões do PNG original.

Como na skin Docão, esta é uma adaptação de imagens, sem trocar modelos 3D,
sons ou comportamento. Cartazes, cabeças decorativas e ilustrações da tela
de encerramento continuam originais. A geração em atlas pode produzir pequenas
variações visuais entre quadros e definição inferior à dos recursos originais.
