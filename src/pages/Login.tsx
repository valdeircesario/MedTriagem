import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, User, UserCog } from 'lucide-react';
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
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const { login, resetPassword } = useAuth();
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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setResetSuccess(false);

    if (!resetEmail) {
      setError('Por favor, informe seu e-mail');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(resetEmail);
      setResetSuccess(true);
      setResetEmail('');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.mensagem || 
        'Erro ao enviar e-mail de recuperação. Tente novamente.'
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
            <Stethoscope className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            MedTriagem
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

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Esqueceu sua senha?
                </button>
              </div>
            </div>

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

          {tipoUsuario === 'usuario' && (
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

      {/* Modal de recuperação de senha */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black opacity-40" onClick={() => setShowResetModal(false)}></div>
            
            <div className="bg-white rounded-lg shadow-xl z-10 w-full max-w-md p-6 relative">
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                Recuperar Senha
              </h3>
              
              {resetSuccess ? (
                <div>
                  <Alert type="success" message="Um link de recuperação foi enviado para seu e-mail." className="mb-4" />
                  <Button onClick={() => setShowResetModal(false)} fullWidth>
                    Fechar
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword}>
                  <Input
                    id="resetEmail"
                    name="resetEmail"
                    type="email"
                    label="E-mail cadastrado"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    fullWidth
                    placeholder="seu@email.com"
                  />
                  
                  <div className="mt-6 flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowResetModal(false)}
                      fullWidth
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      fullWidth
                    >
                      {loading ? 'Enviando...' : 'Enviar Link'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;