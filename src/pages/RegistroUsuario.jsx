import  {useState } from 'react';
import { useApi} from '../hook/useData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'
import { Link } from 'react-router-dom';

export default function RegistroUsuario() {
    const navigate = useNavigate();
    const {post}= useApi();
   
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        contrasena: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registerPromise = post('UsuarioServlet', formData)
            .then(data => {
                return new Promise(resolve => {
                    setTimeout(() => resolve({ success: true, data }), 2000);
                });
            })
            .catch(error => Promise.reject(error));

        await toast.promise(registerPromise, {
            loading: 'Creando cuenta...',
            success: (result) => {
                console.log('✅', result.data);
                setTimeout(() => navigate('/login'), 1700);
                return '¡Usuario registrado!';
            },
            error: (error) => `Error: ${error.message}`
        });
    };





    return (
        <main className="grid place-content-center h-screen">
           
            <section className="w-auto h-auto py-5 px-12 flex flex-col items-center gap-4 bg-Neutral-1/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-Neutral-2/50">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Formulario de Registro</h2>
                <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Nombre</label>
                        <input
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full h-12 px-4 bg-Neutral/70 border border-Neutral-2/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-sm hover:shadow-md"
                            type="text"
                            placeholder="Ingresa tu nombre"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Apellido</label>
                        <input
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="w-full h-12 px-4 bg-Neutral/70 border border-Neutral-2/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-sm hover:shadow-md"
                            type="text"
                            placeholder="Ingresa tu Apellido"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Telefono</label>
                        <input
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full h-12 px-4 bg-Neutral/70 border border-Neutral-2/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-sm hover:shadow-md"
                            type="tel"
                            placeholder="Ingresa tu Telefono"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Correo</label>
                        <input
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            className="w-full h-12 px-4 bg-Neutral/70 border border-Neutral-2/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-sm hover:shadow-md"
                            type="email"
                            placeholder="Ingresa tu Correo"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Contraseña</label>
                        <input
                            name="contrasena"
                            value={formData.contrasena}
                            onChange={handleChange}
                            className="w-full h-12 px-4 bg-Neutral/70 border border-Neutral-2/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Verde/50 focus:border-Verde/70 transition-all duration-200 shadow-sm hover:shadow-md"
                            type="password"
                            placeholder="Ingresa tu Contraseña"
                            required
                        />
                    </div>
                   <div className='w-full h-auto flex flex-col gap-4 items-center'>
                        <button
                            type="submit"
                            className="mt-4 w-full h-12 px-6 bg-Verde text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-Verde/90 focus:outline-none focus:ring-4 focus:ring-Verde/50 transition-all duration-200"
                        >
                            Enviar
                        </button>
                        <Link
                            to="/login"
                            className=" text-Verde hover:text-Verde/80 font-semibold transition-colors flex items-center gap-1 text-sm"
                        >
                            Volver al Login
                        </Link>
                   </div>
                </form>
            </section>
        </main>
    );
}
