import Nav from "../components/Nav";

export default function NewGasto(){
    return(
        <>
        <Nav/>
            <main className="grid place-content-center h-screen">
                <section className="w-full max-w-md p-8 bg-Neutral-1/80 rounded-3xl shadow-2xl border border-Neutral-2/50">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Agregar Nuevo Gasto</h2>
                        <div className="w-20 h-1 bg-Verde mx-auto rounded-full shadow-md"></div>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Monto</label>
                            <div className="relative">

                                <input
                                    className="w-full h-14 pl-2 pr-4 bg-Neutral/70 border-2 border-Neutral-2/50 rounded-2xl text-2xl font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    type="number"
                                    placeholder="$ 2.200"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                                Categoría
                            </label>
                            <select className="w-full h-14 px-2 bg-Neutral/70 border-2 border-Neutral-2/50 rounded-2xl text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-lg hover:shadow-xl">
                                <option>Comida</option>
                                <option>Transporte</option>
                                <option>Hogar</option>
                                <option>Ocio</option>
                                <option>Servicios</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                                Fecha del Gasto
                                <span className="w-3 h-3 bg-Verde rounded-full shadow-sm"></span>
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full h-14 pl-12 pr-4 bg-Neutral/70 border-2 border-Neutral-2/50 rounded-2xl text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-lg hover:shadow-xl appearance-none cursor-pointer"
                                    type="date"
                                    defaultValue={new Date().toISOString().split('T')[0]} // Hoy por default
                                />
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="w-full h-14 bg-Verde hover:bg-Verde/90 active:scale-95 text-white font-bold text-lg uppercase tracking-wide rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-200 border-2 border-Verde/50"
                        >
                            Guardar Gasto
                        </button>
                    </form>
                </section>
            </main>
        </>
        
    )
}