import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/img/ivy.svg" alt="ivy Admin" style={{ height: '40px' }} />
            <h1 style={{ margin: 0 }}>ivy Admin</h1>
          </Link>
        </div>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/proveedores" className="nav-link">
              Proveedores
            </Link>
          </li>
          <li>
            <Link to="/eventos" className="nav-link">
              Eventos
            </Link>
          </li>
          <li>
            <Link to="/notificaciones" className="nav-link">
              Notificaciones
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
