# PartyInNN
---

## Latar Belakang

Mahasiswa sering kesulitan menemukan rekan tim untuk tugas besar, skripsi, atau lomba yang sefrekuensi dan melengkapi keahlian mereka. Kolaborasi lintas fakultas hampir tidak terjadi karena tidak ada wadah yang mempertemukan mereka.

PartyUp Laskar menjawab masalah ini dengan pendekatan RPG: tugas menjadi **quest**, tim menjadi **party**, dan kontribusi nyata menjadi **XP** dan **bukti karya** yang bisa diverifikasi.

## Pemetaan ke Tiga Pilar Case 1

| Pilar | Fitur |
|---|---|
| **Student Collaboration** | Quest Board (tugas kuliah, skripsi, lomba), matchmaking berbasis skill, rekomendasi tim lintas fakultas |
| **Learning & Academic Experience** | Study party (sesi belajar bersama + EXP), skill swap, Proof-of-Work Vault |
| **Campus Services & Facilities** | Reservasi ruang diskusi, pengingat deadline, asisten AI (Gemini) |

## Fitur Utama

- **Quest Board**: cari dan terbitkan quest dengan slot peran (mis. UI/UX, Frontend, PM), filter Tugas Kuliah / Lomba / Kelompok Belajar.
- **Match Score**: persentase kecocokan skill pelamar dengan slot kosong.
- **Party Workspace**: roster anggota, milestone sprint (To-Do / In Progress / Done), XP tim.
- **Profil & Vault**: level karakter, skill terverifikasi, dan riwayat bukti karya.
- **Asisten AI**: ringkas silabus, susun roadmap sprint, bantu matchmaking (Google Gemini).
- **Notifikasi**: lamaran masuk, undangan party, deadline mendekat.

### Aturan Level

Semester adalah data akademik murni (1-8) dan **tidak** memengaruhi level.

```
LV = (Skill Terverifikasi × 2) + (Milestone Selesai × 3)
```

Rumus dihitung di database untuk keamanan; paket `shared` hanya menyediakan versi tampilan dan tes.

## Status Proyek

| Komponen | Status |
|---|---|
| Desain mobile (Figma) | Dalam proses |
| Aplikasi mobile (Expo) | Direncanakan untuk babak final |
| Booking ruang & verifikasi dosen | Simulasi untuk demo, butuh kerja sama institusi |

## Teknologi

| Lapisan | Pilihan |
|---|---|
| Mobile | React Native, Expo (SDK terbaru), Expo Router, TypeScript |
| Web | Next.js, TypeScript |
| Styling | NativeWind (Tailwind) + design tokens bersama |
| Data & Auth | Supabase (Postgres, RLS, Auth, Edge Functions) |
| Server state | TanStack Query; Zustand untuk state UI ringan |
| Validasi | Zod |
| AI | Google Gemini API, dipanggil lewat Supabase Edge Function |
| Auth | Sign in with Google (email kampus) |
| Notifikasi | Firebase Cloud Messaging (via development build) |
| Peta | Google Maps (lokasi gedung/fasilitas) |

## Arsitektur

```
partyup/
├── apps/
│   ├── web/                    # Next.js
│   └── mobile/                 # Expo + Expo Router
├── packages/
│   ├── shared/
│   │   ├── types/              # tipe hasil `supabase gen types` + model domain
│   │   ├── schemas/            # skema Zod
│   │   └── domain/             # levelCalculator, matchAlgorithm (murni, bertes)
│   └── design-tokens/          # warna, tipografi, spacing
├── supabase/
│   ├── migrations/             # skema + kebijakan RLS
│   ├── functions/              # gemini-proxy, notify
│   └── seed.sql
└── .github/workflows/          # lint, typecheck, test
```

Struktur `apps/mobile/src`:

```
src/
├── app/            # hanya routing, tipis
├── features/       # auth, quests, party, profile, ai-assistant
│   └── <fitur>/    # api/, hooks/, components/, screens/, index.ts
├── shared/         # ui/ (PixelButton, PixelBadge, ...), hooks/, lib/
└── core/           # config (env tervalidasi), providers, supabase client
```

### Aturan Dependensi

- Arah impor: `app` → `features` → `shared` → `core`. Tidak boleh terbalik.
- Antar-fitur hanya boleh mengimpor lewat `index.ts` (public API).
- `shared/ui` tidak boleh mengenal konsep quest atau party.
- Logika bisnis murni berada di `packages/shared/domain`, bukan di komponen.
- Komponen tidak memanggil Supabase langsung; gunakan hook di `features/*/api`.

