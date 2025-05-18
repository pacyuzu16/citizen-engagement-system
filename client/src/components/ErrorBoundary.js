import React, { Component } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e6f0fa 0%, #d6e5fa 100%)' }}>
          <Card className="text-center shadow-lg" style={{ width: '500px', padding: '20px', borderRadius: '10px', border: 'none' }}>
            <Card.Body>
              <FontAwesomeIcon icon={faExclamationCircle} size="4x" className="text-danger mb-4" />
              <h2 className="mb-4" style={{ color: '#343a40' }}>Something Went Wrong</h2>
              <p className="mb-4" style={{ color: '#6c757d' }}>
                An unexpected error occurred. Please try refreshing the page or contact support.
              </p>
              <Button href="/" variant="primary">
                <FontAwesomeIcon icon={faHome} className="me-2" /> Back to Home
              </Button>
            </Card.Body>
          </Card>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;