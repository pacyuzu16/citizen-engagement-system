import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

function Analytics() {
  const [analytics, setAnalytics] = useState({ byCategory: [], byStatus: [], byAgency: [], byUser: [] });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://citizen-engagement-backend.onrender.com/api/admin/analytics', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setAnalytics(response.data))
      .catch(err => console.error('Error:', err));
  }, []);

  const categoryData = {
    labels: analytics.byCategory.map(item => item._id),
    datasets: [{
      label: 'Complaints by Category',
      data: analytics.byCategory.map(item => item.count),
      backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1
    }]
  };

  const statusData = {
    labels: analytics.byStatus.map(item => item._id),
    datasets: [{
      label: 'Complaints by Status',
      data: analytics.byStatus.map(item => item.count),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const agencyData = {
    labels: analytics.byAgency.map(item => item._id),
    datasets: [{
      label: 'Complaints by Agency',
      data: analytics.byAgency.map(item => item.count),
      backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(54, 162, 235, 0.6)'],
      borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(54, 162, 235, 1)'],
      borderWidth: 1
    }]
  };

  const userData = {
    labels: analytics.byUser.map(item => item._id),
    datasets: [{
      label: 'Complaints by User',
      data: analytics.byUser.map(item => item.count),
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true }
    }
  };

  return (
    <Container>
      <h2 className="text-primary">Complaint Analytics</h2>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Complaints by Category</Card.Title>
              <Pie data={categoryData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Complaints by Category' } } }} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Complaints by Status</Card.Title>
              <Bar data={statusData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Complaints by Status' } } }} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Complaints by Agency</Card.Title>
              <Doughnut data={agencyData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Complaints by Agency' } } }} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Complaints by User</Card.Title>
              <Line data={userData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Complaints by User' } } }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Analytics;
