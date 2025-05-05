import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserCircle, AlertCircle, Calendar, Clock, MapPin, Search, X } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Alert from '../../components/Alert';

const API_URL = 'http://localhost:3001/api';

const AdminTriagens = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [triagens, setTriagens] = useState([]);
  const [triagemSelecionada, setTriagemSelecionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filtro, setFiltro] = useState('pendentes'); // pendentes, todas
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal de agendamento
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formAgendamento, setFormAgendamento] = useState({
    data: '',
    hora: '',
    local: '',
    especialidade: '',
    medico: ''
  });

  // Recuperar ID da triagem da URL, se houver
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idTriagem = params.get('id');
    if (idTriagem) {
      carregarDetalhesTriagem(idTriagem);
    }
  }, [location]);

  useEffect(() => {
    carregarTriagens();
  }, [filtro]);

  const carregarTriagens = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/triagens`);
      const todasTriagens = response.data;
      
      // Filtrar triagens conforme necessário
      if (filtro === 'pendentes') {
        const pendentes = todasTriagens.filter(t => 
          !t.consultas || t.consultas.length === 0
        );
        setTriagens(pendentes);
      } else {
        setTriagens(todasTriagens);
      }
      
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar triagens. Tente novamente mais tarde.');
      setLoading(false);
    }
  };

  const carregarDetalhesTriagem = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/triagens`);
      const todasTriagens = response.data;
      const triagem = todasTriagens.find(t => t.id === parseInt(id));
      
      if (triagem) {
        setTriagemSelecionada(triagem);
      }
      
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar detalhes da triagem. Tente novamente mais tarde.');
      setLoading(false);
    }
  };

  const handleAgendarConsulta = (triagem) => {
    setTriagemSelecionada(triagem);
    setMostrarModal(true);
    
    // Inicializar formulário com data atual
    const hoje = new Date();
    const dataFormatada = hoje.toISOString().split('T')[0];
    
    setFormAgendamento({
      data: dataFormatada,
      hora: '',
      local: '',
      especialidade: '',
      medico: ''
    });
  };

  const handleChangeAgendamento = (e) => {
    const { name, value } = e.target;
    setFormAgendamento(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAgendamento = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      
      // Validar formulário
      if (!formAgendamento.data || !formAgendamento.hora || !formAgendamento.local ||
          !formAgendamento.especialidade || !formAgendamento.medico) {
        setError('Por favor, preencha todos os campos');
        setLoading(false);
        return;
      }
      
      // Enviar agendamento
      await axios.post(`${API_URL}/admin/consultas`, {
        usuarioId: triagemSelecionada.usuarioId,
        triagemId: triagemSelecionada.id,
        ...formAgendamento
      });
      
      setSuccess('Consulta agendada com sucesso!');
      setMostrarModal(false);
      setTriagemSelecionada(null);
      
      // Recarregar triagens
      await carregarTriagens();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.mensagem || 
        'Erro ao agendar consulta. Tente novamente mais tarde.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Formatar data
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filtrar triagens por termo de busca
  const triagensFiltradas = triagens.filter(triagem => {
    if (!searchTerm) return true;
    
    const termoBusca = searchTerm.toLowerCase();
    return (
      (triagem.usuario?.nome?.toLowerCase().includes(termoBusca)) ||
      (triagem.gravidade?.toLowerCase().includes(termoBusca))
    );
  });

  // Ordenar triagens por gravidade e data
  const triagensOrdenadas = [...triagensFiltradas].sort((a, b) => {
    // Primeiro por gravidade (Crítico > Grave > Leve)
    const ordemGravidade = { 'Crítico': 0, 'Grave': 1, 'Leve': 2 };
    if (ordemGravidade[a.gravidade] !== ordemGravidade[b.gravidade]) {
      return ordemGravidade[a.gravidade] - ordemGravidade[b.gravidade];
    }
    
    // Depois por data (mais recente primeiro)
    return new Date(b.criadoEm) - new Date(a.criadoEm);
  });

  if (loading && triagens.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Gerenciamento de Triagens</h1>
      <p className="text-gray-600 mb-6">Visualize, filtre e agende consultas para triagens médicas</p>
      
      {error && <Alert type="error" message={error} className="mb-4" />}
      {success && <Alert type="success" message={success} className="mb-4" />}
      
      {/* Filtros e busca */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex space-x-2">
          <Button 
            variant={filtro === 'pendentes' ? 'primary' : 'outline'}
            onClick={() => setFiltro('pendentes')}
          >
            Pendentes
          </Button>
          <Button 
            variant={filtro === 'todas' ? 'primary' : 'outline'}
            onClick={() => setFiltro('todas')}
          >
            Todas
          </Button>
        </div>
        
        <div className="relative w-full md:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-64"
            placeholder="Buscar por nome ou gravidade"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>
      
      {triagensOrdenadas.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filtro === 'pendentes' 
                ? 'Não há triagens pendentes' 
                : 'Nenhuma triagem encontrada'}
            </h3>
            <p className="text-gray-600">
              {filtro === 'pendentes'
                ? 'Todas as triagens já foram processadas'
                : searchTerm 
                  ? 'Tente usar outros termos de busca'
                  : 'Não há triagens registradas no sistema'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {triagensOrdenadas.map((triagem) => (
            <Card 
              key={triagem.id} 
              className={`border-l-4 transition-all hover:shadow-md ${
                triagem.gravidade === 'Crítico' 
                  ? 'border-red-500' 
                  : triagem.gravidade === 'Grave' 
                    ? 'border-orange-500' 
                    : 'border-green-500'
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      triagem.gravidade === 'Crítico' 
                        ? 'bg-red-100 text-red-800' 
                        : triagem.gravidade === 'Grave' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {triagem.gravidade}
                    </span>
                    <span className="text-sm text-gray-500">
                      ID: {triagem.id} • {formatarData(triagem.criadoEm)}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <UserCircle className="h-5 w-5 text-gray-500 mr-1" />
                    <span className="font-medium">{triagem.usuario.nome}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {triagem.usuario.email} • {triagem.usuario.telefone}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Condições</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>
                          Diabético: {triagem.diabetico ? 'Sim' : 'Não'}
                        </li>
                        <li>
                          Hipertenso: {triagem.hipertenso ? 'Sim' : 'Não'}
                        </li>
                        <li>
                          Obeso: {triagem.obeso ? 'Sim' : 'Não'}
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Sintomas</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>
                          Febre: {triagem.febre ? `Sim (${triagem.temperatura}°C)` : 'Não'}
                        </li>
                        <li>
                          Dor: {triagem.temDor ? `Sim (${triagem.localDor})` : 'Não'}
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Informações</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>
                          Peso: {triagem.peso} kg
                        </li>
                        <li>
                          Idade: {triagem.idade} anos
                        </li>
                        <li>
                          Pontuação: {triagem.pontuacao.toFixed(1)}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {(triagem.consultas && triagem.consultas.length > 0) ? (
                    <div className="bg-green-50 p-3 rounded-lg text-sm">
                      <p className="text-green-800 font-medium mb-1">
                        Consulta agendada
                      </p>
                      <p className="text-green-700">
                        O paciente já possui uma consulta agendada para esta triagem.
                      </p>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => handleAgendarConsulta(triagem)}
                      className="whitespace-nowrap"
                    >
                      Agendar Consulta
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {/* Modal de agendamento */}
      {mostrarModal && triagemSelecionada && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black opacity-40"></div>
            
            <div className="bg-white rounded-lg shadow-xl z-10 w-full max-w-md p-6 relative">
              <button
                onClick={() => setMostrarModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
              
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Agendar Consulta
              </h3>
              
              <p className="text-gray-600 mb-4">
                Paciente: <span className="font-medium">{triagemSelecionada.usuario.nome}</span><br />
                Gravidade: <span className={`font-medium ${
                  triagemSelecionada.gravidade === 'Crítico' 
                    ? 'text-red-600' 
                    : triagemSelecionada.gravidade === 'Grave' 
                      ? 'text-orange-600' 
                      : 'text-green-600'
                }`}>
                  {triagemSelecionada.gravidade}
                </span>
              </p>
              
              {error && <Alert type="error" message={error} className="mb-4" />}
              
              <form onSubmit={handleSubmitAgendamento}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      id="data"
                      name="data"
                      type="date"
                      label="Data da consulta"
                      value={formAgendamento.data}
                      onChange={handleChangeAgendamento}
                      required
                      fullWidth
                    />
                    
                    <Input
                      id="hora"
                      name="hora"
                      type="time"
                      label="Hora da consulta"
                      value={formAgendamento.hora}
                      onChange={handleChangeAgendamento}
                      required
                      fullWidth
                    />
                  </div>
                  
                  <Input
                    id="local"
                    name="local"
                    type="text"
                    label="Local da consulta"
                    value={formAgendamento.local}
                    onChange={handleChangeAgendamento}
                    required
                    fullWidth
                    placeholder="ex: Clínica Central, Sala 101"
                  />
                  
                  <Input
                    id="especialidade"
                    name="especialidade"
                    type="text"
                    label="Especialidade médica"
                    value={formAgendamento.especialidade}
                    onChange={handleChangeAgendamento}
                    required
                    fullWidth
                    placeholder="ex: Cardiologia, Clínica Geral"
                  />
                  
                  <Input
                    id="medico"
                    name="medico"
                    type="text"
                    label="Nome do médico"
                    value={formAgendamento.medico}
                    onChange={handleChangeAgendamento}
                    required
                    fullWidth
                    placeholder="ex: Dr. João Silva"
                  />
                </div>
                
                <div className="flex justify-end mt-6 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setMostrarModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Agendando...' : 'Agendar Consulta'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTriagens;