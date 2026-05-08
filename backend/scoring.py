import math
from typing import Dict, Any, List


def clamp(value: float, minimum: float = 0, maximum: float = 100) -> float:
    return max(minimum, min(maximum, value))


def safe_float(value, default=0.0):
    try:
        if value is None:
            return default
        if isinstance(value, str) and value.strip() == "":
            return default
        return float(value)
    except Exception:
        return default


def status_score(value) -> float:
    """
    Converts common status labels into numeric scores.
    """
    if value is None:
        return 0.0

    text = str(value).strip().lower()

    if text in ["loss", "lost", "deficient", "mutant", "mutation", "low", "negative", "0", "absent"]:
        return 100.0
    if text in ["partial", "reduced", "intermediate", "heterogeneous"]:
        return 60.0
    if text in ["wildtype", "wt", "normal", "present", "high", "positive"]:
        return 0.0

    return safe_float(value, 0.0)


def expression_low_score(value) -> float:
    """
    High score means the protein is low or lost.
    If numeric, assumes 0 to 100 scale where lower expression is more abnormal.
    """
    if isinstance(value, str):
        text = value.strip().lower()
        if text in ["loss", "lost", "low", "absent", "negative", "deficient"]:
            return 100.0
        if text in ["reduced", "partial", "intermediate"]:
            return 60.0
        if text in ["normal", "high", "present", "positive", "wildtype", "wt"]:
            return 0.0

    numeric = safe_float(value, 50.0)
    return clamp(100.0 - numeric)


def expression_high_score(value) -> float:
    """
    High score means the protein or marker is high.
    """
    if isinstance(value, str):
        text = value.strip().lower()
        if text in ["high", "positive", "elevated", "up", "increased"]:
            return 100.0
        if text in ["intermediate", "moderate"]:
            return 60.0
        if text in ["low", "negative", "absent", "normal"]:
            return 0.0

    return clamp(safe_float(value, 0.0))


def calculate_alt_likelihood(sample: Dict[str, Any]) -> Dict[str, Any]:
    atrx_loss = status_score(sample.get("ATRX_status"))
    daxx_loss = status_score(sample.get("DAXX_status"))
    h3f3a = status_score(sample.get("H3F3A_status"))
    c_circle = expression_high_score(sample.get("C_circle_score"))
    apb = expression_high_score(sample.get("APB_score"))
    telomere_heterogeneity = expression_high_score(sample.get("telomere_length_heterogeneity"))
    telomerase = expression_high_score(sample.get("TERT_or_telomerase_score"))

    raw = (
        0.18 * atrx_loss
        + 0.14 * daxx_loss
        + 0.08 * h3f3a
        + 0.25 * c_circle
        + 0.20 * apb
        + 0.15 * telomere_heterogeneity
        - 0.10 * telomerase
    )

    score = clamp(raw)

    if score >= 75:
        label = "High ALT likelihood"
    elif score >= 45:
        label = "Intermediate ALT likelihood"
    else:
        label = "Low or uncertain ALT likelihood"

    return {
        "score": round(score, 1),
        "label": label,
        "drivers": {
            "ATRX_loss": round(atrx_loss, 1),
            "DAXX_loss": round(daxx_loss, 1),
            "H3F3A_alteration": round(h3f3a, 1),
            "C_circle": round(c_circle, 1),
            "APB": round(apb, 1),
            "telomere_length_heterogeneity": round(telomere_heterogeneity, 1),
            "telomerase_penalty": round(telomerase, 1),
        },
    }


def calculate_replication_stress(sample: Dict[str, Any]) -> Dict[str, Any]:
    p_rpa = expression_high_score(sample.get("pRPA_score"))
    p_chk1 = expression_high_score(sample.get("pCHK1_score"))
    gamma_h2ax = expression_high_score(sample.get("gammaH2AX_score"))
    ss_dna = expression_high_score(sample.get("ssDNA_gap_score"))
    adpr = expression_high_score(sample.get("ADPr_score"))
    fragility = expression_high_score(sample.get("telomere_fragility_score"))

    score = clamp(
        0.20 * p_rpa
        + 0.20 * p_chk1
        + 0.15 * gamma_h2ax
        + 0.15 * ss_dna
        + 0.10 * adpr
        + 0.20 * fragility
    )

    if score >= 75:
        label = "High replication-stress burden"
    elif score >= 45:
        label = "Moderate replication-stress burden"
    else:
        label = "Low or uncertain replication-stress burden"

    return {
        "score": round(score, 1),
        "label": label,
        "drivers": {
            "pRPA": round(p_rpa, 1),
            "pCHK1": round(p_chk1, 1),
            "gammaH2AX": round(gamma_h2ax, 1),
            "ssDNA_gaps": round(ss_dna, 1),
            "ADPr": round(adpr, 1),
            "telomere_fragility": round(fragility, 1),
        },
    }


