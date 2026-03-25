import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthPrivider";
import { toast } from 'sonner'

export default function Login() {
    const [identificador, setIdentificador] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const loginPromise = fetch("http://localhost:8080/GestorGastos/LoginServlet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identificador, password }),
            credentials: "include"
        })
            .then(async (res) => {
                let data = null;
                try { data = await res.json(); } catch { data = null; }

                // Simula mínimo 1.5s loading
                await new Promise(resolve => setTimeout(resolve, 1500));

                if (res.ok && data?.success && data?.user) {
                    return { success: true, data };
                }

                // Errores específicos
                if (res.status === 404) {
                    throw new Error("Usuario no registrado");
                }
                if (res.status === 401) {
                    throw new Error("Contraseña incorrecta");
                }
                throw new Error(data?.message || "Credenciales inválidas");
            })
            .catch(error => Promise.reject(error));

            toast.promise(loginPromise, {
            loading: 'Iniciando sesión...',
            success: async (result) => {
                // Login exitoso
                const userNormalizado = {
                    idUsuario: result.data.user.idUsuario || result.data.user.id,
                    nombre: result.data.user.nombre,
                    apellido: result.data.user.apellido,
                    correo: result.data.user.correo
                };

                setUser(userNormalizado);
                localStorage.setItem("user", JSON.stringify(userNormalizado));
                if (result.data.token) {
                    localStorage.setItem("authToken", result.data.token);
                }

                // Limpia y redirige
                setIdentificador("");
                setPassword("");

                setTimeout(() => navigate("/", { replace: true }), 1200);

                return `¡Hola ${userNormalizado.nombre}!`;
            },
            error: (error) => {
                // Redirige a registro si 404
                if (error.message.includes("no registrado")) {
                    setTimeout(() => navigate("/registro", { state: { nombre: identificador } }), 500);
                }
                return error.message;
            }
        });
    };


    return (
        <main className="w-auto p-4 grid place-content-center h-screen">
            <form onSubmit={handleSubmit} className="max-w-125 py-6 px-10 flex flex-col items-center gap-4 bg-Neutral-1/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-Neutral-2/50">
                <h2 className="text-4xl font-black text-gray-900">Bienvenido a MiGestor</h2>

                <div className="w-full flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Correo o Nombre</label>
                        <input
                            value={identificador}
                            onChange={(e) => setIdentificador(e.target.value)}
                            className="w-full h-12 px-4 bg-Neutral/70 border border-Verde/20 rounded-xl focus:outline-none focus:border-Verde focus:border-2 focus:ring-2 focus:ring-Verde/50 transition-all duration-200 ease-in-out placeholder:text-gray-500"
                            type="text"
                            placeholder="Ingresa tu correo o nombre"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Contraseña</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-12 px-4 bg-Neutral/70 border border-Verde/20 rounded-xl focus:outline-none focus:border-Verde focus:border-2 focus:ring-2 focus:ring-Verde/50 transition-all duration-200 ease-in-out placeholder:text-gray-500"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>
                </div>

                {error && <p className="text-red-600">{error}</p>}

                <div className="flex flex-col items-center w-full gap-4">
                    <button type="submit"  className="w-full h-12 bg-Verde text-white font-bold rounded-2xl hover:bg-Verde/90 active:scale-90 transition-all duration-200">
                        Iniciar Sesión
                    </button>

                    <Link to="/registro" className="text-lg font-semibold text-gray-700 hover:text-Verde hover:underline">
                        Registrarse
                    </Link>
                </div>
            </form>
        </main>
    );
}