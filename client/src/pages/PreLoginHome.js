import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

function PreLoginHome() {
  return (
    <Container className="text-center" style={{ padding: '40px 0' }}>
      <Card className="shadow-lg" style={{ background: 'linear-gradient(135deg, #e6f0fa 0%, #d6e5fa 100%)', border: 'none' }}>
        <Card.Body>
          <h1 className="display-4 mb-4" style={{ color: '#007bff' }}>
            Welcome to the Citizen Engagement System
          </h1>
          <p className="lead mb-5" style={{ color: '#343a40' }}>
            Submit and track complaints about public services with ease. Join us to make your voice heard!
          </p>
          <Row className="justify-content-center">
            <Col md={4} className="mb-3">
              <Button href="/login" variant="primary" size="lg" className="w-100">
                <FontAwesomeIcon icon={faSignInAlt} className="me-2" /> Login
              </Button>
            </Col>
            <Col md={4}>
              <Button href="/signup" variant="outline-primary" size="lg" className="w-100">
                <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Sign Up
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PreLoginHome;