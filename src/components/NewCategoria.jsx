import { toast } from 'sonner'
import { useState } from 'react';
import { usePost } from '../hook/useData';
export default function NewCategoria(){
    const [nombreCat, setNombreCat] = useState('');
    const postData = usePost();
    const agregarCategoria = async () => {
        try {
            await postData('CategoriaServlet', {
                nombre: nombreCat,
            });
            toast.success('¡Categoría agregada!');
            
            setNombreCat('');  // Limpiar input
            // Refetch categorías (automático si usas useEffect)
        } catch {
            toast.error('Error al agregar');
        }
    };
    console.log(nombreCat)
    return (
        <div className="w-80 h-auto p-4 bg-Neutral-1/80 backdrop-blur-xl rounded-3xl shadow-xl border border-Neutral-2/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-4">
            <h3 className="text-2xl font-black text-gray-900 leading-tight">+ Nueva Categoría</h3>
            <div className="flex gap-2 mb-3">
                <input
                    placeholder="ej: Supermercado"
                    value={nombreCat}
                    onChange={e => setNombreCat(e.target.value)}
                    className="flex-1 p-3 bg-Verde/5 backdrop-blur-sm  border border-Verde/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-Verde"
                />
            </div>
            <button
                onClick={agregarCategoria}
                disabled={!nombreCat}
                className="w-full h-12 px-4 text-sm font-semibold text-white bg-Verde hover:bg-Verde/90 active:scale-95 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-Verde/50"
            >
                Agregar
            </button>
        </div>
    );
}
