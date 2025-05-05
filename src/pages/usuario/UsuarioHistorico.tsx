import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, FileText, AlertCircle } from 'lucide-react';
import Card from '../../components/Card';
import Alert from '../../components/Alert';
import Button from '../../components/Button';

const API_URL = 'http://localhost:3001/api';

const UsuarioHistorico = () => {
  const [historicos, setHistoricos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [historicoExpandido, setHistoricoExpandido] = useState(null);

  useEffect(() => {
    carregarHistoricos();
  }, []);

  const carregarHistoricos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/usuario/historico-medico`);
      setHistoricos(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar histórico médico. Tente novamente mais tarde.');
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

  // Expandir ou recolher histórico
  const toggleHistorico = (id) => {
    if (historicoExpandido === id) {
      setHistoricoExpandido(null);
    } else {
      setHistoricoExpandido(id);
    }
  };

  if (loading && historicos.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Meu Histórico Médico</h1>
      <p className="text-gray-600 mb-6">Consulte seu histórico de atendimentos e diagnósticos</p>
      
      {error && <Alert type="error" message={error} className="mb-4" />}
      
      {historicos.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum histórico médico</h3>
            <p className="text-gray-600 mb-4">
              Você ainda não possui registros de histórico médico. Após realizar uma consulta, o médico registrará seu diagnóstico e ele aparecerá aqui.
            </p>
            <Button onClick={() => window.location.href = '/consultas'}>
              Ver minhas consultas
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {historicos
            .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
            .map((historico) => (
              <Card 
                key={historico.id} 
                className={`border-l-4 border-purple-500 transition-all duration-300 ${
                  historicoExpandido === historico.id ? 'shadow-lg' : 'hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="font-medium">{formatarData(historico.consulta.data)}</span>
                        <Clock className="h-5 w-5 text-gray-500 ml-4 mr-2" />
                        <span>{historico.consulta.hora}</span>
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-900 mt-2">
                        {historico.consulta.especialidade} com Dr(a). {historico.consulta.medico}
                      </h3>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => toggleHistorico(historico.id)}
                      className="text-sm px-3"
                    >
                      {historicoExpandido === historico.id ? 'Recolher' : 'Ver detalhes'}
                    </Button>
                  </div>
                  
                  {historicoExpandido === historico.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Diagnóstico</h4>
                        <p className="text-gray-700 whitespace-pre-line">{historico.diagnostico}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Conclusão</h4>
                        <p className="text-gray-700 whitespace-pre-line">{historico.conclusao}</p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Triagem relacionada</h4>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">Gravidade:</span>
                            <span className={`font-medium ${
                              historico.consulta.triagem.gravidade === 'Crítico' 
                                ? 'text-red-600' 
                                : historico.consulta.triagem.gravidade === 'Grave' 
                                  ? 'text-orange-600' 
                                  : 'text-green-600'
                            }`}>
                              {historico.consulta.triagem.gravidade}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Data da triagem:</span>
                            <span>{formatarData(historico.consulta.triagem.criadoEm)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default UsuarioHistorico;