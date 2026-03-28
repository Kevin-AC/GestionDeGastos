export default function FiltroGastos({ ordenado, setOrdenado }){
    return(
            <aside className="flex items-center gap-2">

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
            </aside>

    )
}