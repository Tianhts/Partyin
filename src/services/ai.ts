// Gunakan IP lokal laptop Anda (yang sama dengan Expo Metro) agar HP bisa mengakses FastAPI
const API_BASE_URL = "http://172.27.81.101:8000";

export interface MatchmakeResult {
    match_score: number;
    reason: string;
    recommended_contribution: string;
}

export interface QuestPlanResult {
    summary: string;
    tasks: string[];
}

export async function fetchPartyMatchmake(payload: {
    user_name: string;
    user_role: string;
    user_skills: string[];
    target_party_title: string;
    needed_roles: string;
}): Promise<MatchmakeResult> {
    const res = await fetch(`${API_BASE_URL}/api/ai/matchmake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Gagal terhubung ke AI Backend.");
    }
    return res.json();
}

export async function fetchQuestPlan(payload: {
    quest_title: string;
    team_roles: string[];
}): Promise<QuestPlanResult> {
    const res = await fetch(`${API_BASE_URL}/api/ai/quest-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Gagal membuat rencana quest dari AI Backend.");
    }
    return res.json();
}