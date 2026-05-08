from typing import Optional, Dict, Any, List
from pydantic import BaseModel


class SampleInput(BaseModel):
    sample_id: Optional[str] = "manual_sample"

    cancer_type: Optional[str] = None

    ATRX_status: Optional[Any] = None
    DAXX_status: Optional[Any] = None
    H3F3A_status: Optional[Any] = None
    BRCA1_status: Optional[Any] = None

    C_circle_score: Optional[Any] = 0
    APB_score: Optional[Any] = 0
    telomere_length_heterogeneity: Optional[Any] = 0
    TERT_or_telomerase_score: Optional[Any] = 0

    SLX4IP_expression: Optional[Any] = 50
    FANCM_expression: Optional[Any] = 50
    BLM_expression: Optional[Any] = 0
    RAD52_expression: Optional[Any] = 0
    POLD3_expression: Optional[Any] = 0
    SMARCAL1_expression: Optional[Any] = 0
    EXD2_expression: Optional[Any] = 0
    DNA2_expression: Optional[Any] = 0
    WEE1_expression: Optional[Any] = 0
    FANCM_dependency_score: Optional[Any] = 0

    pRPA_score: Optional[Any] = 0
    pCHK1_score: Optional[Any] = 0
    gammaH2AX_score: Optional[Any] = 0
    ssDNA_gap_score: Optional[Any] = 0
    ADPr_score: Optional[Any] = 0
    telomere_fragility_score: Optional[Any] = 0
    telomeric_EdU_score: Optional[Any] = 0


class BatchResult(BaseModel):
    results: List[Dict[str, Any]]