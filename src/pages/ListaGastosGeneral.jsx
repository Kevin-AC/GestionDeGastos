import { useContext } from 'react';
import { GastosContext } from '../contexts/GastosProvider';
import { useDelete } from '../hook/useData';
import { toast } from 'sonner'
import Nav from "../components/Nav";
import CardGasto from '../components/CardGasto';
import { calcularTotalGastos } from "../logic/calcularGastoPorCategoria"

export default function ListaGastosGeneral() {
    const deleteGasto = useDelete();
    const context = useContext(GastosContext);
   
    const { categoriasConGastos, refetchGastos } = context || {};
    
    const todosLosGastos=categoriasConGastos.flatMap(categoria =>categoria.gastos.map(gasto=>({
        ...gasto,categoria:categoria.nombre
    })))
    if (!categoriasConGastos) return <div>Cargando...</div>;
    const total = calcularTotalGastos(todosLosGastos)

    const handleDelete = async (idTransaccion) => {
        const gasto = todosLosGastos.find(
            (gasto) => gasto.idTransaccion === idTransaccion
        );

        toast.warning(`¿Eliminar "${gasto?.descripcion}"?`, {
            duration: Infinity,
            action: {
                label: "Eliminar",
                onClick: async () => {
                    try {
                        await deleteGasto("TransaccionServlet", idTransaccion, 1);
                        toast.success("Registro eliminado", {
                            description: `Gasto: "${gasto.descripcion}"`,
                        });
                        await refetchGastos();
                    } catch (error) {
                        toast.error("Error al eliminar", {
                            description: error.message,
                        });
                    }
                },
            },
        });
    }
  

    return (
        <section className='min-h-screen'>
            <Nav />
            <div className="p-8 max-w-4xl mx-auto space-y-6">
                <div className="p-6 bg-linear-to-r from-gray-50 to-Neutral-1/50 backdrop-blur-sm rounded-3xl shadow-xl border border-Neutral-2/30 hover:shadow-2xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-Verde/10 border-2 border-Verde/30 flex items-center justify-center">
                                <span className="text-xl font-bold text-Verde"><ion-icon size='large' name="wallet-outline"></ion-icon></span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900">Gastos</h3>
                                <p className="text-sm text-gray-600">{todosLosGastos.length} Gastos</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-Azul">${total.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="h-2 bg-Neutral-2/50 rounded-full overflow-hidden">
                        <div className="h-full bg-Verde rounded-full" style={{ width: '100%' }} />
                    </div>
                </div>
                {todosLosGastos.map(gasto=>(
                    <CardGasto
                        key={gasto.idTransaccion}
                        gasto={gasto}
                        nombre={gasto.descripcion}
                        valor={gasto.monto}
                        fecha={gasto.fecha}
                        idGasto={gasto.idTransaccion}
                        onDelete={handleDelete}
                    
                    />
                ))}
                
               
            </div>
        </section>
    );
}
