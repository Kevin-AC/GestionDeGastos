
import { useData } from '../hook/useData';
import { calcularTotalGastos } from '../logic/calcularGastoPorCategoria';
import { createContext } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const GastosContext = createContext();

export function GastosProvider ({children}){
    
    const data = useData('ListaGastosServlet');
    

    if (!data) {
       
        return children;
    }

    const CATEGORIAS_PREDEFINIDAS = [  // ← TU CÓDIGO EXACTO
        { id: 2, nombre: 'Arriendo' },
        { id: 3, nombre: 'Comida' },
        { id: 4, nombre: 'Servicios' },
        { id: 5, nombre: 'Transporte' },
        { id: 6, nombre: 'Entretenimiento' }
    ];

    const categoriasConGastos = CATEGORIAS_PREDEFINIDAS.map(categoria => {
        const gastosCategoria = data.filter(g => g.categoria_id === categoria.id);//optener objeto con elementos por categoria
        
        const totalCategoria = calcularTotalGastos(gastosCategoria);//total de cada categoria
        const cantidadGastos = gastosCategoria.length;//cantidad de elementos en cada categoria

        return {
            ...categoria,
            gastos: gastosCategoria,
            total: totalCategoria,
            cantidad: cantidadGastos

        };
    });

    const totalGeneral = calcularTotalGastos(data);
    

    const gastosPorCategorias = categoriasConGastos.map(cat => ({
        nombre: cat.nombre,
        gastos: cat.gastos
    }));
   

    
    return(
        <GastosContext.Provider value={{
            categoriasConGastos,
            totalGeneral,
            gastosPorCategorias
        }}>
            {children}
        </GastosContext.Provider>
    )
}