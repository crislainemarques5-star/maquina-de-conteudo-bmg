"""
Fórmulas estruturais em vetor (SVG) para o fundo "bioquímica" dos carrosséis e microreels.
Busca a estrutura oficial no PubChem (SMILES), gera coordenadas 2D com o RDKit e desenha em linha,
sem fundo, com as ligações como caminhos animáveis (pathLength=1 para o efeito de "a molécula se monta").

    python motor/moleculas.py            gera marca/moleculas/<nome>.svg para todos de conteudo/moleculas.json
    python motor/moleculas.py "creatine"  também gera nomes avulsos (nome em inglês, como no PubChem)
"""
import json, re, sys, time, urllib.request, urllib.parse
from pathlib import Path
from rdkit import Chem
from rdkit.Chem import AllChem, rdDepictor
from rdkit.Chem.Draw import rdMolDraw2D

RAIZ = Path(__file__).resolve().parent.parent
SAIDA = RAIZ / "marca" / "moleculas"
SAIDA.mkdir(parents=True, exist_ok=True)
MAPA = json.loads((RAIZ / "conteudo" / "moleculas.json").read_text(encoding="utf-8"))


def smiles(nome):
    url = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" + urllib.parse.quote(nome) + "/property/IsomericSMILES,ConnectivitySMILES/JSON"
    with urllib.request.urlopen(url, timeout=30) as r:
        p = json.load(r)["PropertyTable"]["Properties"][0]
    return p.get("IsomericSMILES") or p.get("SMILES") or p.get("ConnectivitySMILES")


def desenhar(nome, arq):
    smi = smiles(nome)
    mol = Chem.MolFromSmiles(smi)
    # sem hidrogênios explícitos; maior fragmento (sais e complexos ficam com a parte orgânica principal)
    frags = Chem.GetMolFrags(mol, asMols=True)
    mol = max(frags, key=lambda m: m.GetNumHeavyAtoms())
    rdDepictor.SetPreferCoordGen(True)
    rdDepictor.Compute2DCoords(mol)
    d = rdMolDraw2D.MolDraw2DSVG(1200, 1200)
    o = d.drawOptions()
    o.clearBackground = False
    o.bondLineWidth = 3
    o.useBWAtomPalette()
    o.padding = 0.08
    o.fixedFontSize = 34
    o.minFontSize = 30
    d.DrawMolecule(mol)
    d.FinishDrawing()
    svg = d.GetDrawingText()
    svg = re.sub(r"<\?xml[^>]*>\s*", "", svg)
    svg = re.sub(r"<rect[^>]*/>", "", svg, count=1)  # fundo
    # cada ligação vira caminho animável; cores viram "currentColor" para o CSS pintar
    def anima(m):
        tag = m.group(0)
        k = re.search(r"class='bond-(\d+)", tag)
        if not k:
            return tag
        tag = tag.replace("<path ", "<path pathLength='1' ", 1)
        return re.sub(r"style='", f"style='--k:{k.group(1)};", tag, count=1)
    svg = re.sub(r"<path [^>]*>", anima, svg)
    svg = re.sub(r"stroke:#[0-9A-Fa-f]{6}", "stroke:currentColor", svg)
    svg = re.sub(r"fill:#[0-9A-Fa-f]{6}", "fill:currentColor", svg)
    svg = re.sub(r"fill='#[0-9A-Fa-f]{6}'", "fill='currentColor'", svg)
    arq.write_text(svg, encoding="utf-8")
    return mol.GetNumHeavyAtoms()


extras = [x for x in sys.argv[1:] if not x.startswith("--")]  # nomes avulsos (slide ou cena "molecula")
nomes = sorted(set(MAPA.values()) | set(extras))
for nome in nomes:
    arq = SAIDA / (re.sub(r"[^a-z0-9]+", "-", nome.lower()).strip("-") + ".svg")
    if arq.exists() and "--refazer" not in sys.argv:
        print("=", nome)
        continue
    try:
        n = desenhar(nome, arq)
        print("ok", nome, n, "átomos")
    except Exception as e:
        print("FALHOU", nome, e)
    time.sleep(0.4)
