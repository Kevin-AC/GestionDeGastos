
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <GastosProvider>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/newGasto' element={<NewGasto />} />
        <Route path='/listaGastos' element={<ListaGastos />} />
        <Route path='/listaIngresos' element={<ListaIngresos />} />
        <Route path='/registro' element={<RegistroUsuario/>}/>
        <Route path='/newIngreso' element={<NewIngreso/>}/>
        <Route path='/estadistica' element={<Estadistica/>}/>
      </Routes>
    </GastosProvider>
  </BrowserRouter>
  
)
