import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FileWarning, Calendar, ClipboardList, ChevronRight, UserCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/Card';
import Button from '../../components/Button';

const API_URL = 'http://localhost:3001/api';

const AdminHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    triagensTotal: 0,
    triagensPendentes: 0,
    consultasHoje: 0,
    consultasTotal: 0,
    historicoTotal: 0
  });
  const [triagensRecentes, setTriagensRecentes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        
        console.log('=== CARREGANDO DADOS DO PAINEL ADMIN ===');
        
        // Carregar triagens
        const triagemRes = await axios.get(`${API_URL}/admin/triagens`);
        const triagens = triagemRes.data;
        console.log('Triagens carregadas:', triagens.length);
        
        // Carregar consultas
        const consultasRes = await axios.get(`${API_URL}/admin/consultas`);
        const consultas = consultasRes.data;
        console.log('Consultas carregadas:', consultas.length);
        
        // Carregar históricos médicos - USANDO A NOVA ROTA ESPECÍFICA
        let historicoTotal = 0;
        try {
          console.log('Tentando carregar históricos via rota específica...');
          const historicosRes = await axios.get(`${API_URL}/admin/historicos`);
          historicoTotal = historicosRes.data.length;
          console.log('Históricos médicos carregados via rota específica:', historicoTotal);
        } catch (error) {
          console.log('Rota específica falhou, usando fallback...');
          // Fallback: contar via consultas que têm histórico
          const consultasComHistorico = consultas.filter(c => c.historicoMedico);
          historicoTotal = consultasComHistorico.length;
          console.log('Históricos médicos via fallback:', historicoTotal);
        }
        
        // Consultas de hoje
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const amanha = new Date(hoje);
        amanha.setDate(amanha.getDate() + 1);
        
        const consultasHoje = consultas.filter(c => {
          const dataConsulta = new Date(c.data);
          return dataConsulta >= hoje && dataConsulta < amanha;
        });
        console.log('Consultas hoje:', consultasHoje.length);
        
        // Triagens pendentes (sem consulta agendada)
        const triagensPendentes = triagens.filter(t => 
          !t.consultas || t.consultas.length === 0
        );
        console.log('Triagens pendentes:', triagensPendentes.length);
        
        // Triagens recentes (últimas 5)
        const recentes = [...triagensPendentes]
          .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
          .slice(0, 5);
        
        setTriagensRecentes(recentes);
        
        setStats({
          triagensTotal: triagens.length,
          triagensPendentes: triagensPendentes.length,
          consultasHoje: consultasHoje.length,
          consultasTotal: consultas.length,
          historicoTotal: historicoTotal
        });
        
        console.log('Stats finais:', {
          triagensTotal: triagens.length,
          triagensPendentes: triagensPendentes.length,
          consultasHoje: consultasHoje.length,
          consultasTotal: consultas.length,
          historicoTotal: historicoTotal
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do painel:', error);
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  // Formatar data
  const formatarData = (dataString) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
        <p className="mt-1 text-gray-600">
          Bem-vindo(a), {user?.nome || 'Administrador'}! Gerencie triagens, consultas e históricos médicos.
        </p>
      </div>
      
      {/* Dashboard de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
              <FileWarning size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.triagensPendentes}</h3>
            <p className="text-sm text-gray-600">Triagens pendentes</p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-4">
              <Calendar size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.consultasHoje}</h3>
            <p className="text-sm text-gray-600">Consultas hoje</p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600 mb-4">
              <Calendar size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.consultasTotal}</h3>
            <p className="text-sm text-gray-600">Total de consultas</p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 mb-4">
              <ClipboardList size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.historicoTotal}</h3>
            <p className="text-sm text-gray-600">Históricos médicos</p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
              <FileWarning size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.triagensTotal}</h3>
            <p className="text-sm text-gray-600">Total de triagens</p>
          </div>
        </Card>
      </div>
      
      {/* Triagens pendentes recentes */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Triagens pendentes recentes</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/admin/triagens')}
          >
            Ver todas
          </Button>
        </div>
        
        {triagensRecentes.length === 0 ? (
          <Card>
            <p className="text-center text-gray-600 py-6">Não há triagens pendentes no momento</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {triagensRecentes.map((triagem) => (
              <Card 
                key={triagem.id} 
                className={`border-l-4 transition-all hover:shadow-md cursor-pointer ${
                  triagem.gravidade === 'Crítico' 
                    ? 'border-red-500' 
                    : triagem.gravidade === 'Grave' 
                      ? 'border-orange-500' 
                      : 'border-green-500'
                }`}
                onClick={() => navigate(`/admin/triagens?id=${triagem.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
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
                        {formatarData(triagem.criadoEm)}
                      </span>
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <UserCircle className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="font-medium">{triagem.usuario.nome}</span>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      {triagem.diabetico && (
                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                          Diabético
                        </span>
                      )}
                      {triagem.hipertenso && (
                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                          Hipertenso
                        </span>
                      )}
                      {triagem.obeso && (
                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                          Obeso
                        </span>
                      )}
                      {triagem.febre && (
                        <span className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded">
                          Febre: {triagem.temperatura}°C
                        </span>
                      )}
                      {triagem.temDor && (
                        <span className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded">
                          Dor: {triagem.localDor}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button
                  onClick={() => navigate('/admin/triagens')} 
                  className="text-sm">
                    
                    Agendar consulta
                  </Button>
                </div>
              </Card>
            ))}
            
            {triagensRecentes.length > 0 && (
              <Button 
                variant="outline" 
                fullWidth 
                className="mt-2"
                onClick={() => navigate('/admin/triagens')}
              >
                <div className="flex items-center justify-center">
                  <span>Ver todas as triagens pendentes</span>
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Links rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/admin/triagens" className="block p-4">
          <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <FileWarning size={24} />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Gerenciar Triagens</h3>
          <p className="mt-1 text-sm text-gray-500 text-center">
          Visualize e agende consultas para triagens pendentes
          </p>
            </div>
            </Link>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/admin/consultas" className="flex flex-col items-center p-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Calendar size={24} />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Gerenciar Consultas</h3>
            <p className="mt-1 text-sm text-gray-500 text-center">
              Acompanhe consultas agendadas e registre históricos
            </p>
          </Link>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer"> 
          <Link to="/admin/historico" className="flex flex-col items-center p-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <ClipboardList size={24} />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Históricos Médicos</h3>
            <p className="mt-1 text-sm text-gray-500 text-center">
              Visualize e gerencie históricos médicos dos pacientes
            </p>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;