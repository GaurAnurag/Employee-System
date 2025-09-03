import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

import './EmployeeList.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (query = '') => {
    setLoading(true);
    try {
      const url = query ? `/employees/search?q=${encodeURIComponent(query)}` : '/employees';
      const response = await api.get(url);
      setEmployees(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchEmployees(value);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await api.delete(`/employees/${id}`);
      setEmployees(employees.filter(emp => emp.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete employee');
    }
  };

  return (
    <div className="employee-list-wrapper">
      <div className="employee-list-header">
        <h2 className="attractive-header">Employee List</h2>
        <Link to="/employees/create" className="btn-add">+ Add Employee</Link>
      </div>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      {error && <p className="error-text" style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : employees.length === 0 ? (
        <p className="empty-text">No employees found.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/employees/view/${emp.id}`} className="btn-edit">View</Link>
                    <Link to={`/employees/edit/${emp.id}`} className="btn-edit">Edit</Link>
                    <button onClick={() => handleDelete(emp.id)} className="btn-delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeList;
