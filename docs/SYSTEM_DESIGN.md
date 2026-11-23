    # Partyin — System Design & Development Plan

> **Target Kompetisi:** GDGoC ITB Challenge 2026  
> **Kategori:** Case 1 — Smarter Campus and Learning (Student Collaboration)  
> **Teknologi Google:** Google Gemini API (`gemini-2.5-flash`), Google Cloud Run (Deployment Target)

---

## 1. Gambaran Umum Proyek
**Partyin** adalah aplikasi mobile kolaborasi mahasiswa bergaya *Neo-Brutalist RPG* yang membantu mahasiswa menemukan rekan tim lomba, riset, dan proyek akademik berdasarkan kecocokan *role* dan *skill* menggunakan **AI Matchmaking**.

---

## 2. Arsitektur Sistem

```text
[ Mobile App: React Native (Expo Router) ]
          │                        │
          │ Auth & Data            │ AI Request (REST API)
          ▼                        ▼
[ Supabase (DB & Auth) ]   [ Backend: Python FastAPI ]
                                   │
                                   │ Prompting & JSON Output
                                   ▼
                         [ Google Gemini API ]