import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin, UserCheck, AlertCircle } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

const API_URL = 'http://localhost:3001/api';

const UsuarioConsultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    carregarConsultas();
  }, []);

  const carregarConsultas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/usuario/consultas`);
      setConsultas(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar consultas. Tente novamente mais tarde.');
      setLoading(false);
    }
  };

  const confirmarConsulta = async (id) => {
    try {
      setLoading(true);
      await axios.put(`${API_URL}/usuario/consultas/${id}/confirmar`);
      setSuccess('Consulta confirmada com sucesso!');
      
      // Atualizar lista de consultas
      await carregarConsultas();
    } catch (err) {
      console.error(err);
      setError('Erro ao confirmar consulta. Tente novamente mais tarde.');
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

  // Checar se a consulta é no futuro
  const isConsultaFutura = (dataString) => {
    const dataConsulta = new Date(dataString);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return dataConsulta >= hoje;
  };

  if (loading && consultas.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Minhas Consultas</h1>
      <p className="text-gray-600 mb-6">Consulte e confirme seus agendamentos médicos</p>
      
      {error && <Alert type="error" message={error} className="mb-4" />}
      {success && <Alert type="success" message={success} className="mb-4" />}
      
      {consultas.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma consulta agendada</h3>
            <p className="text-gray-600 mb-4">
              Você não possui consultas agendadas no momento. Realize uma triagem para que um administrador possa agendar uma consulta para você.
            </p>
            <Button onClick={() => window.location.href = '/triagem'}>
              Realizar nova triagem
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Próximas consultas */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-3">Próximas consultas</h2>
            {consultas.filter(c => isConsultaFutura(c.data)).length === 0 ? (
              <Card>
                <p className="text-gray-600 py-4 text-center">Não há consultas futuras agendadas</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {consultas
                  .filter(c => isConsultaFutura(c.data))
                  .sort((a, b) => new Date(a.data) - new Date(b.data))
                  .map(consulta => (
                    <Card key={consulta.id} className={`border-l-4 ${consulta.confirmada ? 'border-green-500' : 'border-yellow-500'} transition-all duration-300 hover:shadow-md`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="font-medium">{formatarData(consulta.data)}</span>
                            <Clock className="h-5 w-5 text-gray-500 ml-4 mr-2" />
                            <span>{consulta.hora}</span>
                          </div>
                          
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {consulta.especialidade} com Dr(a). {consulta.medico}
                          </h3>
                          
                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{consulta.local}</span>
                          </div>
                          
                          <div className="text-sm text-gray-500">
                            Triagem relacionada: <span className={`font-medium ${consulta.triagem.gravidade === 'Crítico' ? 'text-red-600' : consulta.triagem.gravidade === 'Grave' ? 'text-orange-600' : 'text-green-600'}`}>
                              {consulta.triagem.gravidade}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${consulta.confirmada ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {consulta.confirmada ? (
                              <>
                                <UserCheck className="h-3 w-3 mr-1" />
                                Confirmada
                              </>
                            ) : 'Aguardando confirmação'}
                          </span>
                          
                          {!consulta.confirmada && (
                            <Button
                              onClick={() => confirmarConsulta(consulta.id)}
                              className="mt-3"
                              disabled={loading}
                            >
                              Confirmar presença
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </div>
          
          {/* Consultas passadas */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-3">Consultas anteriores</h2>
            {consultas.filter(c => !isConsultaFutura(c.data)).length === 0 ? (
              <Card>
                <p className="text-gray-600 py-4 text-center">Não há consultas anteriores</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {consultas
                  .filter(c => !isConsultaFutura(c.data))
                  .sort((a, b) => new Date(b.data) - new Date(a.data))
                  .map(consulta => (
                    <Card key={consulta.id} className="opacity-75">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="font-medium">{formatarData(consulta.data)}</span>
                            <Clock className="h-5 w-5 text-gray-500 ml-4 mr-2" />
                            <span>{consulta.hora}</span>
                          </div>
                          
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {consulta.especialidade} com Dr(a). {consulta.medico}
                          </h3>
                          
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{consulta.local}</span>
                          </div>
                        </div>
                        
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${consulta.confirmada ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {consulta.confirmada ? 'Realizada' : 'Não compareceu'}
                        </span>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuarioConsultas;