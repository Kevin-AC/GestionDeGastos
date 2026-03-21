
import React, { useState, useContext, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthPrivider';

export default function Nav() {
    const { user, setUser } = useContext(AuthContext);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [loading, setLoading] = useState(false);

    const [openGastos, setOpenGastos] = useState(false);
    const [openIngresos, setOpenIngresos] = useState(false);

    const gastosRef = useRef(null);
    const ingresosRef = useRef(null);
    const userMenuRef = useRef(null);
    const hoverTimeout = useRef(null);

    const location = useLocation();
    useEffect(() => {
        setOpenGastos(false);
        setOpenIngresos(false);
        setOpenUserMenu(false);
    }, [location.pathname]);

    useEffect(() => {
        function handleOutside(e) {
            if (gastosRef.current && !gastosRef.current.contains(e.target)) setOpenGastos(false);
            if (ingresosRef.current && !ingresosRef.current.contains(e.target)) setOpenIngresos(false);
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setOpenUserMenu(false);
        }
        window.addEventListener('click', handleOutside);
        return () => window.removeEventListener('click', handleOutside);
    }, []);

    function openGastosNow() {
        clearTimeout(hoverTimeout.current);
        setOpenIngresos(false);
        setOpenGastos(true);
    }
    function closeGastosDelayed() {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => setOpenGastos(false), 120);
    }

    function openIngresosNow() {
        clearTimeout(hoverTimeout.current);
        setOpenGastos(false);
        setOpenIngresos(true);
    }
    function closeIngresosDelayed() {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => setOpenIngresos(false), 120);
    }

    function openUserNow() {
        clearTimeout(hoverTimeout.current);
        setOpenUserMenu(true);
    }
    function closeUserDelayed() {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => setOpenUserMenu(false), 120);
    }

    async function handleLogout() {
        if (!confirm('¿Cerrar sesión?')) return;
        setLoading(true);
        try {
            const res = await fetch('/GestorGastos/UsuarioServlet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ accion: 'logout' })
            });
            if (res.ok) {
                setUser(null);
                localStorage.removeItem('user');
            } else {
                const txt = await res.text().catch(() => 'Error');
                alert('Error cerrando sesión: ' + txt);
                
            }
        } catch (err) {
            console.error(err);
            alert('Error de red al cerrar sesión');
        } finally {
            setLoading(false);
            setOpenUserMenu(false);
        }
    }

    async function handleEditAccount() {
        if (!user) return alert('No autenticado');
        const nuevoNombre = prompt('Nuevo nombre', user.nombre || '');
        if (nuevoNombre == null) return;
        if (nuevoNombre.trim() === '') return alert('Nombre no puede estar vacío');
        setLoading(true);
        try {
            const res = await fetch('/GestorGastos/UsuarioServlet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ accion: 'actualizar', idUsuario: user.id, nombre: nuevoNombre })
            });
            const json = await res.json().catch(() => null);
            if (res.ok && json && json.success) {
                const updated = { ...user, nombre: nuevoNombre };
                setUser(updated);
                localStorage.setItem('user', JSON.stringify(updated));
            } else {
                alert((json && json.message) ? json.message : 'Error al actualizar');
            }
        } catch (err) {
            console.error(err);
            alert('Error de red al actualizar');
        } finally {
            setLoading(false);
            setOpenUserMenu(false);
        }
    }

    async function handleDeleteAccount() {
        if (!user) return alert('No autenticado');
        if (!confirm('¿Eliminar tu cuenta? Esta acción no se puede deshacer.')) return;
        setLoading(true);
        try {
            const res = await fetch('/GestorGastos/UsuarioServlet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ accion: 'eliminar', idUsuario: user.id })
            });
            const json = await res.json().catch(() => null);
            if (res.ok && json && json.success) {
                setUser(null);
                localStorage.removeItem('user');
                alert(json.message || 'Cuenta eliminada');
            } else {
                alert((json && json.message) ? json.message : 'Error al eliminar cuenta');
            }
        } catch (err) {
            console.error(err);
            alert('Error de red al eliminar cuenta');
        } finally {
            setLoading(false);
            setOpenUserMenu(false);
        }
    }

    function Portal({ children, coords }) {
        if (typeof document === 'undefined') return null;
        const wrapper = (
            <div
                style={{
                    position: 'absolute',
                    left: coords.left,
                    top: coords.top,
                    transform: 'translateX(-50%)',
                    zIndex: 30000,
                    pointerEvents: 'auto'
                }}
            >
                {children}
            </div>
        );
        return createPortal(wrapper, document.body);
    }

    function getCoordsForRef(ref) {
        if (!ref || !ref.current) return { left: '50%', top: 0 };
        const rect = ref.current.getBoundingClientRect();
        const left = rect.left + rect.width / 2;
        const top = rect.bottom + window.scrollY + 8;
        return { left, top };
    }

    return (
        <header className="w-full bg-white/96 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex items-center relative z-[9999]">
            {/* Logo */}
            <div className="flex items-center mr-6">
                <Link to="/" className="text-2xl font-extrabold text-gray-800">MiGestorFinann</Link>
            </div>

            <nav className="flex-1 flex justify-center">
                <ul className="flex items-center gap-10">
                    <li>
                        <Link
                            to="/"
                            className="px-4 py-2 text-lg font-bold text-green-700 rounded-lg hover:bg-green-50 hover:scale-[1.02] transition-transform shadow-sm"
                        >
                            Dashboard
                        </Link>
                    </li>

                    {/* Gastos */}
                    <li
                        ref={gastosRef}
                        className="relative"
                        onMouseEnter={openGastosNow}
                        onMouseLeave={closeGastosDelayed}
                    >
                        <button
                            onClick={() => { setOpenGastos((s) => !s); setOpenIngresos(false); }}
                            className="px-4 py-2 text-lg font-semibold text-gray-800 hover:text-green-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Gastos
                        </button>

                        {openGastos && (
                            <Portal coords={getCoordsForRef(gastosRef)}>
                                <div
                                    className="min-w-[240px] bg-white border border-gray-200 shadow-xl rounded-lg"
                                    onMouseEnter={openGastosNow}
                                    onMouseLeave={closeGastosDelayed}
                                    role="menu"
                                >
                                    <Link to="/newGasto" className="block px-5 py-3 text-sm text-gray-800 hover:bg-green-50"> + Agregar gasto</Link>
                                </div>
                            </Portal>
                        )}
                    </li>

                    {/* Ingresos */}
                    <li
                        ref={ingresosRef}
                        className="relative"
                        onMouseEnter={openIngresosNow}
                        onMouseLeave={closeIngresosDelayed}
                    >
                        <button
                            onClick={() => { setOpenIngresos((s) => !s); setOpenGastos(false); }}
                            className="px-4 py-2 text-lg font-semibold text-gray-800 hover:text-green-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Ingresos
                        </button>

                        {openIngresos && (
                            <Portal coords={getCoordsForRef(ingresosRef)}>
                                <div
                                    className="min-w-[220px] bg-white border border-gray-200 shadow-xl rounded-lg"
                                    onMouseEnter={openIngresosNow}
                                    onMouseLeave={closeIngresosDelayed}
                                    role="menu"
                                >
                                    <Link to="/newIngreso" className="block px-5 py-3 text-sm text-gray-800 hover:bg-green-50"> + Agregar ingreso</Link>
                                    <Link to="/listaIngresos" className="block px-5 py-3 text-sm text-gray-800 hover:bg-green-50">Lista de ingresos</Link>
                                </div>
                            </Portal>
                        )}
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
            <div className="ml-6 flex items-center">
                <div
                    ref={userMenuRef}
                    className="relative"
                    onMouseEnter={openUserNow}
                    onMouseLeave={closeUserDelayed}
                >
                    {user ? (
                        <>
                            <div className="p-1 rounded-md border border-gray-200 bg-white shadow-sm">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setOpenUserMenu((s) => !s); }}
                                    aria-haspopup="true"
                                    aria-expanded={openUserMenu}
                                    className="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-50 focus:outline-none"
                                >
                                    <span className="font-extrabold text-gray-800">Hola,</span>
                                    <span className="text-amber-800 font-extrabold">{user.nombre}</span>

                                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-white bg-linear-to-b from-Verde to-Verde/30 shadow-2xl border-Verde border-2"

                                    >
                                        {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                </button>
                            </div>

                            {openUserMenu && (
                                <Portal coords={{
                                    left: userMenuRef.current ? (userMenuRef.current.getBoundingClientRect().left + userMenuRef.current.offsetWidth / 2) : window.innerWidth - 80,
                                    top: (userMenuRef.current ? userMenuRef.current.getBoundingClientRect().bottom : 0) + window.scrollY + 8
                                }}>
                                    <div
                                        className="w-52 bg-white border border-gray-200 shadow-2xl rounded-lg"
                                        onMouseEnter={openUserNow}
                                        onMouseLeave={closeUserDelayed}
                                        role="menu"
                                    >
                                        <button
                                            onClick={handleEditAccount}
                                            disabled={loading}
                                            className="w-full text-left px-5 py-3 hover:bg-green-50 font-semibold text-green-700 flex items-center gap-2"
                                        >
                                            Editar perfil
                                        </button>

                                        <button
                                            onClick={handleLogout}
                                            disabled={loading}
                                            className="w-full text-left px-5 py-3 hover:bg-gray-50 font-semibold text-gray-800 flex items-center gap-2"
                                        >
                                            Cerrar sesión
                                        </button>

                                        <div className="mx-4 my-2" aria-hidden>
                                            <div className="h-[2px] bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
                                        </div>

                                        <button
                                            onClick={handleDeleteAccount}
                                            disabled={loading}
                                            className="w-full text-left px-5 py-3 text-amber-800 hover:bg-red-50 font-semibold flex items-center gap-2"
                                        >
                                            Eliminar cuenta
                                        </button>
                                    </div>
                                </Portal>
                            )}
                        </>
                    ) : (
                        <Link to="/login" className="px-3 py-1 text-sm text-gray-700 hover:text-green-600">Iniciar sesión</Link>
                    )}
                </div>
            </div>
        </header>
    );
}