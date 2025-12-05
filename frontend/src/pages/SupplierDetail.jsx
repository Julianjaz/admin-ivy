import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSupplierDetails } from '../services/api'
import './SupplierDetail.css'

function SupplierDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDetails()
  }, [id])

  const fetchDetails = async () => {
    try {
      setLoading(true)
      const data = await getSupplierDetails(id)
      setDetails(data)
    } catch (err) {
      setError(err.message || 'Error al cargar los detalles')
      console.error('Error fetching details:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#10b981'
      case 'approved': return '#6366f1'
      case 'pending': return '#6366f1'
      case 'draft': return '#f59e0b'
      default: return '#9ca3af'
    }
  }

  // Check if a value is a URL
  const isUrl = (value) => {
    if (typeof value !== 'string') return false
    return value.startsWith('http://') || value.startsWith('https://')
  }

  // Render value with special handling for URLs
  const renderValue = (key, value) => {
    if (!value) return 'N/A'
    
    if (isUrl(value)) {
      // Check if it's a certificate, document, or image
      const isCertificate = key.toLowerCase().includes('certificate') || 
                           key.toLowerCase().includes('certificado')
      const isDocument = key.toLowerCase().includes('document') || 
                        key.toLowerCase().includes('documento') ||
                        key.toLowerCase().includes('url')
      
      const label = isCertificate ? '📄 Ver Certificado' : 
                    isDocument ? '📄 Ver Documento' : 
                    '🔗 Ver Archivo'
      
      return (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="view-link"
        >
          {label}
        </a>
      )
    }
    
    // Handle arrays
    if (Array.isArray(value)) {
      return value.join(', ') || 'N/A'
    }
    
    // Handle objects
    if (typeof value === 'object') {
      return JSON.stringify(value)
    }
    
    // Handle booleans
    if (typeof value === 'boolean') {
      return value ? 'Sí' : 'No'
    }
    
    return value
  }

  if (loading) return <div className="loading-detail">Cargando...</div>
  if (error) return <div className="error-detail">Error: {error}</div>
  if (!details) return <div className="error-detail">No se encontró el proveedor</div>

  const { supplier, bank_account, disponibility, experience, fees, service_capacity } = details

  return (
    <div className="supplier-detail">
      {/* Header */}
      <div className="detail-header">
        <button className="back-button" onClick={() => navigate('/proveedores')}>
          ← Volver
        </button>
        <div className="supplier-header-info">
          <div className="supplier-name-status">
            <h2>{supplier.business_name || 'Sin nombre'}</h2>
            <div className="status-indicator">
              <span 
                className="status-dot" 
                style={{ backgroundColor: getStatusColor(supplier.status) }}
              ></span>
              <span className="status-text">{supplier.status}</span>
            </div>
          </div>
          <p className="supplier-email">{supplier.email}</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="details-grid">
        
        {/* Bank Account Card */}
        <div className="detail-card">
          <h3 className="card-title">Cuenta Bancaria</h3>
          {bank_account ? (
            <div className="card-content">
              {Object.entries(bank_account).map(([key, value]) => (
                key !== 'id' && key !== 'supplierId' && key !== 'created_at' && (
                  <div key={key} className="detail-item">
                    <span className="detail-label">{key.replace(/_/g, ' ')}:</span>
                    <span className="detail-value">{renderValue(key, value)}</span>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="empty-state-card">
              <p>Sin información de cuenta bancaria</p>
            </div>
          )}
        </div>

        {/* Disponibility Card */}
        <div className="detail-card">
          <h3 className="card-title">Disponibilidad</h3>
          {disponibility ? (
            <div className="card-content">
              {Object.entries(disponibility).map(([key, value]) => (
                key !== 'id' && key !== 'supplierId' && key !== 'created_at' && (
                  <div key={key} className="detail-item">
                    <span className="detail-label">{key.replace(/_/g, ' ')}:</span>
                    <span className="detail-value">{renderValue(key, value)}</span>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="empty-state-card">
              <p>Sin información de disponibilidad</p>
            </div>
          )}
        </div>

        {/* Experience Card */}
        <div className="detail-card">
          <h3 className="card-title">Experiencia</h3>
          {experience ? (
            <div className="card-content">
              {Object.entries(experience).map(([key, value]) => (
                key !== 'id' && key !== 'supplierId' && key !== 'created_at' && (
                  <div key={key} className="detail-item">
                    <span className="detail-label">{key.replace(/_/g, ' ')}:</span>
                    <span className="detail-value">{renderValue(key, value)}</span>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="empty-state-card">
              <p>Sin información de experiencia</p>
            </div>
          )}
        </div>

        {/* Fees Card */}
        <div className="detail-card">
          <h3 className="card-title">Tarifas</h3>
          {fees ? (
            <div className="card-content">
              {Object.entries(fees).map(([key, value]) => (
                key !== 'id' && key !== 'supplierId' && key !== 'created_at' && (
                  <div key={key} className="detail-item">
                    <span className="detail-label">{key.replace(/_/g, ' ')}:</span>
                    <span className="detail-value">{renderValue(key, value)}</span>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="empty-state-card">
              <p>Sin información de tarifas</p>
            </div>
          )}
        </div>

        {/* Service Capacity Card */}
        <div className="detail-card">
          <h3 className="card-title">Capacidad de Servicio</h3>
          {service_capacity ? (
            <div className="card-content">
              {Object.entries(service_capacity).map(([key, value]) => (
                key !== 'id' && key !== 'supplierId' && key !== 'created_at' && (
                  <div key={key} className="detail-item">
                    <span className="detail-label">{key.replace(/_/g, ' ')}:</span>
                    <span className="detail-value">{renderValue(key, value)}</span>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="empty-state-card">
              <p>Sin información de capacidad de servicio</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default SupplierDetail
