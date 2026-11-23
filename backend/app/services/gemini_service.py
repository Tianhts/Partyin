import json
from google import genai
from google.genai import types
from app.core.config import settings
from app.schemas.ai import MatchmakeRequest, QuestPlanRequest


def get_gemini_client() -> genai.Client:
    if not settings.GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY belum diatur di file backend/.env")
    return genai.Client(api_key=settings.GEMINI_API_KEY)


def analyze_party_match(req: MatchmakeRequest) -> dict:
    client = get_gemini_client()
    prompt = f"""
    Kamu adalah AI Matchmaker untuk aplikasi kolaborasi mahasiswa bernama Partyin.
    Evaluasi kecocokan mahasiswa berikut dengan tim/party yang dituju.

    Profil Mahasiswa:
    - Nama: {req.user_name}
    - Role: {req.user_role}
    - Skills: {", ".join(req.user_skills)}

    Target Party:
    - Judul: {req.target_party_title}
    - Role yang dibutuhkan: {req.needed_roles}

    Balas dalam format JSON dengan key:
    - match_score (integer 0-100)
    - reason (string, 1-2 kalimat dalam Bahasa Indonesia)
    - recommended_contribution (string, saran kontribusi spesifik mahasiswa ini di tim)
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(response_mime_type="application/json"),
    )
    return json.loads(response.text)


def generate_quest_plan(req: QuestPlanRequest) -> dict:
    client = get_gemini_client()
    prompt = f"""
    Buat rencana pembagian tugas awal untuk misi/lomba mahasiswa: "{req.quest_title}".
    Anggota tim memiliki role: {", ".join(req.team_roles)}.

    Balas dalam format JSON dengan key:
    - summary (string, ringkasan strategi tim 1 kalimat dalam Bahasa Indonesia)
    - tasks (list of 4 strings, daftar tugas konkret untuk tiap role)
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(response_mime_type="application/json"),
    )
    return json.loads(response.text)