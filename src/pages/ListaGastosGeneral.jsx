import { useContext, useMemo, useState } from 'react';
import Nav from "../components/Nav";
import CardGasto from '../components/CardGasto';
import { calcularTotalGastos } from "../logic/calcularGastoPorCategoria"
import { useDeleteTransaccion } from '../hook/useDeleteTransaccion'
import { GastosContext } from '../contexts/GastosProvider';
import FiltroGastos from '../components/FiltroGastos';
export default function ListaGastosGeneral() {
    const { categoriasConGastos, refetchGastos } = useContext(GastosContext) || {};
    const { handleDelete } = useDeleteTransaccion(refetchGastos);
    const [ordenado, setOrdenado ] = useState('fecha-desc');

    const todosLosGastos = useMemo(() => {
        const lista = (categoriasConGastos ?? []).flatMap(categoria =>
            (categoria.gastos ?? []).map(gasto => ({ ...gasto, categoria: categoria.nombre }))
        ); return [...lista].sort((a, b) => {
            switch (ordenado) {
                case 'monto-desc': return b.monto - a.monto;
                case 'monto-asc': return a.monto - b.monto;
                case 'fecha-desc': return new Date(b.fecha) - new Date(a.fecha);
                case 'fecha-asc': return new Date(a.fecha) - new Date(b.fecha);
                default: return 0;
            }
        });
    }, [categoriasConGastos, ordenado]);

    const total = calcularTotalGastos(todosLosGastos)



    if (!categoriasConGastos || categoriasConGastos.length === 0) return <div>Cargando...</div>;



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
                        <div className='flex lg:flex-row flex-col gap-4'>
                            <FiltroGastos
                                ordenado={ordenado}
                                setOrdenado={setOrdenado}
                            />

                            <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900">${total.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-2 bg-Neutral-2/50 rounded-full overflow-hidden">
                        <div className="h-full bg-Verde rounded-full" style={{ width: '100%' }} />
                    </div>
                </div>
                {todosLosGastos.map(gasto => (
                    <CardGasto
                        key={gasto.idTransaccion}
                        gasto={gasto}
                        nombre={gasto.descripcion}
                        valor={gasto.monto}
                        fecha={gasto.fecha}
                        idGasto={gasto.idTransaccion}
                        onDelete={() => handleDelete(gasto.idTransaccion, todosLosGastos, gasto.descripcion)}

                    />
                ))}


            </div>
        </section>
    );
}
