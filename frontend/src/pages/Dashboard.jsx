import { useState, useEffect } from 'react'
import { getSuppliers, checkHealth } from '../services/api'
import './Dashboard.css'

function Dashboard() {
  const [suppliers, setSuppliers] = useState([])
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('active') // 'active', 'approved', 'draft'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Check API health
      const healthData = await checkHealth()
      setHealth(healthData)
      
      // Fetch suppliers
      const suppliersData = await getSuppliers()
      setSuppliers(suppliersData)
    } catch (err) {
      setError(err.message || 'Error connecting to API')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Filter suppliers based on active tab
  const getFilteredSuppliers = () => {
    if (activeTab === 'active') {
      return suppliers.filter(s => s.status === 'active')
    } else if (activeTab === 'approved') {
      return suppliers.filter(s => s.status === 'approved' || s.status === 'pending')
    } else if (activeTab === 'draft') {
      return suppliers.filter(s => s.status === 'draft')
    }
    return suppliers
  }

  const filteredSuppliers = getFilteredSuppliers()

  // Count suppliers by status
  const activeCount = suppliers.filter(s => s.status === 'active').length
  const approvedCount = suppliers.filter(s => s.status === 'approved' || s.status === 'pending').length
  const draftCount = suppliers.filter(s => s.status === 'draft').length

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Monitoring Platform Overview</p>
      </div>

      {/* Health Status */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🟢</div>
          <div className="stat-content">
            <h3>API Status</h3>
            <p className="stat-value">
              {loading ? 'Checking...' : health ? health.status : 'Offline'}
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Total Suppliers</h3>
            <p className="stat-value">{suppliers.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Active Metrics</h3>
            <p className="stat-value">0</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔔</div>
          <div className="stat-content">
            <h3>Alerts</h3>
            <p className="stat-value">0</p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={fetchData} className="retry-button">
            Retry
          </button>
        </div>
      )}

      {/* Suppliers Table */}
      <div className="data-section">
        <div className="section-header">
          <h3>Proveedores</h3>
          <button onClick={fetchData} className="refresh-button">
            🔄 Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <button 
            className={`tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            <span className="tab-dot active-dot"></span>
            Active ({activeCount})
          </button>
          <button 
            className={`tab ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            <span className="tab-dot approved-dot"></span>
            Approved ({approvedCount})
          </button>
          <button 
            className={`tab ${activeTab === 'draft' ? 'active' : ''}`}
            onClick={() => setActiveTab('draft')}
          >
            <span className="tab-dot draft-dot"></span>
            Draft ({draftCount})
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : filteredSuppliers.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Business Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td>{supplier.business_name || 'N/A'}</td>
                    <td>{supplier.email || 'N/A'}</td>
                    <td>{supplier.phone || 'N/A'}</td>
                    <td>{supplier.location || 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${supplier.status}`}>
                        {supplier.status || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>No suppliers found. Add some data to your Supabase database.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
