import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Importar componentes de páginas
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import ResetPassword from './pages/ResetPassword';
import UsuarioHome from './pages/usuario/UsuarioHome';
import UsuarioTriagem from './pages/usuario/UsuarioTriagem';
import UsuarioConsultas from './pages/usuario/UsuarioConsultas';
import UsuarioHistorico from './pages/usuario/UsuarioHistorico';
import AdminHome from './pages/admin/AdminHome';
import AdminTriagens from './pages/admin/AdminTriagens';
import AdminConsultas from './pages/admin/AdminConsultas';
import AdminHistorico from './pages/admin/AdminHistorico';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';

// Rota privada para usuários autenticados
const RotaPrivada = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/'} />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* Rotas de usuário */}
      <Route path="/" element={
        <RotaPrivada requiredRole="usuario">
          <Layout />
        </RotaPrivada>
      }>
        <Route index element={<UsuarioHome />} />
        <Route path="triagem" element={<UsuarioTriagem />} />
        <Route path="consultas" element={<UsuarioConsultas />} />
        <Route path="historico" element={<UsuarioHistorico />} />
      </Route>
      
      {/* Rotas de admin */}
      <Route path="/admin" element={
        <RotaPrivada requiredRole="admin">
          <Layout />
        </RotaPrivada>
      }>
        <Route index element={<AdminHome />} />
        <Route path="triagens" element={<AdminTriagens />} />
        <Route path="consultas" element={<AdminConsultas />} />
        <Route path="historico" element={<AdminHistorico />} />
      </Route>
      
      {/* Rota 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App