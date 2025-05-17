import { useNavigate } from 'react-router-dom';

// Change to default export to match the import in Dashboard.jsx
const useAuth = () => {
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  
  return { logout, isAuthenticated };
};

export { useAuth }; // Export as a named export