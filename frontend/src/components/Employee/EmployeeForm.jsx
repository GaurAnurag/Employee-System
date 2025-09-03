import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import './EmployeeForm.css';

function EmployeeForm() {
  const [formData, setFormData] = useState({ name: '', email:'', department: '', salary: '' });
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get('/employees/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments', error);
        setAlert({ message: 'Error loading departments.', type: 'error' });
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const response = await api.get(`/employees/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching employee', error);
          setAlert({ message: 'Error fetching employee data.', type: 'error' });
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const validateForm = () => {
  const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.department) newErrors.department = 'Department is required';
    if (formData.salary === '' || formData.salary < 0) newErrors.salary = 'Salary must be non-negative';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  try {
    if (id) {
      await api.put(`/employees/${id}`, formData);
      setAlert({ message: 'Employee updated successfully.', type: 'success' });
    } else {
      await api.post('/employees', formData);
      setAlert({ message: 'Employee added successfully.', type: 'success' });
    }
    setTimeout(() => navigate('/employees'), 1500);
  } catch (error) {
    console.error('Error saving employee', error);
    setAlert({ message: 'Error saving employee data.', type: 'error' });
  }
};

  return (
    <div className="employee-form-container">
      <h2 className="employee-form-header">{id ? 'Edit Employee' : 'Add Employee'}</h2>
      {alert.message && (
        <div className={alert.type === 'error' ? 'alert alert-error' : 'alert alert-success'}>
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="department">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
          required
        />
        {errors.name && <div className="error-text">{errors.name}</div>}

        <label htmlFor="department">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={errors.email ? 'input-error' : ''}
          required
        />
        {errors.email && <div className="error-text">{errors.email}</div>}

        <label htmlFor="department">Department:</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={errors.department ? 'input-error' : ''}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
        {errors.department && <div className="error-text">{errors.department}</div>}

       <label htmlFor="salary">Salary (in ₹):</label>
<input
  type="number"
  id="salary"
  name="salary"
  placeholder="Enter salary amount"
  value={formData.salary}
  onChange={handleChange}
  className={errors.salary ? 'input-error' : ''}
  min="0"
  step="0.01"
  title="Enter a valid salary. It must be a non-negative number (e.g., 35000.50)"
  required
/>
{errors.salary && <div className="error-text">{errors.salary}</div>}

        {errors.salary && <div className="error-text">{errors.salary}</div>}

        <button type="submit">{id ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
