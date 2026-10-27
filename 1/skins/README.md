# Skins do FNAF 1

As skins **Docão e Lia** já vêm prontas e ativas em http://localhost:8000/1/.
Lia substitui a Chica e herda as imagens do Docão pelo campo `baseSkin` do
manifesto. Veja os detalhes em [lia/README.md](lia/README.md).
Para jogar somente com o Docão: http://localhost:8000/1/?skin=docao.
Veja suas imagens em http://localhost:8000/1/skins/.
Para jogar com o Freddy original, use http://localhost:8000/1/?skin=original.
Os arquivos editados estão em `1/skins/docao/images/`; não é preciso executar
o preparador para usar essa skin. Sua documentação fica em `docao/README.md`.

## Criar uma nova skin a partir dos PNGs originais

Na raiz do repositório, execute:

```powershell
python tools/prepare_skin.py
python -m http.server 8000 --bind 127.0.0.1
```

- Galeria dos PNGs extraídos: http://localhost:8000/1/skins/?skin=default
- Jogo com a skin extraída: http://localhost:8000/1/?skin=default
- Jogo original: http://localhost:8000/1/?skin=original

O preparador junta as 20 partes do ZIP em memória e copia os 258 PNGs para
`1/skins/default/images/`. Os arquivos originais continuam intactos.
Execute novamente quando necessário: imagens já existentes são preservadas.

Use a galeria para identificar as cenas e quadros em que o Freddy aparece.
Abra os PNGs correspondentes em um editor de imagens, altere a aparência e
salve no mesmo local, com o mesmo nome, tamanho e transparência. Nas imagens
que agrupam vários elementos, mantenha cada elemento na sua posição.
Uma skin completa pode precisar de mudanças nas câmeras, menus e sustos.

Depois de salvar, recarregue o jogo. O carregador evita o cache dos PNGs a cada
partida. A galeria permite baixar uma cópia, mas edite/salve o resultado na
pasta da skin para que a mudança apareça no jogo.

Para criar outra skin independente:

```powershell
python tools/prepare_skin.py --name meu-freddy
```

Abra http://localhost:8000/1/skins/?skin=meu-freddy para ver a galeria e
http://localhost:8000/1/?skin=meu-freddy para jogar.

Para restaurar um PNG, mova a versão editada para um backup fora da pasta
`images` e execute o preparador novamente com o mesmo nome de skin. Ele repõe
apenas os arquivos ausentes. As imagens extraídas e os manifestos são ignorados
pelo Git, com exceção das skins Docão e Lia prontas. Para compartilhar uma skin, envie
sua pasta com `images/` e `manifest.json`.

Sem um manifesto preparado, o jogo usa as imagens originais. O FNAF 1 inclui
uma cópia local do JSZip 3.10.1 em `1/src/jszip.min.js` e não precisa da CDN.
