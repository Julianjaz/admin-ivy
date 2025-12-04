import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import './App.css'

// Placeholder components
const Home = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Home</h2>
    <p>Bienvenido a ivy Admin</p>
  </div>
)

const Eventos = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Eventos</h2>
    <p>Gestión de eventos próximamente...</p>
  </div>
)

const Notificaciones = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Notificaciones</h2>
    <p>Centro de notificaciones próximamente...</p>
  </div>
)

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proveedores" element={<Dashboard />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
            {/* Legacy routes */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