def calculate_vulnerabilities(sample: Dict[str, Any]) -> List[Dict[str, Any]]:
    alt = calculate_alt_likelihood(sample)
    stress = calculate_replication_stress(sample)

    alt_score = alt["score"]
    stress_score = stress["score"]

    slx4ip_low = expression_low_score(sample.get("SLX4IP_expression"))
    fancm_low = expression_low_score(sample.get("FANCM_expression"))
    blm_high = expression_high_score(sample.get("BLM_expression"))
    rad52_high = expression_high_score(sample.get("RAD52_expression"))
    pold3_high = expression_high_score(sample.get("POLD3_expression"))
    smarcal1_high = expression_high_score(sample.get("SMARCAL1_expression"))
    exd2_high = expression_high_score(sample.get("EXD2_expression"))
    dna2_high = expression_high_score(sample.get("DNA2_expression"))
    brca1_loss = status_score(sample.get("BRCA1_status"))
    wee1_high = expression_high_score(sample.get("WEE1_expression"))

    fan_cm_score = clamp(
        0.30 * alt_score
        + 0.25 * stress_score
        + 0.25 * slx4ip_low
        + 0.15 * blm_high
        + 0.05 * expression_high_score(sample.get("APB_score"))
    )

    atr_score = clamp(
        0.35 * alt_score
        + 0.40 * stress_score
        + 0.15 * expression_high_score(sample.get("pRPA_score"))
        + 0.10 * expression_high_score(sample.get("pCHK1_score"))
    )

    blm_axis_score = clamp(
        0.25 * alt_score
        + 0.25 * stress_score
        + 0.25 * blm_high
        + 0.15 * slx4ip_low
        + 0.10 * expression_high_score(sample.get("APB_score"))
    )

    rad52_score = clamp(
        0.35 * alt_score
        + 0.25 * rad52_high
        + 0.20 * pold3_high
        + 0.10 * expression_high_score(sample.get("APB_score"))
        + 0.10 * expression_high_score(sample.get("telomeric_EdU_score"))
    )

    smarcal1_score = clamp(
        0.35 * alt_score
        + 0.25 * stress_score
        + 0.25 * smarcal1_high
        + 0.15 * status_score(sample.get("ATRX_status"))
    )

    exd2_score = clamp(
        0.30 * alt_score
        + 0.20 * exd2_high
        + 0.20 * dna2_high
        + 0.15 * blm_high
        + 0.15 * pold3_high
    )

    wee1_score = clamp(
        0.25 * alt_score
        + 0.35 * stress_score
        + 0.25 * wee1_high
        + 0.15 * expression_high_score(sample.get("gammaH2AX_score"))
    )

    brca_fancm_score = clamp(
        0.30 * alt_score
        + 0.25 * stress_score
        + 0.25 * brca1_loss
        + 0.20 * expression_high_score(sample.get("FANCM_dependency_score"))
    )

    vulnerabilities = [
        {
            "target": "FANCM inhibition or depletion",
            "axis": "SLX4IP-FANCM-BLM",
            "score": round(fan_cm_score, 1),
            "rationale": "Predicted when ALT likelihood, replication stress, SLX4IP loss, and BLM activity are high.",
            "recommended_assays": [
                "FANCM knockdown or inhibition",
                "BLM rescue or co-depletion experiment",
                "Telomeric pSer33-RPA staining",
                "Telomeric pSer345-CHK1 staining",
                "Clonogenic survival assay",
                "APB quantification",
            ],
        },
        {
            "target": "ATR inhibition",
            "axis": "ATR-CHK1 replication-stress checkpoint",
            "score": round(atr_score, 1),
            "rationale": "Predicted when ALT-positive cells show high pRPA, pCHK1, ssDNA gaps, DNA damage, and telomere fragility.",
            "recommended_assays": [
                "ATR inhibitor dose-response",
                "pCHK1 suppression assay",
                "Cell-cycle analysis",
                "Telomere fragility assay",
                "Clonogenic survival assay",
            ],
        },
        {
            "target": "BLM regulatory axis",
            "axis": "BLM-driven hyper-ALT stress",
            "score": round(blm_axis_score, 1),
            "rationale": "Predicted when BLM expression or telomeric BLM activity is high, especially with SLX4IP deficiency.",
            "recommended_assays": [
                "BLM telomere colocalisation",
                "BLM knockdown rescue",
                "APB quantification",
                "C-circle assay",
                "Replication fibre assay",
            ],
        },
        {
            "target": "RAD52/POLD3 BIR pathway",
            "axis": "ALT break-induced replication",
            "score": round(rad52_score, 1),
            "rationale": "Predicted when ALT recombination and BIR-related markers are high.",
            "recommended_assays": [
                "RAD52 knockdown",
                "POLD3 knockdown",
                "Telomeric EdU in G2",
                "C-circle assay",
                "APB quantification",
            ],
        },
        {
            "target": "SMARCAL1 fork-remodelling dependency",
            "axis": "SMARCAL1-FANCM fork remodelling",
            "score": round(smarcal1_score, 1),
            "rationale": "Predicted when ALT-positive samples show fork-remodelling dependency and high replication stress.",
            "recommended_assays": [
                "SMARCAL1 knockdown",
                "FANCM co-depletion test",
                "Replication fork restart assay",
                "Telomere fragility assay",
            ],
        },
        {
            "target": "EXD2/DNA2/POLD3 processing axis",
            "axis": "Telomere end processing and ALT DNA synthesis",
            "score": round(exd2_score, 1),
            "rationale": "Predicted when EXD2, DNA2, BLM, and POLD3 signatures suggest dependency on telomeric processing.",
            "recommended_assays": [
                "EXD2 knockdown",
                "DNA2 knockdown",
                "POLD3 knockdown",
                "Synthetic viability matrix",
                "C-circle assay",
            ],
        },
        {
            "target": "WEE1 inhibition",
            "axis": "Replication stress, G2/M checkpoint dependency",
            "score": round(wee1_score, 1),
            "rationale": "Predicted when ALT cells show high DNA damage and checkpoint reliance.",
            "recommended_assays": [
                "WEE1 inhibitor dose-response",
                "Mitotic catastrophe markers",
                "γH2AX staining",
                "Cell-cycle profiling",
            ],
        },
        {
            "target": "FANCM-BRCA1 interaction",
            "axis": "FANCM-BRCA1 repair compensation",
            "score": round(brca_fancm_score, 1),
            "rationale": "Predicted when ALT cells have BRCA1 defects and FANCM-related stress dependency.",
            "recommended_assays": [
                "BRCA1 status validation",
                "FANCM knockdown",
                "HR reporter assay",
                "Clonogenic survival assay",
            ],
        },
    ]

    vulnerabilities.sort(key=lambda x: x["score"], reverse=True)
    return vulnerabilities


def analyze_sample(sample: Dict[str, Any]) -> Dict[str, Any]:
    alt = calculate_alt_likelihood(sample)
    stress = calculate_replication_stress(sample)
    vulnerabilities = calculate_vulnerabilities(sample)

    top = vulnerabilities[0] if vulnerabilities else None

    interpretation = []
    interpretation.append(f"ALT likelihood is {alt['score']}/100, classified as {alt['label']}.")
    interpretation.append(f"Replication-stress burden is {stress['score']}/100, classified as {stress['label']}.")

    if top:
        interpretation.append(
            f"The top predicted vulnerability is {top['target']} through the {top['axis']} axis, with score {top['score']}/100."
        )

    if alt["score"] >= 60 and stress["score"] >= 60:
        interpretation.append(
            "This sample appears to combine ALT biology with high replication stress, a state that may increase dependency on checkpoint, fork-remodelling, and telomeric recombination pathways."
        )

    return {
        "sample_id": sample.get("sample_id", "manual_sample"),
        "alt_likelihood": alt,
        "replication_stress": stress,
        "vulnerabilities": vulnerabilities,
        "interpretation": interpretation,
    }