### Keputusan Keamanan

- **API key Gemini tidak ada di aplikasi.** Panggilan AI lewat Edge Function; key disimpan sebagai secret. Nama model dibaca dari config.
- **Operasi sensitif di database.** Gabung party, persetujuan anggota, dan penambahan XP lewat fungsi Postgres (RPC) dalam transaksi agar aman dari race condition dan manipulasi client.
- **Row Level Security aktif** di semua tabel.
- Pintasan "Demo Juri" hanya aktif jika `EXPO_PUBLIC_ENABLE_DEMO=true` dan **harus nonaktif** pada build rilis.

## Desain

Gaya: **Gamified Academic Neo-Brutalism**. Keterbacaan modern untuk konten akademik, aksen pixel retro untuk identitas dan hiburan.

| Token | Hex | Kegunaan |
|---|---|---|
| `bg-canvas` | `#080D1A` | Latar layar |
| `bg-surface` | `#121B2D` | Kartu / container |
| `bg-surface-sub` | `#18243B` | Input, panel dalam |
| `border-retro` | `#000000` | Border 2px |
| `accent-green` | `#22C55E` | Aksi utama, status aktif |
| `accent-yellow` | `#FACC15` | XP, level, skor tinggi |
| `accent-cyan` | `#38BDF8` | Tugas akademik, kode MK |
| `accent-red` | `#EF4444` | Deadline mendesak, tolak |
| `text-primary` | `#FFFFFF` | Teks utama |
| `text-secondary` | `#94A3B8` | Teks pendukung |

- **Font pixel** (Press Start 2P): judul layar, badge, level, XP.
- **Font modern** (Plus Jakarta Sans / Inter): semua konten bacaan, minimal 14px untuk teks utama.
- **Komponen**: border 2px hitam, shadow `3px 3px 0 #000`, radius 12px (kartu) / 8px (tombol), efek tekan bergeser 2px.
- **Navigasi**: bottom tab bar dengan 4 tab: Beranda, Quests, Party, Profil.

## Memulai

### Prasyarat

- Node.js LTS dan pnpm
- Akun Supabase dan [Supabase CLI](https://supabase.com/docs/guides/cli)
- Akun Expo (EAS) untuk development build
- Proyek Google Cloud (OAuth, Maps) dan Firebase (FCM)
- Kunci Gemini API (untuk Edge Function)

### Instalasi

```bash
git clone <url-repo>
cd partyup
pnpm install
```

### Konfigurasi Environment

Salin `.env.example` menjadi `.env` di `apps/mobile` dan `apps/web`.

```bash
# apps/mobile/.env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=
EXPO_PUBLIC_ENABLE_DEMO=false
```

Secret berikut **hanya** di Supabase, jangan masuk repo atau aplikasi:

```bash
supabase secrets set GEMINI_API_KEY=...
supabase secrets set GEMINI_MODEL=...   # model terbaru yang tersedia
```

### Menjalankan

```bash
# Database lokal & fungsi
supabase start
supabase db reset                # terapkan migrasi + seed
supabase functions serve

# Web
pnpm --filter web dev

# Mobile
pnpm --filter mobile start
```

Fitur native (Google Sign-In, FCM) tidak berjalan di Expo Go. Gunakan development build:

```bash
pnpm --filter mobile eas build --profile development --platform android
```

### Perintah Berguna

```bash
pnpm lint          # ESLint
pnpm typecheck     # TypeScript
pnpm test          # Tes unit (domain logic)
pnpm gen:types     # Generate tipe dari skema Supabase
```

## Roadmap

- [x] Web PartyUp! (Quest Board, party, profil, asisten AI)
- [ ] Monorepo + paket `shared` (types, schemas, domain)
- [ ] Desain Figma: Beranda, Quest Board, Party, Profil
- [ ] Mobile: auth Google, Quest Board, Party Workspace
- [ ] Gemini lewat Edge Function (matchmaking, ringkas silabus)
- [ ] Notifikasi FCM
- [ ] Study party (pomodoro bersama + EXP)
- [ ] Simulasi booking ruang diskusi
- [ ] Skill swap dan verifikasi bukti karya (pasca-final)

## Lisensi

Tentukan lisensi (mis. MIT) sebelum repo dipublikasikan.
