import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, FileText, UserCircle, Search, X, ChevronUp, ChevronDown, User, Phone, MapPin } from 'lucide-react';
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
      setLoading(true);
      setError('');
      
      console.log('=== CARREGANDO HISTÓRICOS NO FRONTEND ===');
      
      // Usar a rota específica para históricos médicos
      const response = await axios.get(`${API_URL}/admin/historicos`);
      const historicosData = response.data;
      
      console.log('Resposta da API:', historicosData);
      console.log('Total de históricos recebidos:', historicosData.length);
      
      if (historicosData.length > 0) {
        console.log('Primeiro histórico:', historicosData[0]);
      }
      
      setHistoricos(historicosData);
      
    } catch (err) {
      console.error('Erro ao carregar históricos:', err);
      setError('Erro ao carregar históricos médicos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatarDataHora = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleHistorico = (id) => {
    setHistoricoExpandido(historicoExpandido === id ? null : id);
  };

  const historicosFiltrados = historicos.filter(historico => {
    if (!searchTerm.trim()) return true;
    
    const termoBusca = searchTerm.toLowerCase().trim();
    const searchFields = [
      historico.usuario?.nome,
      historico.consulta?.especialidade,
      historico.consulta?.medico,
      historico.diagnostico,
      historico.conclusao
    ];
    
    return searchFields.some(field => 
      field?.toLowerCase().includes(termoBusca)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Históricos Médicos</h1>
      <p className="text-gray-600 mb-6">
        Visualize e consulte todos os históricos médicos dos pacientes ({historicos.length} registros)
      </p>
      
      {error && <Alert type="error" message={error} className="mb-4" />}
      
      {/* Barra de busca */}
      
      
      {historicosFiltrados.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'Nenhum histórico encontrado' : 'Nenhum histórico médico registrado'}
            </h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Tente usar outros termos de busca'
                : 'Ainda não há históricos médicos registrados no sistema. Para criar um histórico, acesse uma consulta realizada e registre o diagnóstico.'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {historicosFiltrados.map((historico) => (
            <Card key={historico.id} className="border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
              <div className="cursor-pointer" onClick={() => toggleHistorico(historico.id)}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {/* Cabeçalho do histórico */}
                    <div className="flex items-center mb-3">
                      <UserCircle className="h-6 w-6 text-purple-600 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {historico.usuario?.nome || 'Nome não disponível'}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span>{historico.usuario?.email || 'Email não disponível'}</span>
                          {historico.usuario?.telefone && (
                            <>
                              <span className="mx-2">•</span>
                              <Phone className="h-4 w-4 mr-1" />
                              <span>{historico.usuario.telefone}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Informações da consulta */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">
                          Consulta: {formatarData(historico.consulta?.data)} às {historico.consulta?.hora || 'Hora não disponível'}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <User className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">
                          {historico.consulta?.especialidade || 'Especialidade não disponível'} - Dr(a). {historico.consulta?.medico || 'Médico não disponível'}
                        </span>
                      </div>
                      {historico.consulta?.local && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">{historico.consulta.local}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Preview do diagnóstico */}
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Diagnóstico:</h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {historico.diagnostico || 'Diagnóstico não disponível'}
                      </p>
                    </div>
                    
                    {/* Data de registro */}
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Registrado em: {formatarDataHora(historico.criadoEm)}</span>
                      {historico.admin?.nome && (
                        <span className="ml-4">por Dr(a). {historico.admin.nome}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Botão de expandir */}
                  <button 
                    className="text-gray-500 p-2 rounded-full hover:bg-gray-100 ml-4 transition-colors"
                    aria-label={historicoExpandido === historico.id ? "Recolher detalhes" : "Expandir detalhes"}
                  >
                    {historicoExpandido === historico.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                {/* Detalhes expandidos */}
                {historicoExpandido === historico.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200 animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Diagnóstico completo */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                          Diagnóstico Completo
                        </h4>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-gray-700 whitespace-pre-line">
                            {historico.diagnostico || 'Diagnóstico não disponível'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Conclusão e recomendações */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                          Conclusão e Recomendações
                        </h4>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-gray-700 whitespace-pre-line">
                            {historico.conclusao || 'Conclusão não disponível'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dados do paciente */}
                    {historico.usuario && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                          Dados do Paciente
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Nome:</span>
                              <span className="ml-2 text-gray-600">{historico.usuario.nome}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Email:</span>
                              <span className="ml-2 text-gray-600">{historico.usuario.email}</span>
                            </div>
                            {historico.usuario.telefone && (
                              <div>
                                <span className="font-medium text-gray-700">Telefone:</span>
                                <span className="ml-2 text-gray-600">{historico.usuario.telefone}</span>
                              </div>
                            )}
                            {historico.usuario.endereco && (
                              <div>
                                <span className="font-medium text-gray-700">Endereço:</span>
                                <span className="ml-2 text-gray-600">{historico.usuario.endereco}</span>
                              </div>
                            )}
                            {historico.usuario.dataNascimento && (
                              <div>
                                <span className="font-medium text-gray-700">Data de Nascimento:</span>
                                <span className="ml-2 text-gray-600">{formatarData(historico.usuario.dataNascimento)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Detalhes da triagem original */}
                    {historico.consulta?.triagem && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                          Detalhes da Triagem Original
                        </h4>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            {/* Condições pré-existentes */}
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2">Condições Pré-existentes</h5>
                              <ul className="space-y-1 text-gray-600">
                                <li className="flex items-center">
                                  <span className={`w-2 h-2 rounded-full mr-2 ${historico.consulta.triagem.diabetico ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                  Diabético: {historico.consulta.triagem.diabetico ? 'Sim' : 'Não'}
                                </li>
                                <li className="flex items-center">
                                  <span className={`w-2 h-2 rounded-full mr-2 ${historico.consulta.triagem.hipertenso ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                  Hipertenso: {historico.consulta.triagem.hipertenso ? 'Sim' : 'Não'}
                                </li>
                                <li className="flex items-center">
                                  <span className={`w-2 h-2 rounded-full mr-2 ${historico.consulta.triagem.obeso ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                  Obeso: {historico.consulta.triagem.obeso ? 'Sim' : 'Não'}
                                </li>
                              </ul>
                            </div>
                            
                            {/* Sintomas relatados */}
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2">Sintomas Relatados</h5>
                              <ul className="space-y-1 text-gray-600">
                                <li className="flex items-center">
                                  <span className={`w-2 h-2 rounded-full mr-2 ${historico.consulta.triagem.febre ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                  Febre: {historico.consulta.triagem.febre ? `Sim (${historico.consulta.triagem.temperatura}°C)` : 'Não'}
                                </li>
                                <li className="flex items-center">
                                  <span className={`w-2 h-2 rounded-full mr-2 ${historico.consulta.triagem.temDor ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                  Dor: {historico.consulta.triagem.temDor ? `Sim (${historico.consulta.triagem.localDor})` : 'Não'}
                                </li>
                              </ul>
                            </div>
                            
                            {/* Informações físicas */}
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2">Informações Físicas</h5>
                              <ul className="space-y-1 text-gray-600">
                                <li>
                                  <span className="font-medium">Gravidade:</span> 
                                  <span className={`ml-1 px-2 py-1 rounded text-xs font-medium ${
                                    historico.consulta.triagem.gravidade === 'Crítico' 
                                      ? 'bg-red-100 text-red-800' 
                                      : historico.consulta.triagem.gravidade === 'Grave' 
                                        ? 'bg-orange-100 text-orange-800' 
                                        : 'bg-green-100 text-green-800'
                                  }`}>
                                    {historico.consulta.triagem.gravidade}
                                  </span>
                                </li>
                                <li>
                                  <span className="font-medium">Peso:</span> {historico.consulta.triagem.peso} kg
                                </li>
                                <li>
                                  <span className="font-medium">Idade:</span> {historico.consulta.triagem.idade} anos
                                </li>
                                <li>
                                  <span className="font-medium">Pontuação:</span> {historico.consulta.triagem.pontuacao}
                                </li>
                                <li>
                                  <span className="font-medium">Data da triagem:</span> {formatarData(historico.consulta.triagem.criadoEm)}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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