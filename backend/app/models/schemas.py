from pydantic import BaseModel, Field
from typing import Optional, Any
from datetime import datetime


class SupplierBase(BaseModel):
    """Base supplier schema - matches your Supabase structure"""
    business_name: Optional[str] = Field(None, description="Business name")
    email: Optional[str] = Field(None, description="Supplier email")
    phone: Optional[str] = Field(None, description="Supplier phone")
    address: Optional[str] = Field(None, description="Supplier address")
    status: Optional[str] = Field(None, description="Supplier status")
    business_description: Optional[str] = Field(None, description="Business description")
    location: Optional[str] = Field(None, description="Location")
    service_type: Optional[str] = Field(None, description="Service type")
    
    class Config:
        extra = "allow"  # Allow extra fields from Supabase


class SupplierCreate(SupplierBase):
    """Schema for creating a supplier"""
    pass


class Supplier(BaseModel):
    """Complete supplier schema with all fields from Supabase"""
    id: int
    business_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    status: Optional[str] = None
    business_description: Optional[str] = None
    location: Optional[str] = None
    service_type: Optional[str] = None
    profile_image: Optional[str] = None
    profile_banner: Optional[str] = None
    created_at: Optional[datetime] = None
    userId: Optional[str] = None
    
    class Config:
        from_attributes = True
        extra = "allow"  # Allow all extra fields from Supabase
