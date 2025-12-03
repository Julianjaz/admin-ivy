import axios from 'axios'

// Get API URL from environment variable or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

console.log('🔧 API Configuration:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  API_URL: API_URL,
  mode: import.meta.env.MODE
})

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/health')
    return response.data
  } catch (error) {
    console.error('Health check failed:', error)
    throw error
  }
}

// Suppliers API
export const getSuppliers = async () => {
  try {
    const response = await api.get('/api/suppliers/')
    return response.data
  } catch (error) {
    console.error('Error fetching suppliers:', error)
    throw error
  }
}

export const getSupplier = async (id) => {
  try {
    const response = await api.get(`/api/suppliers/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching supplier:', error)
    throw error
  }
}

export const createSupplier = async (supplierData) => {
  try {
    const response = await api.post('/api/suppliers/', supplierData)
    return response.data
  } catch (error) {
    console.error('Error creating supplier:', error)
    throw error
  }
}

export const updateSupplier = async (id, supplierData) => {
  try {
    const response = await api.put(`/api/suppliers/${id}`, supplierData)
    return response.data
  } catch (error) {
    console.error('Error updating supplier:', error)
    throw error
  }
}

export const deleteSupplier = async (id) => {
  try {
    const response = await api.delete(`/api/suppliers/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting supplier:', error)
    throw error
  }
}

export default api
