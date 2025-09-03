import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const Register = lazy(() => import('./components/Auth/Register'));
const Login = lazy(() => import('./components/Auth/Login'));
const EmployeeForm = lazy(() => import('./components/Employee/EmployeeForm'));
const EmployeeList = lazy(() => import('./components/Employee/EmployeeList'));
const EmployeeView = lazy(() => import('./components/Employee/EmployeeView'));
const ForgotPassword = lazy(() => import('./components/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/Auth/ResetPassword'));


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected routes nested under PrivateRoute */}
            <Route
              element={
                <PrivateRoute>
                  <Outlet />
                </PrivateRoute>
              }
            >
              <Route path="/" element={<EmployeeList />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/employees/create" element={<EmployeeForm />} />
              <Route path="/employees/edit/:id" element={<EmployeeForm />} />
              <Route path="/employees/view/:id" element={<EmployeeView />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
