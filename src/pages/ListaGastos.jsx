import { toast } from 'sonner'
import { useGastosFiltrados } from '../hook/useGastosFiltrados'
import { useDelete } from '../hook/useData';
import CardGasto from "../components/CardGasto";
import Nav from "../components/Nav";

export default function ListaGastos(){
    const {
        gastosOrdenados,
        nombreCategoria,
        totalGastos,
        cantidadGastos,
        loading,
        ordenado,
        refetchGastos,
        setOrdenado
    } = useGastosFiltrados();
  
    const deleteGasto = useDelete();


    if (loading) {
        return (
            <section className='w-auto h-screen'>
                <Nav />
                <div className="p-8 max-w-4xl mx-auto text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-500">Cargando gastos...</p>
                </div>
            </section>
        );
    }

    const handleDelete = async (idTransaccion) => {
        const gasto = gastosOrdenados.find(g => g.idTransaccion === idTransaccion);

        toast.warning(`¿Eliminar "${gasto?.descripcion}"?`, {
            duration: Infinity,
            action: {
                label: "Eliminar",
                onClick: async () => {
                    try {
                        await deleteGasto("TransaccionServlet", idTransaccion, 1);
                        toast.success("Gasto eliminado");
                        refetchGastos()
                    } catch (error) {
                        toast.error("Error al eliminar",error);
                    }
                },
            },
        });
    };

    
    
    return(
        <section className='w-auto  h-screen'>
            
            <Nav/>
            <div className="p-8 max-w-4xl mx-auto space-y-6">
                <div className="p-6 bg-linear-to-r from-gray-50 to-Neutral-1/50 backdrop-blur-sm rounded-3xl shadow-xl border border-Neutral-2/30 hover:shadow-2xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                        
                        <div className="flex lg:flex-row flex-col items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-Verde/10 border-2 border-Verde/30 flex items-center justify-center">
                                <span className="text-xl font-bold text-Verde">{nombreCategoria.slice(0,1)}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900">{nombreCategoria}</h3>
                                <p className="text-sm text-gray-600">{cantidadGastos} gastos</p>
                            </div>
                        </div>
                        {/**filtro para ordenar */}
                        <div className='flex lg:flex-row flex-col gap-4'>
                            <div className="flex items-center gap-2">
                            
                                <select
                                    value={ordenado}
                                    onChange={(e) => setOrdenado(e.target.value)}
                                    className="px-3 py-1.5 text-sm border border-Neutral-2/50 rounded-lg outline-none focus:ring-2 focus:ring-Verde focus:border-transparent"
                                >
                                    <option value="monto-desc">Monto (mayor a menor)</option>
                                    <option value="fecha-desc">Fecha (más reciente)</option>
                                    <option value="fecha-asc">Fecha (más antigua)</option>
                                    <option value="monto-asc">Monto (menor a mayor)</option>
                                </select>
                            </div>

                            <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900">${totalGastos.toLocaleString()}</p>
                                {/* <p className="text-sm text-gray-500">3.0% del presupuesto</p> */}
                            </div>
                        </div>
                    </div>
                    <div className="h-2 bg-Neutral-2/50 rounded-full overflow-hidden">
                        <div className="h-full bg-Verde rounded-full" style={{ width: '100%' }} />
                    </div>
                </div>
                {gastosOrdenados.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No hay gastos en esta categoría</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {gastosOrdenados.map((gasto) => (
                            <CardGasto
                                key={gasto.idTransaccion}
                                gasto={gasto}
                                nombre={gasto.descripcion}
                                fecha={gasto.fecha}
                                valor={gasto.monto}
                                idGasto={gasto.idTransaccion}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}     

            </div>

        </section>
    )
}