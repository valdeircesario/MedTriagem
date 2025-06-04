import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    endereco: '',
    telefone: '',
    dataNascimento: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { cadastrar } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarTelefone = (telefone) => {
  // Remover todos os caracteres não numéricos
  const apenasNumeros = telefone.replace(/\D/g, '');

  // Aplicar a máscara (00) 00000-0000
  const telefoneFormatado = apenasNumeros.replace(
    /^(\d{2})(\d{5})(\d{4})$/,
    '($1) $2-$3'
  );

  // Atualizar o campo com o telefone formatado
  setFormData((prev) => ({ ...prev, telefone: telefoneFormatado }));

  // Validar se o telefone tem o formato correto
  const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  if (!telefoneRegex.test(telefoneFormatado)) {
    setError('Por favor, insira um telefone válido no formato (00) 00000-0000');
    return false;
  }

  return true;
};

  const validarFormulario = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.endereco || 
        !formData.telefone || !formData.dataNascimento) {
      setError('Por favor, preencha todos os campos');
      return false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return false;
    }

    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    // Validar formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um e-mail válido');
      return false;
    }
    // Validar telefone
    if (!validarTelefone(formData.telefone)) {
    return false;
    }

        // Validar data de nascimento
    const hoje = new Date();
    const dataNascimento = new Date(formData.dataNascimento);
    const anoMinimo = 1910;
    
    // Verificar se a data de nascimento é maior ou igual a hoje
    if (dataNascimento >= hoje) {
      setError('Data de nascimento não pode ser maior ou igual a hoje');
      return false;
    }
    
    // Verificar se a data de nascimento é anterior ao ano mínimo
    if (dataNascimento.getFullYear() < anoMinimo) {
      setError('Data de nascimento inválida. Ano deve ser maior ou igual a 1910');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validarFormulario()) {
      return;
    }
    
    try {
      setLoading(true);
      await cadastrar({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        endereco: formData.endereco,
        telefone: formData.telefone,
        dataNascimento: formData.dataNascimento
      });
      
      setSuccess('Cadastro realizado com sucesso! Redirecionando...');
      
      // Aguardar 2 segundos antes de redirecionar
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.mensagem || 
        'Erro ao cadastrar. Tente novamente mais tarde.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Stethoscope className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Cadastre-se no MedTriagem
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Crie sua conta para acessar o sistema de triagem
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="nome"
              name="nome"
              type="text"
              label="Nome completo"
              value={formData.nome}
              onChange={handleChange}
              required
              fullWidth
              placeholder="Seu nome completo"
            />

            <Input
              id="email"
              name="email"
              type="email"
              label="E-mail"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              fullWidth
              placeholder="seu@email.com"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="senha"
                name="senha"
                type="password"
                label="Senha"
                value={formData.senha}
                onChange={handleChange}
                required
                fullWidth
                placeholder="Sua senha"
              />

              <Input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                label="Confirmar senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
                fullWidth
                placeholder="Confirme sua senha"
              />
            </div>

            <Input
              id="endereco"
              name="endereco"
              type="text"
              label="Endereço completo"
              value={formData.endereco}
              onChange={handleChange}
              required
              fullWidth
              placeholder="Rua, número, bairro, cidade, estado"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                label="Telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                fullWidth
                placeholder="(00) 00000-0000"
              />

              <Input
                id="dataNascimento"
                name="dataNascimento"
                type="date"
                label="Data de nascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
                fullWidth
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;