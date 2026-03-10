
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx';
import NewGasto from './pages/NewGasto.jsx'
import ListaGastos from './pages/ListaGastos.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/'element={<App/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/newGasto' element={<NewGasto />} />
      <Route path='/listaGastos' element={<ListaGastos />} />
    </Routes>
  </BrowserRouter>
  
)
