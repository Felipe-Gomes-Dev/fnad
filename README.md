# FNAD

Versão para navegador do **Five Nights at Freddy’s 1**, com a skin do **Docão**
e seleção das noites 1 a 5 integrada ao menu original.

Este repositório contém apenas o primeiro jogo. Não há etapa de compilação,
servidor de aplicação ou dependências para instalar com npm.

## Como rodar localmente

Pré-requisitos: **Python 3** e um navegador atualizado.

```powershell
git clone https://github.com/Felipe-Gomes-Dev/fnad.git
cd fnad
python -m http.server 8000 --bind 127.0.0.1
```

Abra **http://localhost:8000/**. A página inicial direciona para o jogo em
http://localhost:8000/1/.

Se você já está com o projeto aberto no terminal, basta executar o último
comando na raiz do repositório. No Windows, você também pode usar
`py -m http.server 8000 --bind 127.0.0.1`.

Mantenha o terminal aberto enquanto joga e pressione **Ctrl+C** para encerrar
o servidor. Se a porta 8000 estiver ocupada, use outra, como 8001, e altere
a porta no endereço do navegador.

Use o servidor HTTP em vez de abrir o HTML diretamente: o jogo precisa
carregar seus recursos via `fetch`. Os arquivos `resources.zip.part1` até
`resources.zip.part20` são reunidos automaticamente durante o carregamento;
não é necessário extrair ou juntar esses arquivos manualmente. O JSZip está
incluído localmente, então o FNAF 1 funciona sem depender de uma CDN.

## Jogar

- **Escolher noite:** no menu original, abre as noites 1 a 5.
- **Teclado:** N abre a seleção; setas navegam; Enter confirma; Esc volta.
  Dentro da seleção, as teclas 1 a 5 também iniciam a noite correspondente.
- **Tela cheia:** pressione **- e = ao mesmo tempo**; Esc sai da tela cheia.
- A noite escolhida fica disponível em **Continue**, preservando as demais
  conquistas. O progresso é salvo no armazenamento local do navegador.

A skin Docão está ativa por padrão. Para usar as imagens originais do Freddy,
abra http://localhost:8000/1/?skin=original.

## Skins e arquivos do projeto

- `index.html`: entrada do projeto, direcionando para o FNAF 1.
- `1/`: jogo, runtime, recursos e bibliotecas locais.
- `1/src/night-menu.js`: seleção de noites no próprio menu do jogo.
- `1/skins/docao/`: skin Docão, incluída no versionamento.
- `tools/prepare_skin.py`: prepara cópias editáveis dos PNGs originais.

A galeria da skin está em http://localhost:8000/1/skins/.
As instruções para editar ou criar skins estão em
[1/skins/README.md](1/skins/README.md), e os prompts e detalhes da skin Docão
estão em [1/skins/docao/README.md](1/skins/docao/README.md).

Para preparar uma nova skin a partir das imagens originais:

```powershell
python tools/prepare_skin.py --name minha-skin
```

Depois abra http://localhost:8000/1/?skin=minha-skin. As imagens extraídas de
skins de trabalho são ignoradas pelo Git; a skin Docão pronta é a exceção.
A pasta `tmp/` contém apenas arquivos locais de trabalho e backups e não faz
parte do projeto versionado.

## Referência e créditos

Este projeto utiliza como **base e referência** o repositório original
[irv77/hd_fnaf](https://github.com/irv77/hd_fnaf), do qual foi mantido apenas
o FNAF 1 para navegador. A skin Docão e o seletor de noites são adaptações
locais sobre essa base.

Five Nights at Freddy’s é uma criação de **Scott Cawthon**. Este projeto é
não oficial e não é aprovado, associado ou endossado por Scott Cawthon.
Os recursos originais e o runtime mantêm os direitos e avisos de seus autores.

O FNAF 1 inclui o **JSZip 3.10.1**, que utiliza o pako. Os avisos e licenças
estão preservados em `1/src/jszip.min.js`,
[JSZip-LICENSE.markdown](1/src/JSZip-LICENSE.markdown) e
[pako-LICENSE](1/src/pako-LICENSE).
