import { useContext,useState,useMemo } from 'react';
import { GastosContext } from '../contexts/GastosProvider';  
import CardIngreso from "../components/CardIngreso"; 
import Nav from "../components/Nav";
import { useDeleteTransaccion } from '../hook/useDeleteTransaccion';
import FiltroGastos from '../components/FiltroGastos';
export default function ListaIngresos() {
    const context = useContext(GastosContext);
    const { ingresos,totalIngresos, refetchGastos } = context || {};
    const {handleDelete}=useDeleteTransaccion(refetchGastos);
    const [ordenado, setOrdenado] = useState('fecha-desc');

    const ingresosFiltrados = useMemo(() => {
        let resultado = [...ingresos];

        resultado.sort((a, b) => {
            switch (ordenado) {
                case 'monto-desc':
                    return Number(b.monto) - Number(a.monto);
                case 'monto-asc':
                    return Number(a.monto) - Number(b.monto);
                case 'fecha-desc':
                    return  b.fecha.localeCompare(a.fecha);
                case 'fecha-asc':
                    return  a.fecha.localeCompare(b.fecha);
                default:
                    return 0;
            }
        });

        return resultado;
    }, [ingresos, ordenado]);
    if (!ingresos) return <div>Cargando...</div>;
    return (
        <section className='min-h-screen'>
            
            <Nav />
            <div className="p-8 max-w-4xl mx-auto space-y-6 text">
                {/* Header Ingresos */}
                <div className="p-6 bg-linear-to-r from-amber-300/10 to-amber-300/20 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-800/30 hover:shadow-2xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-amber-300/20 border-2 border-amber-800/40 flex items-center justify-center">
                                <span className="text-xl font-bold text-Azul"><ion-icon size="large" name="cash-outline"></ion-icon></span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900">Ingresos</h3>
                                <p className="text-sm text-gray-600">{ingresos.length} ingresos</p>
                            </div>
                        </div>
                        <div className="text-right flex gap-4">
                            <FiltroGastos
                                ordenado={ordenado}
                                setOrdenado={setOrdenado}
                            />
                            <p className="text-2xl font-bold text-Azul">${totalIngresos?.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="h-2 bg-Neutral-2/50 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-300 rounded-full" style={{ width: '100%' }} />
                    </div>
                </div>
               

                {/* Lista */}
                {ingresosFiltrados.length === 0 ? (
                    <p className="text-center text-gray-500 py-12">No hay ingresos registrados</p>
                ) : (
                        ingresosFiltrados.map((ingreso) => (
                        <CardIngreso
                            key={ingreso.idTransaccion}
                            ingreso={ingreso}
                            nombre={ingreso.descripcion}
                            fecha={ingreso.fecha}
                            valor={ingreso.monto}
                            idIngreso={ingreso.idTransaccion}
                            onDelete={() => handleDelete(ingreso.idTransaccion, ingresos,'Ingreso')}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
