import { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';

function SubmitComplaint() {
  const [formData, setFormData] = useState({ title: '', description: '', name: '', contact: '' });
  const [ticketId, setTicketId] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://citizen-engagement-system.onrender.com/api/complaints', {
        title: formData.title,
        description: formData.description,
        name: formData.name,
        contact: formData.contact
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTicketId(response.data.ticketId);
      setFormData({ title: '', description: '', name: '', contact: '' });
      toast.success('Complaint submitted! Check your Ticket ID.');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to submit complaint');
    }
  };

  return (
    <Container>
      <h2 className="text-primary">Submit a Complaint</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contact (Email/Phone)</Form.Label>
          <Form.Control
            type="text"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          <FontAwesomeIcon icon={faPaperPlane} className="me-2" /> Submit
        </Button>
      </Form>
      {ticketId && (
        <Alert variant="success" className="mt-3">
          Complaint submitted! Your Ticket ID is: <strong>{ticketId}</strong>
        </Alert>
      )}
    </Container>
  );
}

export default SubmitComplaint;