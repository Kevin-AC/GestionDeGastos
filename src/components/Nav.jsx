import { confirmarEjecucion } from "../logic/ConfirmarEjecucion";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthPrivider";
import { toast } from "sonner";
import { useApi } from "../hook/useData";

export default function Nav() {
  const { user, setUser } = useContext(AuthContext);
  const { post } = useApi();
  const [navOpen, setNavOpen] = useState(true);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    toast.warning("¿Cerrar sesión?", {
      duration: Infinity,
      action: {
        label: "Salir",
        onClick: async () => {
          setLoading(true);
          try {
            await post(
              "UsuarioServlet",
              {
                accion: "logout",
              },
              { includeCredentials: true },
            );
            setUser(null);
            localStorage.removeItem("user");

            toast.success("Sesión cerrada");
          } catch (e) {
            console.error("ERROR REAL:", e);
            toast.error("Error de red");
          } finally {
            setLoading(false);
            setOpenUserMenu(false);
          }
        },
      },
    });
  }

  async function handleEditAccount() {
    if (!user) return alert("No autenticado");
    const nuevoNombre = prompt("Nuevo nombre", user.nombre || "");
    if (nuevoNombre == null) return;
    if (nuevoNombre.trim() === "") return alert("Nombre no puede estar vacío");
    setLoading(true);
    try {
      const res = await post(
        "UsuarioServlet",
        {
          accion: "actualizar",
          idUsuario: user.idUsuario,
          nombre: nuevoNombre,
        },
        { includeCredentials: true },
      );

      if (res?.success) {
        const updated = { ...user, nombre: nuevoNombre };
        setUser(updated);
        localStorage.setItem("user", JSON.stringify(updated));
        toast.success("Perfil actualizado");
      } else {
        toast.error(res?.message || "Error al actualizar");
      }
    } catch (err) {
      console.error(err);
      //alert('Error de red al actualizar');
      toast.error("Error de red al actualizar");
    } finally {
      setLoading(false);
      setOpenUserMenu(false);
    }
  }

  async function handleDeleteAccount() {
    if (!user) {
      toast.error("No autenticado");
      return;
    }
    confirmarEjecucion({
      message: `¿Eliminar tu cuenta "${user?.nombre || ""}"?`,
      request: () =>
        post(
          "UsuarioServlet",
          {
            accion: "eliminar",
          },
          { includeCredentials: true },
        ),

      onSuccess: (res) => {
        setUser(null);
        localStorage.removeItem("user");
        toast.success(res.message || "Cuenta eliminada");
      },

      onFinally: () => {
        setLoading(false);
        setOpenUserMenu(false);
      },
    });
  }

  return (
    <header className="w-full bg-white/96 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex lg:flex-row flex-col items-center relative z-50 mb-12 lg:mb-0">
      <div className="flex items-center justify-between w-full lg:w-auto">
        <Link to="/" className="text-2xl font-extrabold text-gray-800">
          MiGestorFinann
        </Link>

        <button
          onClick={() => setNavOpen((prev) => !prev)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <ion-icon name="menu-outline" size={"large"}></ion-icon>
        </button>
      </div>
      <nav
        className={`flex-1 justify-center ${navOpen ? "flex" : "hidden"} lg:flex`}
      >
        <ul className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 mt-4 lg:mt-0">
          <li>
            <Link
              to="/"
              className="px-4 py-2 text-lg font-bold text-green-700 rounded-lg hover:bg-green-50 hover:scale-[1.02] transition-transform shadow-sm"
            >
              Dashboard
            </Link>
          </li>

          {/* Gastos */}
          <li className="relative group">
            <button className="px-4 py-2 text-lg font-semibold text-gray-800 hover:text-green-700 rounded-lg hover:bg-gray-50 transition-colors">
              Gastos
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[240px] bg-white border border-gray-200 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                to="/newGasto"
                className="block px-5 py-3 text-sm text-gray-800 hover:bg-green-50"
              >
                + Agregar gasto
              </Link>
              <Link
                to="/listaGastosGeneral"
                className="block px-5 py-3 text-sm text-gray-800 hover:bg-green-50"
              >
                Lista de gastos
              </Link>
            </div>
          </li>

          {/* Ingresos */}
          <li className="relative group">
            <button className="px-4 py-2 text-lg font-semibold text-gray-800 hover:text-green-700 rounded-lg hover:bg-gray-50 transition-colors">
              Ingresos
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[220px] bg-white border border-gray-200 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                to="/newIngreso"
                className="block px-5 py-3 text-sm text-gray-800 hover:bg-green-50"
              >
                + Agregar ingreso
              </Link>
              <Link
                to="/listaIngresos"
                className="block px-5 py-3 text-sm text-gray-800 hover:bg-green-50"
              >
                Lista de ingresos
              </Link>
            </div>
          </li>

          <li>
            <Link
              to="/estadistica"
              className="px-4 py-2 text-lg font-bold text-gray-800 rounded-lg hover:bg-gray-50 hover:scale-[1.02] transition-transform shadow-sm"
            >
              Estadística
            </Link>
          </li>
        </ul>
      </nav>

      {/* Menú usuario (derecha) */}
      <div className="ml-6 flex items-center relative">
        {user ? (
          <>
            <div className="p-1 rounded-md border border-gray-200 bg-white shadow-sm">
              <button
                onClick={() => setOpenUserMenu((prev) => !prev)}
                className="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-50"
              >
                <span className="font-extrabold text-gray-800">Hola,</span>
                <span className="text-amber-800 font-extrabold">
                  {user.nombre}
                </span>

                <div className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-white bg-linear-to-b from-Verde to-Verde/30 shadow-2xl border-Verde border-2">
                  {user.nombre ? user.nombre.charAt(0).toUpperCase() : "U"}
                </div>
              </button>
            </div>

            {openUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 shadow-2xl rounded-lg z-50">
                <button
                  onClick={handleEditAccount}
                  disabled={loading}
                  className="w-full text-left px-5 py-3 hover:bg-green-50 font-semibold text-green-700"
                >
                  Editar perfil
                </button>

                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full text-left px-5 py-3 hover:bg-gray-50 font-semibold text-gray-800"
                >
                  Cerrar sesión
                </button>

                <div className="mx-4 my-2">
                  <div className="h-0.5 bg-gray-200 rounded" />
                </div>

                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="w-full text-left px-5 py-3 text-amber-800 hover:bg-red-50 font-semibold"
                >
                  Eliminar cuenta
                </button>
              </div>
            )}
          </>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1 text-sm text-gray-700 hover:text-green-600"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}
