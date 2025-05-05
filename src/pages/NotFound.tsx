import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Página não encontrada</h2>
          <p className="text-gray-600 mt-2">
            A página que você está procurando não existe ou foi movida.
          </p>
          <div className="mt-6">
            <Link to="/">
              <Button>
                <Home className="h-5 w-5 mr-2" />
                Voltar ao início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;