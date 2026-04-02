import {toast } from 'sonner'
import { useContext} from "react";
import { GastosContext } from "../contexts/GastosProvider";
import { AuthContext } from "../contexts/AuthPrivider";
import { useState} from 'react';
import { useApi} from "../hook/useData";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";



export default function NewGasto(){
    const { user } = useContext(AuthContext);
    const {post} = useApi();

    const context = useContext(GastosContext); 
    const { refetchGastos } = context || {};


    const location = useLocation();

    const userID=user?.id || user?.idUsuario || 1; //almacenar id de usuario del context
    
    const gastoParaEditar = location.state?.gastoParaEditar;
    const modo = location.state?.modo || 'insertar';

    const getLocalDate = () => {
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        return today.toISOString().split('T')[0];
    };

    const datosIniciales = {
        idUsuario: userID,
        categoria_id: 1,
        descripcion: '',
        monto: '',
        fecha: getLocalDate()
    };
    //const  [formData,setFormData]=useState(datosIniciales)

    const [formData, setFormData] = useState(() => {
        if (gastoParaEditar) {
            return {
                idTransaccion: gastoParaEditar.idTransaccion,
                idUsuario: gastoParaEditar.idUsuario || userID,
                categoria_id: gastoParaEditar.categoria_id,
                descripcion: gastoParaEditar.descripcion || '',
                monto: gastoParaEditar.monto?.toString() || '',
                fecha: gastoParaEditar.fecha?.split('T')[0] || getLocalDate()
            };
        }
        return {
            idUsuario: userID,
            categoria_id: 1,
            descripcion: '',
            monto: '',
            fecha: getLocalDate()
        };
    });

    const handleChange=(e)=>{
        
        const {name,value}=e.target;
        setFormData(prev =>({
            ...prev,[name]:name === 'monto' ? Number(value):value
        }));
    }

    const handleSubmit= async (e)=>{//capturar datos del cada input 
        e.preventDefault();

        

        try{
            await post('TransaccionServlet',{...formData,accion:modo});
            await refetchGastos();//recargar informacion 
            if (modo ==='insertar'){
                toast.success('Gasto guardado correctamente');

            }else{
                toast.success('Gasto actualizado correctamente');
            }
            
            setFormData(datosIniciales)
        }catch(error){
            //console.error("Error:",error)
            toast.error('Error: ' + error.message);
        }
    }
 
    return(
       
            <main className="p-4 lg:h-screen lg:overflow-hidden">
            
                <Nav />
                <div className="h-full grid place-content-center">
                    <section className="w-full max-w-md p-8 bg-Neutral-1/80 rounded-3xl shadow-2xl border border-Neutral-2/50">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-gray-900 mb-2">{modo === 'actualizar' ? 'Actualizar Gasto' : 'Agregar Nuevo Gasto'}</h2>
                            <div className="w-20 h-1 bg-Verde mx-auto rounded-full shadow-md"></div>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Nombre</label>
                                <div className="relative">
                                    <input
                                        className="w-full h-14 pl-2 pr-4 bg-Neutral/70 border-2 border-Neutral-2/50 rounded-2xl text-2xl font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-lg hover:shadow-xl"
                                        type="text"
                                        placeholder="Cocacola"
                                        value={formData.descripcion}
                                        name="descripcion"
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
                                        placeholder="$ 2.200"
                                        value={formData.monto || ''}
                                        name="monto"
                                        onChange={handleChange}
                                        required
                                        min="1"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                                    Categoría
                                </label>
                                <select className="w-full h-14 px-2 bg-Neutral/70 border-2 border-Neutral-2/50 rounded-2xl text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    value={formData.categoria_id}
                                    name="categoria_id"
                                    required
                                    onChange={handleChange}>
                                    <option value="">Selecciona...</option>
                                    <option value="2">Ocio</option>
                                    <option value="3">Comida</option>
                                    <option value="4">Servicios</option>
                                    <option value="5">Transporte</option>
                                    <option value="6">Hogar</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                                    Fecha del Gasto
                                    <span className="w-3 h-3 bg-Verde rounded-full shadow-sm"></span>
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full h-14 pl-10 pr-4 bg-Neutral/70 border-2 border-Neutral-2/50 rounded-2xl text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-lg hover:shadow-xl "
                                        type="date"
                                        value={formData.fecha}
                                        name="fecha"
                                        onChange={handleChange}
                                    //fehca 
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