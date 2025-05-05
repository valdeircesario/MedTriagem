import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserCircle, Box as HospitalBox, Calendar, ClipboardList, LogOut, Home } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define os links de navegação baseados no tipo de usuário
  const navLinks = isAdmin
    ? [
        { to: '/admin', icon: <Home size={20} />, text: 'Início' },
        { to: '/admin/triagens', icon: <HospitalBox size={20} />, text: 'Triagens' },
        { to: '/admin/consultas', icon: <Calendar size={20} />, text: 'Consultas' },
        { to: '/admin/historico', icon: <ClipboardList size={20} />, text: 'Histórico Médico' },
      ]
    : [
        { to: '/', icon: <Home size={20} />, text: 'Início' },
        { to: '/triagem', icon: <HospitalBox size={20} />, text: 'Nova Triagem' },
        { to: '/consultas', icon: <Calendar size={20} />, text: 'Minhas Consultas' },
        { to: '/historico', icon: <ClipboardList size={20} />, text: 'Meu Histórico' },
      ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar para desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white shadow-md">
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-700">MedTriagem</h1>
            <p className="text-sm text-gray-600 mt-1">Sistema de Triagem Médica</p>
          </div>
          
          <div className="flex-1 px-4 py-6">
            <p className="text-xs uppercase font-semibold text-gray-500 mb-4">Menu Principal</p>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === link.to
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {link.icon}
                  <span className="ml-3">{link.text}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <UserCircle className="h-8 w-8 text-gray-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.nome || 'Usuário'}</p>
                <p className="text-xs text-gray-500">
                  {isAdmin ? 'Administrador' : 'Paciente'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50"
            >
              <LogOut size={18} />
              <span className="ml-2">Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden bg-white shadow-sm fixed top-0 inset-x-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-blue-700">MedTriagem</h1>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="ml-4 text-red-600"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <main className="p-4 md:p-8 mt-14 md:mt-0 pb-20 md:pb-8 min-h-screen">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex justify-around z-10">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex flex-col items-center py-3 flex-1 ${
              location.pathname === link.to ? 'text-blue-700' : 'text-gray-600'
            }`}
          >
            {link.icon}
            <span className="text-xs mt-1">{link.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Layout;