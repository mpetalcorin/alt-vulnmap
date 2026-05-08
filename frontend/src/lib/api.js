import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export const api = axios.create({
    baseURL: API_BASE,
    timeout: 30000,
});

export async function analyzeSample(payload) {
    const res = await api.post("/analyze", payload);
    return res.data;
}

export async function batchAnalyze(file) {
    const form = new FormData();
    form.append("file", file);
    const res = await api.post("/batch-analyze", form, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
}

export async function getProteins() {
    const res = await api.get("/knowledge/proteins");
    return res.data.proteins;
}

export async function getPairs() {
    const res = await api.get("/knowledge/synthetic-lethal-pairs");
    return res.data.pairs;
}

export async function getTemplate() {
    const res = await api.get("/template");
    return res.data;
}