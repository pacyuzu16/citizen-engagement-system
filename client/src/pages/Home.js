import { Link } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

function Home() {
  return (
    <Container>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Citizen Engagement System</Card.Title>
          <Card.Text>Welcome! Submit a complaint or track an existing one.</Card.Text>
          <p>
            <Link to="/submit" className="btn btn-primary me-2">Submit Complaint</Link>
            <Link to="/track" className="btn btn-secondary me-2">Track Status</Link>
            <Link to="/dashboard" className="btn btn-info me-2">My Dashboard</Link>
            <Link to="/admin" className="btn btn-warning">Admin Dashboard</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;