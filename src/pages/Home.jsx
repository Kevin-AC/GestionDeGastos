import CardCategoria from '../components/CardCategoria'
import { useData } from '../hook/useData';
import { calcularGastoPorCategoria } from '../logic/calcularGastoPorCategoria';
export default function Main(){
    const data = useData();
  
    const calcularTotalGastos=(data)=>{//calcular el total de los gastos 
      let total=0;
      for(let i=1;i<data.length;i++){
        if (data[i]&&data[i].gastos){
          const gastosPorCategoria=calcularGastoPorCategoria(data[i].gastos);
          //console.log(gastosPorCategoria)
          total+=gastosPorCategoria
        }
      }
      
      return total
    }

    if(!data)return
    return(
        <section className="flex">
                <div className="w-1/3 h-screen">
                  <section className="w-3/4 h-full px-6 py-12 bg-Neutral-1/80 backdrop-blur-xl border-r border-Neutral-2/50 shadow-lg bg-linear-to-br">
                    <h1 className="text-4xl font-black text-gray-800 leading-tight mb-12">
                      {data[0].nombre}
                    </h1>
        
                    <div className="space-y-1 mb-8 p-6 bg-Verde/10 backdrop-blur-md rounded-2xl border  border-Verde/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Total</h2>
                      <p className="text-3xl font-black text-gray-900">${data[0].saldoTotal.toLocaleString()}</p>
                    </div>
        
                    <div className="space-y-1 p-6  bg-Neutral/70 backdrop-blur-md rounded-2xl border border-Neutral-2/50  shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Total Gastos</h2>
              <p className="text-3xl font-black text-gray-900">${calcularTotalGastos(data).toLocaleString()}</p>
                    </div>
                  </section>
        
        
        
        
                </div>
        
                <div className="py-10 max-w-2/3 flex flex-wrap gap-5  ">
                  {data.slice(1).map((categoria)=>(//renderizar dinamicamente cada card desde el data
                    <CardCategoria
                      key={categoria.id}
                      catId={categoria.id}
                      nombre={categoria.nombre}
                      valorP={categoria.presupuesto.toLocaleString()}
                      valorG={calcularGastoPorCategoria(categoria.gastos).toLocaleString()}


                    />
                  ))}
                  
                </div>
        
              </section>
    )
}