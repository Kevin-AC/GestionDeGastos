
import CardCategoria from './components/CardCategoria.jsx'
import { useContext } from 'react';
import { GastosContext } from './contexts/GastosProvider';
import { AuthContext } from './contexts/AuthPrivider.jsx';
import { Link } from "react-router-dom";
import Nav from "./components/Nav.jsx";
function App() {
  const { user} = useContext(AuthContext);
  const context = useContext(GastosContext); 
  const { categoriasConGastos, totalGeneral,balance} = context || {};

  if (!categoriasConGastos)return
  return (
    <main className='h-screen overflow-hidden'>
      <Nav/>
      <section className="flex">
        <div className="w-1/3 h-screen">
          <section className="w-3/4 h-full px-6 py-12 bg-Neutral-1/80 backdrop-blur-xl border-r border-Neutral-2/50 shadow-lg bg-linear-to-br">
            <h1 className="text-4xl font-black text-gray-800 leading-tight mb-12">
              {`${user.nombre} ${user.apellido}`}
            </h1>

            <div className="space-y-1 mb-8 p-6 bg-Verde/10 backdrop-blur-md rounded-2xl border border-Verde/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Saldo Disponible
              </h2>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-black text-gray-900">
                  ${balance.toLocaleString()}
                </p>
                <Link to="/listaIngresos" className="ml-4">
                  <button className="px-4 py-1.5 text-sm font-semibold text-gray-700 bg-Verde/45 hover:bg-white active:scale-95 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-Neutral-2/50">
                    ver
                  </button>
                </Link>
              </div>
            </div>


            <div className="space-y-1 p-6  bg-Neutral/70 backdrop-blur-md rounded-2xl border border-Neutral-2/50  shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Total Gastos</h2>
              <p className="text-3xl font-black text-gray-900">${totalGeneral.toLocaleString()}</p>
            </div>
          </section>
        </div>

        <div className="mt-14 h-2/3 grid grid-cols-3 gap-10 ">
          {categoriasConGastos.map((categoria) => (//renderizar dinamicamente cada card desde el data
            <CardCategoria
              key={categoria.id}
              catId={categoria.id}
              nombre={categoria.nombre}
              valorP={categoria.presupuesto}
              valorG={categoria.total}


            />
          ))}

        </div>

      </section>
    </main>
    
  )
}

export default App
