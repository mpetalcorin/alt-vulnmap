# ALT-VulnMap

ALT-VulnMap is a research decision-support app for exploring vulnerabilities in ALT-positive cancers.

It integrates:

- ALT biomarker scoring
- Telomere replication-stress scoring
- Synthetic-lethality vulnerability ranking
- Protein-axis network visualisation
- Batch CSV upload
- Experimental assay recommendation
- PDF report export

## Main biological axes

- SLX4IP, FANCM, BLM
- ATR, CHK1, WEE1
- RAD52, POLD3
- SMARCAL1, FANCM
- EXD2, DNA2, BLM, POLD3
- BRCA1, FANCM
- ATRX, DAXX, H3.3

## Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
Disclaimer

This app is for research and hypothesis generation only. It is not a clinical diagnostic or treatment recommendation tool.
