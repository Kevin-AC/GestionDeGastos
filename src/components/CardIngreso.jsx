export default function CardIngreso({ nombre, fecha, valor, idIngreso, onDelete }) {
    return (
        <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-Azul to-Azul/80 rounded-xl flex items-center justify-center">
                        <span className="text-2xl text-Verde font-extrabold">$</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">{nombre}</h4>
                        <p className="text-sm text-gray-500">{new Date(fecha).toLocaleDateString('es-CO')}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-black text-Azul">${valor.toLocaleString()}</p>
                    <button
                        onClick={() => onDelete(idIngreso)}
                        className="mt-2 px-4 py-1 bg-Rojo/90 text-red-700 font-bold hover:text-red-500 hover:cursor-pointer text-sm rounded-lg hover:bg-Rojo transition-colors"
                    >
                        <ion-icon size="large" name="trash-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    );
}
