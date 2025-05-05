import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin, UserCircle, CheckCircle, XCircle, FileText, Search, X } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Alert from '../../components/Alert';

const API_URL = 'http://localhost:3001/api';

const AdminConsultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filtro, setFiltro] = useState('hoje'); // hoje, futuras, todas
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal de histórico médico
  const [mostrarModal, setMostrarModal] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [formHistorico, setFormHistorico] = useState({
    diagnostico: '',
    conclusao: ''
  });

  useEffect(() => {
    carregarConsultas();
  }, [filtro]);

  const carregarConsultas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/consultas`);
      const todasConsultas = response.data;
      
      // Filtrar consultas conforme necessário
      if (filtro === 'hoje') {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        const amanha = new Date(hoje);
        amanha.setDate(hoje.getDate() + 1);
        
        const consultasHoje = todasConsultas.filter(c => {
          const dataConsulta = new Date(c.data);
          return dataConsulta >= hoje && dataConsulta < amanha;
        });
        
        setConsultas(consultasHoje);
      } else if (filtro === 'futuras') {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        const consultasFuturas = todasConsultas.filter(c => {
          const dataConsulta = new Date(c.data);
          return dataConsulta >= hoje;
        });
        
        setConsultas(consultasFuturas);
      } else {
        setConsultas(todasConsultas);
      }
      
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar consultas. Tente novamente mais tarde.');
      setLoading(false);
    }
  };

  const handleRegistrarHistorico = (consulta) => {
    // Verificar se já existe histórico
    if (consulta.historicoMedico) {
      setError('Esta consulta já possui um histórico médico registrado.');
      return;
    }
    
    setConsultaSelecionada(consulta);
    setMostrarModal(true);
    setFormHistorico({
      diagnostico: '',
      conclusao: ''
    });
  };

  const handleChangeHistorico = (e) => {
    const { name, value } = e.target;
    setFormHistorico(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitHistorico = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      
      // Validar formulário
      if (!formHistorico.diagnostico || !formHistorico.conclusao) {
        setError('Por favor, preencha todos os campos');
        setLoading(false);
        return;
      }
      
      // Enviar histórico
      await axios.post(`${API_URL}/admin/historico-medico`, {
        usuarioId: consultaSelecionada.usuarioId,
        consultaId: consultaSelecionada.id,
        ...formHistorico
      });
      
      setSuccess('Histórico médico registrado com sucesso!');
      setMostrarModal(false);
      setConsultaSelecionada(null);
      
      // Recarregar consultas
      await carregarConsultas();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.mensagem || 
        'Erro ao registrar histórico médico. Tente novamente mais tarde.'
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
      year: 'numeric'
    });
  };

  // Filtrar consultas por termo de busca
  const consultasFiltradas = consultas.filter(consulta => {
    if (!searchTerm) return true;
    
    const termoBusca = searchTerm.toLowerCase();
    return (
      (consulta.usuario?.nome?.toLowerCase().includes(termoBusca)) ||
      (consulta.especialidade?.toLowerCase().includes(termoBusca)) ||
      (consulta.medico?.toLowerCase().includes(termoBusca))
    );
  });

  // Ordenar consultas por data
  const consultasOrdenadas = [...consultasFiltradas].sort((a, b) => {
    // Primeiro por data
    const dataComparison = new Date(a.data) - new Date(b.data);
    if (dataComparison !== 0) return dataComparison;
    
    // Se mesma data, ordenar por hora
    return a.hora.localeCompare(b.hora);
  });

  if (loading && consultas.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Gerenciamento de Consultas</h1>
      <p className="text-gray-600 mb-6">Visualizar, filtro e registro históricos médicos de consultas</p>
      
      {error && <Alert type="error" message={error} className="mb-4" />}
      {success && <Alert type="success" message={success} className="mb-4" />}
      
      {/* Filtros e busca */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex space-x-2">
          <Button 
            variant={filtro === 'hoje' ? 'primary' : 'outline'}
            onClick={() => setFiltro('hoje')}
          >
            Hoje
          </Button>
          <Button 
            variant={filtro === 'futuras' ? 'primary' : 'outline'}
            onClick={() => setFiltro('futuras')}
          >
            Futuras
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
            placeholder="Buscar por nome, médico ou especialidade"
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
      
      {consultasOrdenadas.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filtro === 'hoje' 
                ? 'Não há consultas agendadas para hoje' 
                : filtro === 'futuras'
                  ? 'Não há consultas futuras agendadas'
                  : 'Nenhuma consulta encontrada'}
            </h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Tente usar outros termos de busca'
                : 'Agende consultas para pacientes a partir das triagens'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {consultasOrdenadas.map((consulta) => {
            const dataConsulta = new Date(consulta.data);
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            
            const consultaPassada = dataConsulta < hoje;
            const possuiHistorico = !!consulta.historicoMedico;
            
            return (
              <Card 
                key={consulta.id} 
                className={`transition-all hover:shadow-md ${consultaPassada ? 'opacity-75' : ''}`}
              >
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="font-medium">{formatarData(consulta.data)}</span>
                      <Clock className="h-5 w-5 text-gray-500 ml-4 mr-2" />
                      <span>{consulta.hora}</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <UserCircle className="h-5 w-5 text-gray-500 mr-1" />
                      <span className="font-medium">{consulta.usuario.nome}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {consulta.usuario.email} • {consulta.usuario.telefone}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {consulta.especialidade} com Dr(a). {consulta.medico}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{consulta.local}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        consulta.triagem.gravidade === 'Crítico' 
                          ? 'bg-red-100 text-red-800' 
                          : consulta.triagem.gravidade === 'Grave' 
                            ? 'bg-orange-100 text-orange-800' 
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {consulta.triagem.gravidade}
                      </span>
                      
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${consulta.confirmada ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {consulta.confirmada ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Confirmada
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 mr-1" />
                            Não confirmada
                          </>
                        )}
                      </span>
                      
                      {possuiHistorico && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <FileText className="h-3 w-3 mr-1" />
                          Histórico registrado
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {consultaPassada && !possuiHistorico && (
                      <Button 
                        onClick={() => handleRegistrarHistorico(consulta)}
                        className="whitespace-nowrap"
                      >
                        Registrar histórico
                      </Button>
                    )}
                    
                    {possuiHistorico && (
                      <div className="bg-purple-50 p-3 rounded-lg text-sm">
                        <p className="text-purple-800 font-medium mb-1">
                          Histórico médico existente
                        </p>
                        <p className="text-purple-700">
                          Esta consulta já possui um histórico médico registrado.
                        </p>
                      </div>
                    )}
                    
                    {!consultaPassada && (
                      <div className={`p-3 rounded-lg text-sm ${consulta.confirmada ? 'bg-green-50' : 'bg-yellow-50'}`}>
                        <p className={`font-medium mb-1 ${consulta.confirmada ? 'text-green-800' : 'text-yellow-800'}`}>
                          {consulta.confirmada ? 'Presença confirmada' : 'Aguardando confirmação'}
                        </p>
                        <p className={consulta.confirmada ? 'text-green-700' : 'text-yellow-700'}>
                          {consulta.confirmada 
                            ? 'O paciente confirmou a presença na consulta.'
                            : 'O paciente ainda não confirmou a presença.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      
      {/* Modal de histórico médico */}
      {mostrarModal && consultaSelecionada && (
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
                Registrar Histórico Médico
              </h3>
              
              <p className="text-gray-600 mb-4">
                Paciente: <span className="font-medium">{consultaSelecionada.usuario.nome}</span><br />
                Consulta: <span className="font-medium">
                  {consultaSelecionada.especialidade} em {formatarData(consultaSelecionada.data)}
                </span>
              </p>
              
              {error && <Alert type="error" message={error} className="mb-4" />}
              
              <form onSubmit={handleSubmitHistorico}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="diagnostico" className="block text-sm font-medium text-gray-700 mb-1">
                      Diagnóstico
                    </label>
                    <textarea
                      id="diagnostico"
                      name="diagnostico"
                      rows={4}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      placeholder="Descreva o diagnóstico do paciente"
                      value={formHistorico.diagnostico}
                      onChange={handleChangeHistorico}
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="conclusao" className="block text-sm font-medium text-gray-700 mb-1">
                      Conclusão e Recomendações
                    </label>
                    <textarea
                      id="conclusao"
                      name="conclusao"
                      rows={4}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      placeholder="Descreva a conclusão e recomendações para o paciente"
                      value={formHistorico.conclusao}
                      onChange={handleChangeHistorico}
                      required
                    ></textarea>
                  </div>
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
                    {loading ? 'Salvando...' : 'Salvar Histórico'}
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

export default AdminConsultas;