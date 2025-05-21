import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


const ResetPassword = () => {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token'); // Obtém o token da URL

  

  return (
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Redefinir Senha</h1>
      {mensagem && <p className="text-green-500">{mensagem}</p>}
      {erro && <p className="text-red-500">{erro}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nova Senha:</label>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Confirmar Senha:</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Redefinir Senha
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;