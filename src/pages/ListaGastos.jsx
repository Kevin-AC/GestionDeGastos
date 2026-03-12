import CardGasto from "../components/CardGasto";
import Nav from "../components/Nav";
import { useData } from "../hook/useData";
import { useCategory } from "../contexts/CategoriasContexts";
export default function ListaGastos(){
    const { categoriaId } = useCategory();
    const data=useData();
   
    console.log(categoriaId)
    if(!data)return
    return(
        <section>
            <Nav/>
            <div className="p-8 max-w-4xl mx-auto space-y-6">

                {/* Categoría Comida */}
                <div className="p-6 bg-linear-to-r from-gray-50 to-Neutral-1/50 backdrop-blur-sm rounded-3xl shadow-xl border border-Neutral-2/30 hover:shadow-2xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-Verde/10 border-2 border-Verde/30 flex items-center justify-center">
                                <span className="text-xl font-bold text-Verde">{data?.[categoriaId].nombre.slice(0, 1)}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900">{data?.[categoriaId].nombre}</h3>
                                <p className="text-sm text-gray-600">3 gastos</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">$75.000</p>
                            <p className="text-sm text-gray-500">3.0% del presupuesto</p>
                        </div>
                    </div>
                    <div className="h-2 bg-Neutral-2/50 rounded-full overflow-hidden">
                        <div className="h-full bg-Verde rounded-full" style={{ width: '3%' }} />
                    </div>
                </div>
                {data?.[categoriaId]?.gastos?.map((gastos)=>
                    <CardGasto
                        key={gastos.id}
                        nombre={gastos.descripcion}
                        fecha={gastos.fecha}
                        valor={gastos.monto}
                    />
                )}            

            </div>

        </section>
    )
}