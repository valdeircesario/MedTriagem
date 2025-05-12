import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Guitar as Hospital, User, UserCog } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('usuario');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !senha) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      setLoading(true);
      const usuario = await login(email, senha, tipoUsuario);
      
      // Redirecionar para a página correta com base no tipo de usuário
      if (usuario.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.mensagem || 
        'Falha no login. Verifique suas credenciais.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <img src="/src/imagens/011.PNG" alt="Logo" className="h-14 w-15" />
  
            
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            MediTriagem
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sistema de Triagem Médica
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setTipoUsuario('usuario')}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-l-md
                  ${tipoUsuario === 'usuario'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
              >
                <User className="mr-2 h-4 w-4" />
                Paciente
              </button>
              <button
                onClick={() => setTipoUsuario('admin')}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-md
                  ${tipoUsuario === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
              >
                <UserCog className="mr-2 h-4 w-4" />
                Administrador
              </button>
            </div>
          </div>

          {error && <Alert type="error" message={error} />}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"

              name="email"
              type="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              fullWidth
              placeholder="seu@email.com"
            />

            <Input
              id="senha"
              name="senha"
              type="password"
              label="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
              required
              fullWidth
              placeholder="Sua senha"
            />

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>
          </form>

                    {(tipoUsuario === 'usuario' || tipoUsuario === 'admin') && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{' '}
                <Link to="/cadastro" className="font-medium text-blue-600 hover:text-blue-500">
                  Cadastre-se
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;