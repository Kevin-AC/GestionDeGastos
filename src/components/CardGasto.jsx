import { Link } from "react-router-dom";

export default function CardGasto({ gasto,nombre, fecha, valor, idGasto, onDelete }){
    //console.log('CardGasto gasto:', gasto);
    return(
        <article className="group bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-Neutral-2/30 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">{nombre}</h4>
                    <p className="text-sm text-gray-600 mt-1">{fecha}</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-black text-red-600">{valor.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all ml-4">
                    <Link to={'/newGasto'} state={{ gastoParaEditar: gasto ,modo:'actualizar'}}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl">
                        ✏️
                    </Link>
                    <button 
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                        onClick={() => onDelete(idGasto)}
                        >🗑️</button>
                </div>
            </div>
        </article>
    )
}