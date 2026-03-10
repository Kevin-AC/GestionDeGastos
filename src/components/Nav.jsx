import { Link } from "react-router-dom";
import Login from "./Login";

export default function Nav(){
    return(
        <nav className="bg-Neutral-1/90 border-b border-Neutral-2/50 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* logo */}
                    <div className="bg-Verde/20 border border-Verde w-auto p-2 rounded-2xl hover:bg-Verde text-gray-900 hover:text-white ">
                        <h1 className="text-2xl font-black   ">Gestion de Gastos</h1>
                    </div>

                    {/* Desktop Nav Links */}
                    <ul className="hidden md:flex items-center gap-8">
                        <li><Link to='/'><a href="#" className="text-lg font-semibold text-gray-700 hover:text-Verde hover:underline underline-offset-4 transition-all">Home</a></Link></li>
                        <li><Link to='/newGasto'><a href="#" className="text-lg font-semibold text-gray-700 hover:text-Verde hover:underline underline-offset-4 transition-all">Agrergar Gastos</a></Link></li>
                        <li><Link to='/newIngreso'><a href="#" className="text-lg font-semibold text-gray-700 hover:text-Verde hover:underline underline-offset-4 transition-all">Agregar Ingresos</a></Link></li>
                        <li><a href="#" className="text-lg font-semibold text-gray-700 hover:text-Verde hover:underline underline-offset-4 transition-all">Estadisticas</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}