import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <h1>📊 Monitoring Platform</h1>
          </Link>
        </div>
        <ul className="navbar-menu">
          <li>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/suppliers" className="nav-link">
              Suppliers
            </Link>
          </li>
          <li>
            <Link to="/metrics" className="nav-link">
              Metrics
            </Link>
          </li>
          <li>
            <Link to="/alerts" className="nav-link">
              Alerts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
