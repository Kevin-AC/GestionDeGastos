import { useContext } from 'react';
import { GastosContext } from '../contexts/GastosProvider';  // ✅ Context
import { useDelete } from '../hook/useData';
import CardIngreso from "../components/CardIngreso";  // ✅ Nuevo card
import Nav from "../components/Nav";

export default function ListaIngresos() {
    const context = useContext(GastosContext);
    const deleteIngreso = useDelete();
    const { ingresos, totalIngresos, refetchGastos } = context || {};

    if (!ingresos) return <div>Cargando...</div>;

    const handleDelete = async (idTransaccion) => {
        if (!confirm(`Eliminar "${ingresos.find(ingreso => ingreso.idTransaccion === idTransaccion)?.descripcion}"?`))
            return;

        try {
            await deleteIngreso('TransaccionServlet', idTransaccion, 1);
            await refetchGastos();  // ✅ Refetch ambos
        } catch (error) {
            alert('❌ Error: ' + error.message);
        }
    };

    return (
        <section className='min-h-screen'>
            <Nav />
            <div className="p-8 max-w-4xl mx-auto space-y-6">
                {/* Header Ingresos */}
                <div className="p-6 bg-linear-to-r from-Azul/10 to-Azul/20 backdrop-blur-sm rounded-3xl shadow-xl border border-Azul/30 hover:shadow-2xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-Azul/20 border-2 border-Azul/40 flex items-center justify-center">
                                <span className="text-xl font-bold text-Azul">💰</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900">Ingresos</h3>
                                <p className="text-sm text-gray-600">{ingresos.length} ingresos</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-Azul">${totalIngresos?.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="h-2 bg-Neutral-2/50 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-300 rounded-full" style={{ width: '100%' }} />
                    </div>
                </div>

                {/* Lista */}
                {ingresos.length === 0 ? (
                    <p className="text-center text-gray-500 py-12">No hay ingresos registrados</p>
                ) : (
                    ingresos.map((ingreso) => (
                        <CardIngreso
                            key={ingreso.idTransaccion}
                            ingreso={ingreso}
                            nombre={ingreso.descripcion}
                            fecha={ingreso.fecha}
                            valor={ingreso.monto}
                            idIngreso={ingreso.idTransaccion}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
