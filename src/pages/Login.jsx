import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthPrivider";

export default function Login() {
    const [identificador, setIdentificador] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:8080/GestorGastos/LoginServlet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identificador: identificador, password }),
                credentials: "include"
                
            });
            // console.log({
            //     correo: identificador,
            //     password: password
            // });

            // Intentar parsear JSON de respuesta
            let data = null;
            try { data = await res.json(); } catch { data = null; }

            if (res.ok && data && data.success && data.user) {
                // Actualizar contexto global y localStorage
                const userNormalizado = {
                    idUsuario: data.user.idUsuario || data.user.id, 
                    nombre: data.user.nombre,
                    apellido: data.user.apellido,
                    correo: data.user.correo
                };
                setUser(userNormalizado);
                localStorage.setItem("user", JSON.stringify(userNormalizado));
                // (Opcional) token si tu backend lo devuelve
                if (data.token) localStorage.setItem("authToken", data.token);

                // limpiar y redirigir
                setIdentificador("");
                setPassword("");
                navigate("/", { replace: true });
                return;
            }

            // Manejo de estados específicos según backend
            if (res.status === 404) {
                navigate("/registro", { state: { nombre: identificador } });
                return;
            }
            if (res.status === 401) {
                setError("Contraseña incorrecta.");
                return;
            }

            // Mensaje por defecto si no se pudo autenticar
            const msg = (data && data.message) ? data.message : "Credenciales inválidas";
            setError(msg);

        } catch (err) {
            console.error(err);
            setError("No se pudo conectar al servidor.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="grid place-content-center h-screen">
            <form onSubmit={handleSubmit} className="w-125 py-6 px-10 flex flex-col items-center gap-4 bg-Neutral-1/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-Neutral-2/50">
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
                    <button type="submit" disabled={loading} className="w-full h-12 bg-Verde text-white font-bold rounded-2xl">
                        {loading ? "Ingresando..." : "Iniciar Sesión"}
                    </button>

                    <Link to="/registro" className="text-lg font-semibold text-gray-700 hover:text-Verde hover:underline">
                        Registrarse
                    </Link>
                </div>
            </form>
        </main>
    );
}