export default function Login() {
    return (
        <div className="w-125 h-auto py-6 px-10 flex flex-col items-center gap-4 bg-Neutral-1/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-Neutral-2/50">
            <h2 className="text-4xl font-black text-gray-900">Login</h2>
            <div className="w-full flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Nombre</label>
                    <input
                        className="w-full h-12 px-4 bg-Neutral/70  border border-Neutral-2/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-sm hover:shadow-md"
                        type="text"
                        placeholder="Ingresa tu nombre"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Contraseña</label>
                    <input
                        className="w-full h-12 px-4 bg-Neutral/70 border border-Neutral-2/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-sm hover:shadow-md"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                    />
                </div>
                
                
            </div>
            <button className="w-full h-12 bg-Verde hover:bg-Verde/90 active:scale-95 text-white font-bold text-sm uppercase tracking-wide rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 border border-Verde/50">
                Iniciar Sesión
            </button>
        </div>
    )
}