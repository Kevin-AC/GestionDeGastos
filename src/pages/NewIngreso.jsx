import { useState } from "react";
import { useContext } from "react";
import { toast } from 'sonner'
import { GastosContext } from "../contexts/GastosProvider";
import { AuthContext } from "../contexts/AuthPrivider";
import { usePost } from "../hook/useData";
import Nav from "../components/Nav";
export default function NewIngreso() {
    const { user } = useContext(AuthContext);

    const context = useContext(GastosContext)
    const { refetchGastos } = context || {};

    const userID = user?.id || user?.idUsuario || 1; //almacenar id de usuario del context

    const [formData, setFormData] = useState({
        idUsuario: userID,
        categoria_id: 1,
        descripcion: '',
        monto: '',
        fecha: new Date().toISOString().split('T')[0]
    });

    const postData = usePost();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev, [name]: name === 'monto' ? parseFloat(value) || '' : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('📤 Datos enviados:', formData);

        try{
            
            await postData('TransaccionServlet',{
                accion:'insertar',
                ...formData
            })
            console.log('Ingreso Guardado');
            refetchGastos();
            toast.success('Ingreso Registrado', {
                description: `Fecha: ${formData.fecha}`,
            })
            setFormData({ //limpiar registro
                idUsuario: 1,
                categoria_id: 1,
                descripcion: '',
                monto: '',
                fecha: new Date().toISOString().split('T')[0]
            })
        }catch(error){
            toast.error('Error: ' + error.message);
        }

    }


    return (
        <main className="p-4 lg:h-screen lg:overflow-hidden">
           
            <Nav />
            <div className="grid place-content-center h-full">
                <section className="w-full max-w-md p-8 bg-Neutral-1/80 rounded-3xl shadow-2xl border border-Neutral-2/50">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Agregar Ingreso</h2>
                        <div className="w-20 h-1 bg-Verde mx-auto rounded-full shadow-md"></div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Nombre</label>
                            <div className="relative">
                                <input
                                    className="w-full h-14 pl-2 pr-4 bg-Neutral/70 border-2 border-Neutral-2/50 rounded-2xl text-2xl font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    type="text"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    placeholder="Describa el monto"
                                    onChange={handleChange}
                                    required

                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Monto</label>
                            <div className="relative">

                                <input
                                    className="w-full h-14 pl-2 pr-4 bg-Neutral/70 border-2 border-Neutral-2/50 rounded-2xl text-2xl font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    type="number"
                                    name="monto"
                                    value={formData.monto}
                                    placeholder="$ 2.200.000"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                                Fecha
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full h-14 pl-12 pr-4 bg-Neutral/70 border-2 border-Neutral-2/50 rounded-2xl text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-lg hover:shadow-xl appearance-none cursor-pointer"
                                    type="date"
                                    name="fecha"
                                    value={formData.fecha}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="w-full h-14 bg-Verde hover:bg-Verde/90 active:scale-95 text-white font-bold text-lg uppercase tracking-wide rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-200 border-2 border-Verde/50"
                        >
                            Guardar
                        </button>
                    </form>
                </section>
            </div>
        </main>


    )
}