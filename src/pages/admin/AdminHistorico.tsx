import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, FileText, UserCircle, Search, X, ChevronUp, ChevronDown } from 'lucide-react';
import Card from '../../components/Card';
import Alert from '../../components/Alert';

const API_URL = 'http://localhost:3001/api';

const AdminHistorico = () => {
  const [historicos, setHistoricos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [historicoExpandido, setHistoricoExpandido] = useState(null);

  useEffect(() => {
    carregarHistoricos();
  }, []);

  const carregarHistoricos = async () => {
    try {
      // Obter todas as consultas
      const consultasRes = await axios.get(`${API_URL}/admin/consultas`);
      const consultas = consultasRes.data;
      
      // Filtrar consultas com histórico médico
      const consultasComHistorico = consultas.filter(c => c.historicoMedico);
      
      // Mapear para obter os detalhes do histórico médico
      const historicosDetalhados = await Promise.all(
        consultasComHistorico.map(async (consulta) => {
          try {
            // Simulando a obtenção do histórico completo
            
            return {
              ...consulta.historicoMedico,
              consulta,
              usuario: consulta.usuario
            };
          } catch (err) {
            console.error(`Erro ao obter histórico para consulta ${consulta.id}:`, err);
            return null;
          }
        })
      );
      
      // Filtrar históricos nulos (se houver erros)
      const historicosValidos = historicosDetalhados.filter(h => h !== null);
      
      setHistoricos(historicosValidos);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar históricos médicos. Tente novamente mais tarde.');
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

  // Filtrar históricos por termo de busca
  const historicosFiltrados = historicos.filter(historico => {
    if (!searchTerm) return true;
    
    const termoBusca = searchTerm.toLowerCase();
    return (
      (historico.usuario?.nome?.toLowerCase().includes(termoBusca)) ||
      (historico.consulta?.especialidade?.toLowerCase().includes(termoBusca)) ||
      (historico.consulta?.medico?.toLowerCase().includes(termoBusca)) ||
      (historico.diagnostico?.toLowerCase().includes(termoBusca))
    );
  });

  // Ordenar históricos por data (mais recentes primeiro)
  const historicosOrdenados = [...historicosFiltrados].sort((a, b) => {
    return new Date(b.criadoEm) - new Date(a.criadoEm);
  });

  if (loading && historicos.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Históricos Médicos</h1>
      <p className="text-gray-600 mb-6">Visualize e consulte todos os históricos médicos registrados</p>
      
      {error && <Alert type="error" message={error} className="mb-4" />}
      
      {/* Busca */}
      <div className="mb-6">
        
      </div>
      
      {historicosOrdenados.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum histórico médico encontrado
            </h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Tente usar outros termos de busca'
                : 'Ainda não há históricos médicos registrados no sistema'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {historicosOrdenados.map((historico) => (
            <Card 
              key={historico.id} 
              className="border-l-4 border-purple-500 transition-all duration-300 hover:shadow-md"
            >
              <div className="cursor-pointer" onClick={() => toggleHistorico(historico.id)}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-1">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="font-medium">
                        {formatarData(historico.consulta.data)}
                      </span>
                      <Clock className="h-5 w-5 text-gray-500 ml-4 mr-2" />
                      <span>{historico.consulta.hora}</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <UserCircle className="h-5 w-5 text-gray-500 mr-1" />
                      <span className="font-medium">{historico.usuario.nome}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {historico.usuario.email}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900">
                      {historico.consulta.especialidade} com Dr(a). {historico.consulta.medico}
                    </h3>
                    
                    <p className="text-gray-600 mt-1 line-clamp-1">
                      {historico.diagnostico}
                    </p>
                  </div>
                  
                  <button className="text-gray-500 p-1 rounded-full hover:bg-gray-100">
                    {historicoExpandido === historico.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                {historicoExpandido === historico.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Diagnóstico
                      </h4>
                      <p className="text-gray-700 whitespace-pre-line">
                        {historico.diagnostico}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Conclusão e Recomendações
                      </h4>
                      <p className="text-gray-700 whitespace-pre-line">
                        {historico.conclusao}
                      </p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Detalhes da Triagem
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h5 className="font-medium text-gray-700 mb-1">Condições</h5>
                            <ul className="space-y-1 text-gray-600">
                              <li>
                                Diabético: {historico.consulta.triagem.diabetico ? 'Sim' : 'Não'}
                              </li>
                              <li>
                                Hipertenso: {historico.consulta.triagem.hipertenso ? 'Sim' : 'Não'}
                              </li>
                              <li>
                                Obeso: {historico.consulta.triagem.obeso ? 'Sim' : 'Não'}
                              </li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-700 mb-1">Sintomas</h5>
                            <ul className="space-y-1 text-gray-600">
                              <li>
                                Febre: {historico.consulta.triagem.febre ? `Sim (${historico.consulta.triagem.temperatura}°C)` : 'Não'}
                              </li>
                              <li>
                                Dor: {historico.consulta.triagem.temDor ? `Sim (${historico.consulta.triagem.localDor})` : 'Não'}
                              </li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-700 mb-1">Informações</h5>
                            <ul className="space-y-1 text-gray-600">
                              <li>
                                Gravidade: <span className={
                                  historico.consulta.triagem.gravidade === 'Crítico' 
                                    ? 'text-red-600 font-medium' 
                                    : historico.consulta.triagem.gravidade === 'Grave' 
                                      ? 'text-orange-600 font-medium' 
                                      : 'text-green-600 font-medium'
                                }>
                                  {historico.consulta.triagem.gravidade}
                                </span>
                              </li>
                              <li>
                                Peso: {historico.consulta.triagem.peso} kg
                              </li>
                              <li>
                                Idade: {historico.consulta.triagem.idade} anos
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-500 text-right">
                      Histórico registrado em {formatarData(historico.criadoEm)}
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

export default AdminHistorico;