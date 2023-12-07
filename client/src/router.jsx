import { createBrowserRouter } from 'react-router-dom';
import Login from '../src/Pages/Login'
import App from './App';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    // Ajoutez d'autres routes ici si nécessaire
]);

export default router;
