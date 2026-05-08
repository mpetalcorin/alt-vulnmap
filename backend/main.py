from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from io import StringIO

from models import SampleInput
from scoring import analyze_sample
from knowledge_base import ALT_PROTEINS, SYNTHETIC_LETHAL_PAIRS

app = FastAPI(
    title="ALT-VulnMap API",
    description="Synthetic lethality and vulnerability scoring for ALT-positive cancers.",
    version="1.0.0",
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "ALT-VulnMap API is running",
        "endpoints": [
            "/analyze",
            "/batch-analyze",
            "/knowledge/proteins",
            "/knowledge/synthetic-lethal-pairs",
            "/template",
        ],
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze")
def analyze(input_data: SampleInput):
    sample = input_data.model_dump()
    return analyze_sample(sample)


@app.post("/batch-analyze")
async def batch_analyze(file: UploadFile = File(...)):
    contents = await file.read()
    text = contents.decode("utf-8")
    df = pd.read_csv(StringIO(text))

    results = []
    for _, row in df.iterrows():
        sample = row.to_dict()
        results.append(analyze_sample(sample))

    return {"results": results}


@app.get("/knowledge/proteins")
def proteins():
    return {"proteins": ALT_PROTEINS}


@app.get("/knowledge/synthetic-lethal-pairs")
def synthetic_lethal_pairs():
    return {"pairs": SYNTHETIC_LETHAL_PAIRS}


@app.get("/template")
def template():
    columns = [
        "sample_id",
        "cancer_type",
        "ATRX_status",
        "DAXX_status",
        "H3F3A_status",
        "BRCA1_status",
        "C_circle_score",
        "APB_score",
        "telomere_length_heterogeneity",
        "TERT_or_telomerase_score",
        "SLX4IP_expression",
        "FANCM_expression",
        "BLM_expression",
        "RAD52_expression",
        "POLD3_expression",
        "SMARCAL1_expression",
        "EXD2_expression",
        "DNA2_expression",
        "WEE1_expression",
        "FANCM_dependency_score",
        "pRPA_score",
        "pCHK1_score",
        "gammaH2AX_score",
        "ssDNA_gap_score",
        "ADPr_score",
        "telomere_fragility_score",
        "telomeric_EdU_score",
    ]

    example = {
        "sample_id": "U2OS_like_ALT_sample",
        "cancer_type": "osteosarcoma",
        "ATRX_status": "loss",
        "DAXX_status": "normal",
        "H3F3A_status": "normal",
        "BRCA1_status": "normal",
        "C_circle_score": 95,
        "APB_score": 85,
        "telomere_length_heterogeneity": 90,
        "TERT_or_telomerase_score": 5,
        "SLX4IP_expression": 15,
        "FANCM_expression": 70,
        "BLM_expression": 85,
        "RAD52_expression": 75,
        "POLD3_expression": 70,
        "SMARCAL1_expression": 65,
        "EXD2_expression": 60,
        "DNA2_expression": 60,
        "WEE1_expression": 75,
        "FANCM_dependency_score": 80,
        "pRPA_score": 90,
        "pCHK1_score": 85,
        "gammaH2AX_score": 80,
        "ssDNA_gap_score": 85,
        "ADPr_score": 75,
        "telomere_fragility_score": 90,
        "telomeric_EdU_score": 70,
    }

    return {
        "columns": columns,
        "example": example,
        "notes": "Scores can be numeric 0 to 100. Status fields can use loss, low, normal, high, wildtype, mutant, deficient, present, absent.",
    }