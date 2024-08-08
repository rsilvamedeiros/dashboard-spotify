// pages/login.tsx

import React from 'react';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    window.location.href = '/api/auth/login'; // Redireciona para o endpoint de login
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button
        onClick={handleLogin}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
