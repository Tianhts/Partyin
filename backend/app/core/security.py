import re

BLOCKED_PATTERNS = [
    r"ignore\s+(all\s+)?previous\s+instructions?",
    r"abaikan\s+instruksi",
    r"system\s+prompt",
    r"beri\s+(saya\s+)?skor\s+100",
    r"always\s+return\s+100",
    r"you\s+are\s+now",
]


def sanitize_text(text: str, max_length: int = 200) -> str:
    """Membersihkan teks input dan memblokir pola prompt injection."""
    clean = text.strip()[:max_length]
    for pattern in BLOCKED_PATTERNS:
        if re.search(pattern, clean, flags=re.IGNORECASE):
            raise ValueError("Input terdeteksi mengandung pola manipulasi instruksi.")
    # Hapus karakter kontrol / tag XML/HTML berisiko
    clean = re.sub(r"[<>`]", "", clean)
    return clean