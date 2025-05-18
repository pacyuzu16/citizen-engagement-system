import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PreLoginHome from './pages/PreLoginHome';
import SubmitComplaint from './pages/SubmitComplaint';
import TrackStatus from './pages/TrackStatus';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt, faSearch, faTachometerAlt, faChartBar, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppContent() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setShowLogoutModal(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" style={{ background: 'linear-gradient(90deg, #007bff, #00c4cc)' }}>
        <Container>
          <Navbar.Brand>
            <FontAwesomeIcon icon={faHome} className="me-2" />
            Citizen Engagement System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {token ? (
                <>
                  <Nav.Link href="/submit">
                    <FontAwesomeIcon icon={faFileAlt} className="me-1" /> Submit Complaint
                  </Nav.Link>
                  <Nav.Link href="/track">
                    <FontAwesomeIcon icon={faSearch} className="me-1" /> Track Status
                  </Nav.Link>
                  <Nav.Link href="/dashboard">
                    <FontAwesomeIcon icon={faTachometerAlt} className="me-1" /> My Dashboard
                  </Nav.Link>
                  {role === 'admin' && (
                    <>
                      <Nav.Link href="/admin">
                        <FontAwesomeIcon icon={faTachometerAlt} className="me-1" /> Admin Dashboard
                      </Nav.Link>
                      <Nav.Link href="/analytics">
                        <FontAwesomeIcon icon={faChartBar} className="me-1" /> Analytics
                      </Nav.Link>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Nav.Link href="/pre-login">
                    <FontAwesomeIcon icon={faHome} className="me-1" /> Home
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              {token ? (
                <Button variant="outline-light" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Logout
                </Button>
              ) : (
                <>
                  <Nav.Link href="/login">
                    <FontAwesomeIcon icon={faSignInAlt} className="me-1" /> Login
                  </Nav.Link>
                  <Nav.Link href="/signup">
                    <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLogoutModal} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

      <ErrorBoundary>
        <Container style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/pre-login" />} />
            <Route path="/pre-login" element={<PreLoginHome />} />
            <Route path="/login" element={!token ? <Login /> : <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} />} />
            <Route path="/signup" element={!token ? <Signup /> : <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} />} />
            <Route path="/submit" element={token ? <SubmitComplaint /> : <Navigate to="/login" />} />
            <Route path="/track" element={token ? <TrackStatus /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/admin" element={token && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
            <Route path="/analytics" element={token && role === 'admin' ? <Analytics /> : <Navigate to="/login" />} />
            <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </ErrorBoundary>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;