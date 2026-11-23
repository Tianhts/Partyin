from typing import List, Dict

# Stat bawaan per Kelas RPG (Server-Authoritative, tidak bisa diedit manual oleh user)
ROLE_STATS_MAP: Dict[str, Dict[str, int]] = {
    "frontend developer": {"code": 85, "design": 70, "biz": 20},
    "backend developer": {"code": 95, "design": 20, "biz": 20},
    "full-stack developer": {"code": 90, "design": 55, "biz": 30},
    "mobile developer": {"code": 90, "design": 50, "biz": 20},
    "ui/ux designer": {"code": 40, "design": 95, "biz": 40},
    "product manager": {"code": 20, "design": 60, "biz": 95},
    "qa engineer": {"code": 75, "design": 30, "biz": 40},
    "guild master": {"code": 70, "design": 70, "biz": 90},
}

ROLE_KEYWORDS: Dict[str, List[str]] = {
    "frontend developer": ["frontend", "react", "ui", "web", "full-stack"],
    "backend developer": ["backend", "api", "fastapi", "database", "full-stack"],
    "full-stack developer": ["full-stack", "frontend", "backend", "web", "mobile"],
    "mobile developer": ["mobile", "react native", "expo", "android", "ios"],
    "ui/ux designer": ["ui/ux", "design", "figma", "designer", "prototype"],
    "product manager": ["product", "pm", "business", "pitch", "manager"],
    "qa engineer": ["qa", "testing", "quality", "test"],
}


def get_role_stats(role: str) -> Dict[str, int]:
    return ROLE_STATS_MAP.get(role.lower().strip(), {"code": 50, "design": 50, "biz": 50})


def calculate_objective_match(
    user_role: str,
    user_skills: List[str],
    target_party_title: str,
    needed_roles: str,
) -> Dict:
    role_lower = user_role.lower().strip()
    needed_lower = needed_roles.lower()
    title_lower = target_party_title.lower()

    # 1. Role Fit (Maks 45 poin)
    role_score = 15  # nilai dasar kolaborasi
    keywords = ROLE_KEYWORDS.get(role_lower, [role_lower])
    if any(kw in needed_lower for kw in keywords):
        role_score = 45
    elif any(kw in title_lower for kw in keywords):
        role_score = 32

    # 2. Skill Relevance (Maks 30 poin)
    combined_target = f"{needed_lower} {title_lower}"
    matched_skills = [s for s in user_skills if s.lower().strip() in combined_target]
    if matched_skills:
        skill_score = min(30, 15 + len(matched_skills) * 8)
    else:
        skill_score = min(20, len(user_skills) * 5)

    # 3. RPG Stat Strength (Maks 25 poin)
    stats = get_role_stats(user_role)
    peak_stat = max(stats.values())
    stat_score = round((peak_stat / 100) * 25)

    total_score = min(98, max(20, role_score + skill_score + stat_score))

    return {
        "match_score": total_score,
        "user_stats": stats,
        "matched_skills": matched_skills,
    }