import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';

import './EmployeeView.css';

function EmployeeView() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/employees/${id}`);
        setEmployee(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load employee details');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) return <p>Loading employee details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!employee) return <p>No employee data found.</p>;

  return (
    <div className="employee-view-container">
      <h2 className="employee-view-header">Employee Details</h2>
      <div className="tabs">
        <button
          className={activeTab === 'general' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('general')}
        >
          General Info
        </button>
        <button
          className={activeTab === 'department' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('department')}
        >
          Department
        </button>
        <button
          className={activeTab === 'salary' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('salary')}
        >
          Salary
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'general' && (
          <div className="employee-details">
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
          </div>
        )}
        {activeTab === 'department' && (
          <div className="employee-details">
            <p><strong>Department:</strong> {employee.department}</p>
          </div>
        )}
        {activeTab === 'salary' && (
          <div className="employee-details">
            <p><strong>Salary:</strong> {employee.salary}</p>
          </div>
        )}
      </div>
      <Link to="/employees" className="btn-back">← Back to List</Link>
    </div>
  );
}

export default EmployeeView;
