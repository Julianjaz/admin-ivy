import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSupplierDetails, getSupplierProducts, getSupplierServices } from '../services/api'
import './SupplierDetail.css'

function SupplierDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [details, setDetails] = useState(null)
  const [products, setProducts] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [loadingServices, setLoadingServices] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('info') // 'info', 'productos', 'servicios'

  useEffect(() => {
    fetchDetails()
  }, [id])

  useEffect(() => {
    if (activeTab === 'productos' && products.length === 0) {
      fetchProducts()
    }
    if (activeTab === 'servicios' && services.length === 0) {
      fetchServices()
    }
  }, [activeTab])

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

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true)
      const data = await getSupplierProducts(id)
      setProducts(data.products || [])
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoadingProducts(false)
    }
  }

  const fetchServices = async () => {
    try {
      setLoadingServices(true)
      const data = await getSupplierServices(id)
      setServices(data.services || [])
    } catch (err) {
      console.error('Error fetching services:', err)
    } finally {
      setLoadingServices(false)
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

      {/* Tabs Navigation */}
      <div className="detail-tabs">
        <button 
          className={`detail-tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          📋 Información
        </button>
        <button 
          className={`detail-tab ${activeTab === 'productos' ? 'active' : ''}`}
          onClick={() => setActiveTab('productos')}
        >
          📦 Productos
        </button>
        <button 
          className={`detail-tab ${activeTab === 'servicios' ? 'active' : ''}`}
          onClick={() => setActiveTab('servicios')}
        >
          🛠️ Servicios
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'info' && (
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
      )}

      {/* Productos Tab */}
      {activeTab === 'productos' && (
        <div className="tab-content">
          {loadingProducts ? (
            <div className="loading-products">Cargando productos...</div>
          ) : products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => {
                const productData = product.data || {}
                return (
                  <div key={product.id} className="product-card">
                    {/* Product Image */}
                    {productData.productsFile && productData.productsFile[0] && (
                      <div className="product-image">
                        <img src={productData.productsFile[0]} alt={productData.productName || 'Producto'} />
                      </div>
                    )}
                    
                    {/* Product Info */}
                    <div className="product-info">
                      <h3 className="product-name">{productData.productName || product.name || 'Sin nombre'}</h3>
                      
                      <div className="product-details">
                        {productData.productCategory && (
                          <span className="product-badge category-badge">
                            {productData.nameCategory || productData.productCategory}
                          </span>
                        )}
                        {productData.productType && (
                          <span className="product-badge type-badge">
                            {productData.productType}
                          </span>
                        )}
                      </div>

                      {productData.productDescription && (
                        <p className="product-description">{productData.productDescription}</p>
                      )}

                      <div className="product-meta">
                        {productData.productPrice && (
                          <div className="product-price">
                            <span className="price-label">Precio:</span>
                            <span className="price-value">${productData.productPrice}</span>
                          </div>
                        )}
                        {productData.productPresentation && (
                          <div className="product-presentation">
                            <span className="presentation-label">Presentación:</span>
                            <span className="presentation-value">{productData.productPresentation}</span>
                          </div>
                        )}
                      </div>

                      {productData.customIngredients && (
                        <div className="product-ingredients">
                          <strong>Ingredientes:</strong> {productData.customIngredients}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="empty-tab-state">
              <div className="empty-icon">📦</div>
              <h3>Sin Productos</h3>
              <p>Este proveedor no tiene productos registrados</p>
            </div>
          )}
        </div>
      )}

      {/* Servicios Tab */}
      {activeTab === 'servicios' && (
        <div className="tab-content">
          {loadingServices ? (
            <div className="loading-products">Cargando servicios...</div>
          ) : services.length > 0 ? (
            <div className="products-grid">
              {services.map((service) => {
                const serviceData = service.data || {}
                return (
                  <div key={service.id} className="product-card service-card">
                    {/* Service Image */}
                    {serviceData.packageFiles && serviceData.packageFiles[0] && (
                      <div className="product-image">
                        <img src={serviceData.packageFiles[0]} alt={serviceData.packageName || 'Servicio'} />
                      </div>
                    )}
                    
                    {/* Service Info */}
                    <div className="product-info">
                      <h3 className="product-name">{serviceData.packageName || service.name || 'Sin nombre'}</h3>
                      
                      <div className="product-details">
                        {serviceData.category && (
                          <span className="product-badge category-badge">
                            {serviceData.category}
                          </span>
                        )}
                        {serviceData.optionFormatService && (
                          <span className="product-badge type-badge">
                            {serviceData.optionFormatService.replace(/-/g, ' ')}
                          </span>
                        )}
                        {serviceData.targetAudience && (
                          <span className="product-badge audience-badge">
                            {serviceData.targetAudience === 'adults' ? 'Adultos' : serviceData.targetAudience}
                          </span>
                        )}
                      </div>

                      {serviceData.description && (
                        <p className="product-description">{serviceData.description}</p>
                      )}

                      <div className="product-meta">
                        {serviceData.packagePrice && (
                          <div className="product-price">
                            <span className="price-label">Precio:</span>
                            <span className="price-value">${serviceData.packagePrice}</span>
                          </div>
                        )}
                        {serviceData.priceType && (
                          <div className="product-presentation">
                            <span className="presentation-label">Tipo de precio:</span>
                            <span className="presentation-value">
                              {serviceData.priceType === 'per-hour' ? 'Por hora' : serviceData.priceType}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Service Details */}
                      <div className="service-details">
                        {serviceData.requiresGroupSize === 'si' && serviceData.groupSize && (
                          <div className="service-detail-item">
                            <strong>Tamaño de grupo:</strong> {serviceData.groupSize.min} - {serviceData.groupSize.max} personas
                          </div>
                        )}
                        {serviceData.minServiceTime && serviceData.maxServiceTime && (
                          <div className="service-detail-item">
                            <strong>Tiempo de servicio:</strong> {serviceData.minServiceTime.time} - {serviceData.maxServiceTime.time} {serviceData.maxServiceTime.unit}
                          </div>
                        )}
                        {serviceData.optionBartender === 'si' && (
                          <div className="service-detail-item">
                            ✓ Incluye Bartender
                          </div>
                        )}
                        {serviceData.optionOfferMobileBar === 'si' && (
                          <div className="service-detail-item">
                            ✓ Ofrece Barra Móvil
                          </div>
                        )}
                        {serviceData.optionOfferGlassware === 'si' && (
                          <div className="service-detail-item">
                            ✓ Ofrece Cristalería ({serviceData.optionTypeGlassware})
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="empty-tab-state">
              <div className="empty-icon">🛠️</div>
              <h3>Sin Servicios</h3>
              <p>Este proveedor no tiene servicios registrados</p>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default SupplierDetail
