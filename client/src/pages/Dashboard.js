import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const [email, setEmail] = useState('');
  const [complaints, setComplaints] = useState([]);

  // Handle search complaints by email
  const handleSearch = async (e) => {//GHHGHGJHHJHJJKDFJKDFjkdasfjadsfkdsafjdskadsfjkdsfjkadsfjkadsfjkf
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://citizen-engagement-system.onrender.com/api/complaints/user/complaints?contact=${contact}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(response.data);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to fetch complaints');
    }
  };

  // Handle cancel complaint
  const handleCancelComplaint = async (complaintId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://citizen-engagement-backend.onrender.com/api/complaints/${complaintId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Remove the canceled complaint from the state
      setComplaints(complaints.filter(complaint => complaint._id !== complaintId));
      alert('Complaint canceled successfully');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to cancel complaint');
    }
  };

  return (
    <Container>
      <h2 className="text-primary">Search Complaints</h2>
      <Form onSubmit={handleSearch} className="mt-3">
        <Form.Group controlId="email">
          <Form.Label>Enter User Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Search
        </Button>
      </Form>

      {complaints.length > 0 ? (
        <div className="mt-3">
          <h3>Search Results</h3>
          <ListGroup>
            {complaints.map(complaint => (
              <ListGroup.Item key={complaint._id}>
                <strong>{complaint.title}</strong> (Ticket: {complaint.ticketId})<br />
                Status: {complaint.status} | Response: {complaint.response || 'None'}<br />
                Category: {complaint.category} | Agency: {complaint.agency}<br />
                Description: {complaint.description}<br />
                Submitted: {new Date(complaint.createdAt).toLocaleString()}<br />
                <Button
                  variant="danger"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleCancelComplaint(complaint._id)}
                >
                  <FontAwesomeIcon icon={faTimes} className="me-2" /> Cancel Complaint
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <p className="mt-3">No complaints found.</p>
      )}
    </Container>
  );
}

export default Dashboard;
