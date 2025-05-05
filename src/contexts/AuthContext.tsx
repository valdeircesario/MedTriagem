import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:3001/api';

// Criar o contexto de autenticação
const AuthContext = createContext<any>(null);

// Provider do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar token ao iniciar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Verificar validade do token
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        // Se o token estiver expirado, fazer logout
        if (decodedToken.exp < currentTime) {
          logout();
          return;
        }
        
        // Configurar usuário com os dados do token
        setUser({
          id: decodedToken.id,
          email: decodedToken.email,
          role: decodedToken.role
        });
        
        // Configurar axios para enviar o token em todas as requisições
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  // Função de login
  const login = async (email, senha, tipoUsuario) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        senha,
        tipoUsuario
      });
      
      const { token, usuario } = response.data;
      
      // Salvar token e configurar axios
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Atualizar estado do usuário
      setUser(usuario);
      
      return usuario;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  // Função de cadastro
  const cadastrar = async (dadosUsuario) => {
    try {
      const response = await axios.post(`${API_URL}/usuarios/cadastro`, dadosUsuario);
      
      const { token, usuario } = response.data;
      
      // Salvar token e configurar axios
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Atualizar estado do usuário
      setUser(usuario);
      
      return usuario;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Valores expostos pelo contexto
  const contextValue = {
    user,
    loading,
    login,
    cadastrar,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};