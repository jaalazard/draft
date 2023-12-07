import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'; // Importez RouterProvider
import router from './router'; // Assurez-vous que le chemin d'importation est correct
import App from './App';
import './main.css';
import { AuthProvider } from '../../server/contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}> {/* Utilisez RouterProvider ici */}
      <App />
    </RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
);
