import { Link } from "react-router-dom";

export default function Card({ nombre,valorP,valorG,catId}) {
    
 
    return (
        <div className="w-80 h-96 p-4 bg-Neutral-1/80 backdrop-blur-xl rounded-3xl shadow-xl border border-Neutral-2/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-4">
            <h2 className="text-2xl font-black text-gray-900 leading-tight">{nombre}</h2>

            <div className="space-y-3">
                <div className="p-4 bg-Neutral/60 backdrop-blur-sm rounded-2xl border border-Neutral-2/30">
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">Presupuesto</p>
                    <p className="text-2xl font-black text-gray-900">${valorP}</p>
                </div>

                <div className="p-4 bg-Verde/5 backdrop-blur-sm rounded-2xl border border-Verde/20">
                    <p className="text-sm text-Verde font-semibold uppercase tracking-wide">Gastado</p>
                    <p className="text-2xl font-black text-gray-900">${valorG.toLocaleString()}</p>
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <Link to='/newGasto'>
                    <button className="flex-1 h-10 px-4 text-sm font-semibold text-white bg-Verde hover:bg-Verde/90 active:scale-95 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-Verde/50">
                        Agregar
                    </button>
                </Link>
                <Link to='/listaGastos' state={{ categoriaId: catId }}>
                    <button className="flex-1 h-10 px-4 text-sm font-semibold text-gray-700 bg-Neutral hover:bg-Neutral/80 active:scale-95 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-Neutral-2/50">
                        Ver
                    </button>
               </Link>
            </div>
        </div>

    )
}