
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx';
import NewGasto from './pages/NewGasto.jsx'
import ListaGastos from './pages/ListaGastos.jsx';
import RegistroUsuario from './pages/RegistroUsuario.jsx';
import {GastosProvider } from './contexts/GastosProvider.jsx';
import NewIngreso from './pages/NewIngreso.jsx';
import Estadistica from './pages/Estadistica.jsx';
import ListaIngresos from './pages/ListaIngresos.jsx';
import { AuthProvider, AuthContext } from './contexts/AuthPrivider.jsx';
import { useContext } from "react";
import { Toaster } from 'sonner'
import ListaGastosGeneral from './pages/ListaGastosGeneral.jsx';
// PrivateRoute como componente que consume AuthContext
// eslint-disable-next-line react-refresh/only-export-components
function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <AuthProvider>
      <Toaster position="top-center" richColors closeButton />
      <GastosProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute><App /></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path="/newGasto" element={<PrivateRoute><NewGasto /></PrivateRoute>} />
          <Route path="/listaGastos" element={<PrivateRoute><ListaGastos /></PrivateRoute>} />
          <Route path="/listaIngresos" element={<PrivateRoute><ListaIngresos /></PrivateRoute>} />
          <Route path='/listaGastosGeneral' element={<PrivateRoute><ListaGastosGeneral/></PrivateRoute>}/>
          <Route path="/newIngreso" element={<PrivateRoute><NewIngreso /></PrivateRoute>} />
          <Route path='/registro' element={<RegistroUsuario />} />
          <Route path="/estadistica" element={<PrivateRoute><Estadistica /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GastosProvider>
  </AuthProvider>
   
  </BrowserRouter>
  
)
