# Partyin — Dokumentasi Detail Struktur File Proyek

Dokumen ini menjelaskan fungsi setiap folder dan file pada proyek **Partyin** (*Frontend Mobile React Native Expo*, *Backend Modular FastAPI*, dan *Dokumentasi*).

---

## 1. Pohon Struktur Direktori Lengkap

```text
Partyin/
├── docs/                                # Dokumentasi Arsitektur & Perencanaan
│   ├── SYSTEM_DESIGN.md                 # Desain sistem, arsitektur, & roadmap
│   ├── AI_AGENT_PLAN.md                 # Rencana Hybrid AI, akurasi & anti-manipulasi
│   └── PROJECT_STRUCTURE.md             # Dokumentasi detail struktur file (file ini)
│
├── backend/                             # Backend Modular (Python FastAPI + Gemini)
│   ├── .env                             # Konfigurasi rahasia (GEMINI_API_KEY)
│   ├── requirements.txt                 # Daftar dependensi Python
│   ├── venv/                            # Virtual environment Python (di-ignore Git)
│   └── app/
│       ├── __init__.py                  # Penanda package Python
│       ├── main.py                      # Entry point FastAPI, CORS, & registrasi router
│       ├── core/                        # Konfigurasi inti & keamanan
│       │   ├── __init__.py
│       │   ├── config.py                # Pembacaan environment variables (.env)
│       │   └── security.py              # Sanitasi input & proteksi prompt injection
│       ├── schemas/                     # Validasi struktur data (Pydantic Models)
│       │   ├── __init__.py
│       │   └── ai.py                    # Request/Response schema untuk endpoint AI
│       ├── services/                    # Logika bisnis & integrasi AI
│       │   ├── __init__.py
│       │   ├── scoring_service.py       # Layer 1: Skor kecocokan objektif & stat RPG
│       │   └── gemini_service.py        # Layer 2: Integrasi Google Gemini + fallback
│       └── routers/                     # Endpoint API (Controller)
│           ├── __init__.py
│           ├── health.py                # GET /health (cek status server)
│           └── ai.py                    # POST /api/ai/matchmake & /api/ai/quest-plan
│
└── src/                                 # Frontend Mobile (React Native + Expo Router)
    ├── app/                             # Routing berbasis file (Expo Router)
    │   ├── _layout.tsx                  # Root layout, AuthProvider, & NavigationGuard
    │   ├── (auth)/                      # Grup halaman autentikasi (tanpa bottom tab)
    │   │   ├── login.tsx                # Halaman Login + Pintasan Demo Juri
    │   │   └── register.tsx             # Halaman Register (Character Builder RPG)
    │   ├── (tabs)/                      # Grup halaman utama (dengan bottom tab)
    │   │   ├── _layout.tsx              # Konfigurasi Bottom Tab Bar Neo-Brutalist
    │   │   ├── index.tsx                # Tab Beranda (ringkasan profil adventurer)
    │   │   ├── party.tsx                # Tab Party (daftar tim + tombol Cek AI)
    │   │   ├── quest.tsx                # Tab Quest (daftar misi/lomba mahasiswa)
    │   │   └── profile.tsx              # Tab Profil (detail karakter & tombol Logout)
    │   ├── party/                       # [Tahap Lanjut] Halaman detail & buat Party
    │   └── quest/                       # [Tahap Lanjut] Halaman detail & buat Quest
    ├── components/                      # Komponen UI reusable
    │   ├── ai/                          # [Tahap Lanjut] Komponen tampilan hasil AI
    │   ├── cards/                       # [Tahap Lanjut] Kartu Party & Quest reusable
    │   └── common/                      # [Tahap Lanjut] Tombol, input, badge Neo-Brutalist
    ├── constants/
    │   └── Colors.ts                    # Palet warna tema Neo-Brutalist Partyin
    ├── context/
    │   └── AuthContext.tsx              # Manajemen sesi user global (AsyncStorage)
    ├── services/
    │   ├── supabase.ts                  # Klien koneksi database & auth Supabase
    │   └── ai.ts                        # Klien HTTP fetch ke Backend FastAPI
    └── types/
        └── index.ts                     # Definisi interface TypeScript (UserProfile, dll.)