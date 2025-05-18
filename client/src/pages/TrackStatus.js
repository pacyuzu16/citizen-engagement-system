import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

function TrackStatus() {
  const [ticketId, setTicketId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const token = localStorage.getItem('token');

  const handleTrack = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://citizen-engagement-system.onrender.com/api/complaints/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComplaint(response.data);
    } catch (err) {
      console.error('Error:', err);
      toast.error('Complaint not found');
    }
  };

  return (
    <Container>
      <h2 className="text-primary">Track Your Complaint</h2>
      <Form onSubmit={handleTrack}>
        <Form.Group className="mb-3">
          <Form.Label>Ticket ID</Form.Label>
          <Form.Control
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="Enter your ticket ID"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          <FontAwesomeIcon icon={faSearch} className="me-2" /> Track
        </Button>
      </Form>
      {complaint && (
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Ticket ID: {complaint.ticketId}</Card.Title>
            <Card.Text>
              <strong>Title:</strong> {complaint.title}<br />
              <strong>Description:</strong> {complaint.description}<br />
              <strong>Status:</strong> {complaint.status}<br />
              <strong>Response:</strong> {complaint.response || 'None'}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default TrackStatus;