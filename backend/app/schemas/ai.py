from pydantic import BaseModel
from typing import List


class MatchmakeRequest(BaseModel):
    user_name: str
    user_role: str
    user_skills: List[str]
    target_party_title: str
    needed_roles: str


class MatchmakeResponse(BaseModel):
    match_score: int
    reason: str
    recommended_contribution: str


class QuestPlanRequest(BaseModel):
    quest_title: str
    team_roles: List[str]


class QuestPlanResponse(BaseModel):
    summary: str
    tasks: List[str]