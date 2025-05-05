import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Alert from '../../components/Alert';

const API_URL = 'http://localhost:3001/api';

const UsuarioTriagem = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    diabetico: false,
    hipertenso: false,
    obeso: false,
    febre: false,
    temperatura: '',
    temDor: false,
    localDor: '',
    peso: '',
    idade: ''
  });
  
  // Resultado da triagem
  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validarFormulario = () => {
    if (step === 1) {
      return true;
    }
    
    if (step === 2) {
      if (formData.febre && (!formData.temperatura || formData.temperatura < 35 || formData.temperatura > 42)) {
        setError('Por favor, informe uma temperatura válida (entre 35°C e 42°C)');
        return false;
      }
      
      if (formData.temDor && !formData.localDor) {
        setError('Por favor, informe o local da dor');
        return false;
      }
      
      return true;
    }
    
    if (step === 3) {
      if (!formData.peso || formData.peso <= 0 || formData.peso > 300) {
        setError('Por favor, informe um peso válido (entre 1 e 300 kg)');
        return false;
      }
      
      if (!formData.idade || formData.idade <= 0 || formData.idade > 120) {
        setError('Por favor, informe uma idade válida (entre 1 e 120 anos)');
        return false;
      }
      
      return true;
    }
    
    return false;
  };

  const nextStep = () => {
    setError('');
    
    if (validarFormulario()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!validarFormulario()) {
      return;
    }
    
    try {
      setLoading(true);
      
      const triagem = {
        ...formData,
        temperatura: formData.febre ? parseFloat(formData.temperatura) : null,
        localDor: formData.temDor ? formData.localDor : null,
        peso: parseFloat(formData.peso),
        idade: parseInt(formData.idade)
      };
      
      const response = await axios.post(`${API_URL}/triagens`, triagem);
      
      setResultado(response.data.triagem);
      setSuccess('Triagem realizada com sucesso!');
      setStep(4);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.mensagem || 
        'Erro ao registrar triagem. Tente novamente mais tarde.'
      );
    } finally {
      setLoading(false);
    }
  };
  
  // Cor baseada na gravidade
  const getGravidadeColor = (gravidade) => {
    switch (gravidade) {
      case 'Crítico':
        return 'text-red-600';
      case 'Grave':
        return 'text-orange-600';
      case 'Leve':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  // Renderizar etapa 1 - Condições médicas
  const renderStep1 = () => (
    <>
      <h2 className="text-xl font-medium text-gray-900 mb-6">Condições médicas pré-existentes</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            id="diabetico"
            name="diabetico"
            type="checkbox"
            className="h-4 w-4 text-blue-600 rounded"
            checked={formData.diabetico}
            onChange={handleChange}
          />
          <label htmlFor="diabetico" className="ml-3 block text-gray-700">
            Sou diabético
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="hipertenso"
            name="hipertenso"
            type="checkbox"
            className="h-4 w-4 text-blue-600 rounded"
            checked={formData.hipertenso}
            onChange={handleChange}
          />
          <label htmlFor="hipertenso" className="ml-3 block text-gray-700">
            Sou hipertenso
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="obeso"
            name="obeso"
            type="checkbox"
            className="h-4 w-4 text-blue-600 rounded"
            checked={formData.obeso}
            onChange={handleChange}
          />
          <label htmlFor="obeso" className="ml-3 block text-gray-700">
            Sou obeso
          </label>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button onClick={nextStep}>Próximo</Button>
      </div>
    </>
  );

  // Renderizar etapa 2 - Sintomas
  const renderStep2 = () => (
    <>
      <h2 className="text-xl font-medium text-gray-900 mb-6">Sintomas atuais</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-2">
            <input
              id="febre"
              name="febre"
              type="checkbox"
              className="h-4 w-4 text-blue-600 rounded"
              checked={formData.febre}
              onChange={handleChange}
            />
            <label htmlFor="febre" className="ml-3 block text-gray-700">
              Estou com febre
            </label>
          </div>
          
          {formData.febre && (
            <div className="ml-7 mt-2">
              <Input
                id="temperatura"
                name="temperatura"
                type="number"
                label="Temperatura (°C)"
                value={formData.temperatura}
                onChange={handleChange}
                placeholder="38.5"
                step="0.1"
                min="35"
                max="42"
              />
            </div>
          )}
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <input
              id="temDor"
              name="temDor"
              type="checkbox"
              className="h-4 w-4 text-blue-600 rounded"
              checked={formData.temDor}
              onChange={handleChange}
            />
            <label htmlFor="temDor" className="ml-3 block text-gray-700">
              Estou sentindo dor
            </label>
          </div>
          
          {formData.temDor && (
            <div className="ml-7 mt-2">
              <Input
                id="localDor"
                name="localDor"
                type="text"
                label="Local da dor"
                value={formData.localDor}
                onChange={handleChange}
                placeholder="Ex: cabeça, abdômen, costas"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={prevStep}>Voltar</Button>
        <Button onClick={nextStep}>Próximo</Button>
      </div>
    </>
  );

  // Renderizar etapa 3 - Dados físicos
  const renderStep3 = () => (
    <>
      <h2 className="text-xl font-medium text-gray-900 mb-6">Informações físicas</h2>
      
      <div className="space-y-4">
        <Input
          id="peso"
          name="peso"
          type="number"
          label="Peso (kg)"
          value={formData.peso}
          onChange={handleChange}
          placeholder="75"
          required
          min="1"
          max="300"
          step="0.1"
        />
        
        <Input
          id="idade"
          name="idade"
          type="number"
          label="Idade (anos)"
          value={formData.idade}
          onChange={handleChange}
          placeholder="35"
          required
          min="1"
          max="120"
        />
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={prevStep}>Voltar</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Enviando...' : 'Finalizar Triagem'}
        </Button>
      </div>
    </>
  );

  // Renderizar etapa 4 - Resultado
  const renderStep4 = () => (
    <>
      <h2 className="text-xl font-medium text-gray-900 mb-4">Resultado da Triagem</h2>
      
      {success && (
        <Alert type="success" message={success} className="mb-6" />
      )}
      
      {resultado && (
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-gray-700">Gravidade:</span>
            <span className={`font-bold text-lg ${getGravidadeColor(resultado.gravidade)}`}>
              {resultado.gravidade}
            </span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-4">
            <span className="text-gray-700">Pontuação:</span>
            <span className="font-medium">{resultado.pontuacao.toFixed(1)}</span>
          </div>
          
          <div className="pt-2">
            <p className="text-gray-700 mb-4">
              {resultado.gravidade === 'Crítico' && 'Sua condição requer atenção médica urgente. Um profissional irá analisar sua triagem e entrar em contato o mais breve possível.'}
              {resultado.gravidade === 'Grave' && 'Sua condição requer atenção médica. Um profissional irá analisar sua triagem e agendar uma consulta em breve.'}
              {resultado.gravidade === 'Leve' && 'Sua condição não parece grave, mas um profissional irá analisar sua triagem e entrar em contato se necessário.'}
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 text-sm">
                Sua triagem foi registrada com sucesso. Em caso de piora dos sintomas, procure um serviço de emergência ou ligue para 192 (SAMU).
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4 pt-4">
            <Button onClick={() => navigate('/')} variant="outline" fullWidth>
              Voltar para Início
            </Button>
            <Button onClick={() => navigate('/consultas')} variant="primary" fullWidth>
              Ver Consultas
            </Button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nova Triagem Médica</h1>
      
      {/* Progresso */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>Etapa {step} de {step < 4 ? '3' : '4'}</div>
          {step < 4 && (
            <div className="text-sm text-gray-500">
              {step === 1 && 'Condições médicas'}
              {step === 2 && 'Sintomas'}
              {step === 3 && 'Informações físicas'}
            </div>
          )}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / (step < 4 ? 3 : 4)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {error && <Alert type="error" message={error} className="mb-6" />}
      
      <Card>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </Card>
    </div>
  );
};

export default UsuarioTriagem;