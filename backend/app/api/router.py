from fastapi import APIRouter
from app.api import suppliers

api_router = APIRouter()

# Include all routers
api_router.include_router(
    suppliers.router,
    prefix="/suppliers",
    tags=["suppliers"]
)
