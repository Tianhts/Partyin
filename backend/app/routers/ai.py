from fastapi import APIRouter, HTTPException
from app.schemas.ai import(
    MatchmakeRequest,
    MatchmakeResponse,
    QuestPlanRequest,
    QuestPlanResponse,
)
from app.services.gemini_service import analyze_party_match, generate_quest_plan

router = APIRouter(prefix="/api/ai", tags=["AI Matchmaker & Planner"])


@router.post("/matchmake", response_model=MatchmakeResponse)
def matchmake_party(payload: MatchmakeRequest):
    try:
        return analyze_party_match(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/quest-plan", response_model=QuestPlanResponse)
def quest_plan(payload: QuestPlanRequest):
    try:
        return generate_quest_plan(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))