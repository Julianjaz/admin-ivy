from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import Supplier, SupplierCreate
from app.core.config import settings
from supabase import create_client, Client

router = APIRouter()

# Initialize Supabase client
def get_supabase_client() -> Client:
    """Get Supabase client instance"""
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise HTTPException(
            status_code=500,
            detail="Supabase credentials not configured"
        )
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


@router.get("/", response_model=List[Supplier])
async def get_suppliers():
    """
    Get all suppliers from Supabase
    """
    try:
        supabase: Client = get_supabase_client()
        response = supabase.table("suppliers").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{supplier_id}", response_model=Supplier)
async def get_supplier(supplier_id: int):
    """
    Get a specific supplier by ID
    """
    try:
        supabase: Client = get_supabase_client()
        response = supabase.table("suppliers").select("*").eq("id", supplier_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Supplier not found")
        
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", response_model=Supplier)
async def create_supplier(supplier: SupplierCreate):
    """
    Create a new supplier
    """
    try:
        supabase: Client = get_supabase_client()
        response = supabase.table("suppliers").insert(supplier.model_dump()).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{supplier_id}", response_model=Supplier)
async def update_supplier(supplier_id: int, supplier: SupplierCreate):
    """
    Update an existing supplier
    """
    try:
        supabase: Client = get_supabase_client()
        response = supabase.table("suppliers").update(
            supplier.model_dump()
        ).eq("id", supplier_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Supplier not found")
        
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/{supplier_id}/status")
async def update_supplier_status(supplier_id: int, status: str):
    """
    Update supplier status (e.g., draft -> active)
    """
    try:
        # Validate status
        valid_statuses = ["draft", "pending", "approved", "active"]
        if status not in valid_statuses:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
            )
        
        supabase: Client = get_supabase_client()
        response = supabase.table("suppliers").update(
            {"status": status}
        ).eq("id", supplier_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Supplier not found")
        
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{supplier_id}")
async def delete_supplier(supplier_id: int):
    """
    Delete a supplier
    """
    try:
        supabase: Client = get_supabase_client()
        response = supabase.table("suppliers").delete().eq("id", supplier_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Supplier not found")
        
        return {"message": "Supplier deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
