import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Container, ListGroup, Card, Modal, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../components/ConfirmationModal'; // Import the modal

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [updateForm, setUpdateForm] = useState({ id: '', status: '', response: '' });
  const [editUserForm, setEditUserForm] = useState({ id: '', email: '', role: '' });
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => () => {});
  const [confirmMessage, setConfirmMessage] = useState('');
  const [passwordForm, setPasswordForm] = useState({ id: '', password: '' });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://citizen-engagement-backend.onrender.com/api/admin/complaints', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setComplaints(response.data))
      .catch(err => {
        console.error('Error:', err);
        toast.error('Failed to fetch complaints');
      });
    axios.get('http://citizen-engagement-backend.onrender.com/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setUsers(response.data))
      .catch(err => {
        console.error('Error:', err);
        toast.error('Failed to fetch users');
      });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://citizen-engagement-backend.onrender.com/api/admin/complaints/${updateForm.id}`, {
        status: updateForm.status,
        response: updateForm.response
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const response = await axios.get('http://citizen-engagement-backend.onrender.com/api/admin/complaints', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(response.data);
      setUpdateForm({ id: '', status: '', response: '' });
      toast.success('Complaint updated');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to update complaint');
    }
  };

  const handleDeleteComplaint = async (id) => {
    setConfirmMessage('Are you sure you want to delete this complaint?');
    setConfirmAction(() => async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://citizen-engagement-backend.onrender.com/api/admin/complaints/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComplaints(complaints.filter(complaint => complaint._id !== id));
        toast.success('Complaint deleted');
      } catch (err) {
        console.error('Error:', err);
        toast.error('Failed to delete complaint');
      } finally {
        setShowConfirmModal(false);
      }
    });
    setShowConfirmModal(true);
  };

  const handleDeleteUser = async (id) => {
    setConfirmMessage('Are you sure you want to delete this user?');
    setConfirmAction(() => async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://citizen-engagement-backend.onrender.com/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(users.filter(user => user._id !== id));
        toast.success('User deleted');
      } catch (err) {
        console.error('Error:', err);
        toast.error('Failed to delete user');
      } finally {
        setShowConfirmModal(false);
      }
    });
    setShowConfirmModal(true);
  };

  const handleEditUser = (user) => {
    setEditUserForm({ id: user._id, email: user.email, role: user.role });
    setShowEditUserModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://citizen-engagement-backend.onrender.com/api/admin/users/${editUserForm.id}`, {
        email: editUserForm.email,
        role: editUserForm.role
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const response = await axios.get('http://citizen-engagement-backend.onrender.com/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      setShowEditUserModal(false);
      toast.success('User updated');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to update user');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://citizen-engagement-backend.onrender.com/api/admin/users/${passwordForm.id}/password`, {
        password: passwordForm.password
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowPasswordModal(false);
      toast.success('Password updated successfully');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to update password');
    }
  };

  return (
    <Container>
      <h2 className="text-primary">Admin Dashboard</h2>
      <p><Link to="/analytics" className="btn btn-info">
        <FontAwesomeIcon icon={faChartBar} className="me-2" /> View Analytics
      </Link></p>

      <h3>All Complaints</h3>
      <ListGroup>
        {complaints.map(complaint => (
          <ListGroup.Item key={complaint._id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{complaint.title}</strong> (Ticket: {complaint.ticketId}, ID: {complaint._id})<br />
              Category: {complaint.category} | Agency: {complaint.agency}<br />
              Status: {complaint.status} | Response: {complaint.response || 'None'}<br />
              Description: {complaint.description}<br />
              Submitted by: {complaint.userInfo.name} ({complaint.userInfo.contact})
            </div>
            <div>
              <Button variant="warning" size="sm" className="me-2" onClick={() => setUpdateForm({ id: complaint._id, status: complaint.status, response: complaint.response || '' })}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDeleteComplaint(complaint._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h3 className="mt-3">Update Complaint</h3>
      <Card>
        <Card.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Complaint ID (_id from list)</Form.Label>
              <Form.Control
                type="text"
                value={updateForm.id}
                onChange={(e) => setUpdateForm({ ...updateForm, id: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={updateForm.status}
                onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                required
              >
                <option value="">Select Status</option>
                <option value="Submitted">Submitted</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Response</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updateForm.response}
                onChange={(e) => setUpdateForm({ ...updateForm, response: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Update
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <h3 className="mt-3">User Management</h3>
      <ListGroup>
        {users.map(user => (
          <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{user.email}</strong> (ID: {user._id})<br />
              Role: {user.role}<br />
              Created: {new Date(user.createdAt).toLocaleString()}
            </div>
            <div>
              <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditUser(user)}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button variant="info" size="sm" className="me-2" onClick={() => {
                setPasswordForm({ id: user._id, password: '' });
                setShowPasswordModal(true);
              }}>
                <FontAwesomeIcon icon={faUsers} /> Update Password
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showEditUserModal} onHide={() => setShowEditUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateUser}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editUserForm.email}
                onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={editUserForm.role}
                onChange={(e) => setEditUserForm({ ...editUserForm, role: e.target.value })}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdatePassword}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordForm.password}
                onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={confirmAction}
        message={confirmMessage}
      />
    </Container>
  );
}

export default AdminDashboard;
