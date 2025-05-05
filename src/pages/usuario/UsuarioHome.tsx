import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box as HospitalBox, Calendar, ClipboardList, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/Card';
import Button from '../../components/Button';

const API_URL = 'http://localhost:3001/api';

const UsuarioHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumo, setResumo] = useState({
    triagens: 0,
    consultas: 0,
    historicoMedico: 0,
    proximaConsulta: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarResumo = async () => {
      try {
        // Carregar triagens
        const triagemRes = await axios.get(`${API_URL}/usuario/triagens`);
        
        // Carregar consultas
        const consultasRes = await axios.get(`${API_URL}/usuario/consultas`);
        
        // Carregar histórico médico
        const historicoRes = await axios.get(`${API_URL}/usuario/historico-medico`);
        
        // Encontrar a próxima consulta
        const hoje = new Date();
        const consultas = consultasRes.data;
        const proximasConsultas = consultas.filter(c => new Date(c.data) >= hoje)
          .sort((a, b) => new Date(a.data) - new Date(b.data));
        
        setResumo({
          triagens: triagemRes.data.length,
          consultas: consultasRes.data.length,
          historicoMedico: historicoRes.data.length,
          proximaConsulta: proximasConsultas.length > 0 ? proximasConsultas[0] : null,
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar resumo:', error);
        setLoading(false);
      }
    };

    carregarResumo();
  }, []);

  // Formatar data
  const formatarData = (dataString) => {
    if (!dataString) return '';
    
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
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
        <h1 className="text-2xl font-bold text-gray-900">Bem-vindo(a), {user?.nome || 'Paciente'}!</h1>
        <p className="mt-1 text-gray-600">Confira seu resumo de saúde e realize uma nova triagem quando necessário.</p>
      </div>
      
      {resumo.proximaConsulta && (
        <Card className="border-l-4 border-blue-500 animate-pulse">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Próxima Consulta</h3>
              <p className="mt-1 text-gray-600">
                <span className="font-medium">{formatarData(resumo.proximaConsulta.data)}</span> às <span className="font-medium">{resumo.proximaConsulta.hora}</span>
              </p>
              <p className="text-sm text-gray-500">
                {resumo.proximaConsulta.especialidade} com Dr(a). {resumo.proximaConsulta.medico}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Local: {resumo.proximaConsulta.local}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${resumo.proximaConsulta.confirmada ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {resumo.proximaConsulta.confirmada ? 'Confirmada' : 'Aguardando confirmação'}
              </span>
              <Button 
                variant="outline"
                className="mt-3"
                onClick={() => navigate('/consultas')}
              >
                Ver detalhes
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
  <Link to="/triagem" className="flex flex-col items-center no-underline">
    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
      <HospitalBox size={24} />
    </div>
    <h3 className="mt-4 text-lg font-medium text-gray-900">Nova Triagem</h3>
    <p className="mt-1 text-sm text-gray-500 text-center">
      Informe seus sintomas e obtenha uma avaliação inicial
    </p>
    <div className="mt-4 flex items-center text-blue-600">
      <span className="text-sm font-medium">Iniciar</span>
      <ChevronRight size={16} className="ml-1" />
    </div>
  </Link>
</Card>
        
        
             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <Link to="/consultas" className="flex flex-col items-center no-underline">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <Calendar size={24} />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Minhas Consultas</h3>
          <p className="mt-1 text-sm text-gray-500 text-center">
            Acompanhe e confirme suas consultas agendadas
          </p>
          <div className="mt-4 flex items-center text-green-600">
            <span className="text-sm font-medium">Ver {resumo.consultas} consulta(s)</span>
            <ChevronRight size={16} className="ml-1" />
          </div>
        </Link>
      </Card>
        
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <Link to="/historico" className="flex flex-col items-center no-underline">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <ClipboardList size={24} />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Histórico Médico</h3>
          <p className="mt-1 text-sm text-gray-500 text-center">
            Acesse seu histórico de atendimentos médicos
          </p>
          <div className="mt-4 flex items-center text-purple-600">
            <span className="text-sm font-medium">Ver {resumo.historicoMedico} registro(s)</span>
            <ChevronRight size={16} className="ml-1" />
          </div>
        </Link>
      </Card>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-800">Dica de Saúde</h3>
        <p className="mt-2 text-blue-700">
          Mantenha-se hidratado e pratique atividades físicas regularmente. Em caso de sintomas graves, procure atendimento médico imediatamente.
        </p>
      </div>
    </div>
  );
};

export default UsuarioHome;