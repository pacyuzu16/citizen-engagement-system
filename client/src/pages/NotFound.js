import { Container, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHome } from '@fortawesome/free-solid-svg-icons';

function NotFound() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e6f0fa 0%, #d6e5fa 100%)' }}>
      <Card className="text-center shadow-lg" style={{ width: '500px', padding: '20px', borderRadius: '10px', border: 'none' }}>
        <Card.Body>
          <FontAwesomeIcon icon={faExclamationTriangle} size="4x" className="text-warning mb-4" />
          <h1 className="display-4 mb-3" style={{ color: '#007bff' }}>404</h1>
          <h2 className="mb-4" style={{ color: '#343a40' }}>Page Not Found</h2>
          <p className="mb-4" style={{ color: '#6c757d' }}>
            Oops! The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <Button href="/" variant="primary">
            <FontAwesomeIcon icon={faHome} className="me-2" /> Back to Home
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NotFound;