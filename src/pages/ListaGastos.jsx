import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { GastosContext } from '../contexts/GastosProvider';
import { useDelete } from '../hook/useData';

import CardGasto from "../components/CardGasto";
import Nav from "../components/Nav";

export default function ListaGastos(){
    const context = useContext(GastosContext);  // Verboso OK
    const deleteGasto = useDelete();
    const location = useLocation();
    const { categoriasConGastos,refetchGastos } = context || {};

    if (!categoriasConGastos) return

    const categoriaId = location.state?.categoriaId; //recibir el ID de la categoria 

    const categoriaSeleccionada = categoriasConGastos?.find(categoria => categoria.id === categoriaId);
    console.log(categoriaSeleccionada)// json de categoria seleccionada
    const gastosCategoria=categoriaSeleccionada?.gastos || [];
    const nombreCategoria=categoriaSeleccionada?.nombre 

    const handleDelete = async(idTransaccion)=>{
       // console.log("hola")
        if(!confirm(`Eliminar "${gastosCategoria.find(gasto=>gasto.idTransaccion===idTransaccion)?.descripcion}"?`)) return;
        try {
            await deleteGasto('TransaccionServlet', idTransaccion,1);
            await refetchGastos();;
        } catch (error) {
            alert('❌ Error: ' + error.message);
        }
        //console.log('test', idTransaccion)
    }


    return(
        <section>
            <Nav/>
            <div className="p-8 max-w-4xl mx-auto space-y-6">
                <div className="p-6 bg-linear-to-r from-gray-50 to-Neutral-1/50 backdrop-blur-sm rounded-3xl shadow-xl border border-Neutral-2/30 hover:shadow-2xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-Verde/10 border-2 border-Verde/30 flex items-center justify-center">
                                <span className="text-xl font-bold text-Verde">{nombreCategoria.slice(0,1)}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900">{nombreCategoria}</h3>
                                <p className="text-sm text-gray-600">3 gastos</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">${''}</p>
                            <p className="text-sm text-gray-500">3.0% del presupuesto</p>
                        </div>
                    </div>
                    <div className="h-2 bg-Neutral-2/50 rounded-full overflow-hidden">
                        <div className="h-full bg-Verde rounded-full" style={{ width: '3%' }} />
                    </div>
                </div>
                { gastosCategoria.length === 0?(
                    <p className="text-center text-gray-500 py-12">No hay gastos en esta categoría</p>
                ):
                    (
                        gastosCategoria.map((gastos) =>
                            <CardGasto
                                key={gastos.idTransaccion}
                                gasto={gastos}
                                nombre={gastos.descripcion}
                                fecha={gastos.fecha}
                                valor={gastos.monto}
                                idGasto={gastos.idTransaccion}
                                onDelete={handleDelete}
                                
                            />
                        )
                    ) 
                }           

            </div>

        </section>
    )
}