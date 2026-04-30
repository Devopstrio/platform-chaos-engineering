from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, experiments, slo, dashboard, metrics
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(experiments.router, prefix="/experiments", tags=["experiments"])
api_router.include_router(slo.router, prefix="/slo", tags=["slo"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
