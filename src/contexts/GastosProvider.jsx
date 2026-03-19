
import { useData } from '../hook/useData';
import { calcularTotalGastos } from '../logic/calcularGastoPorCategoria';
import { createContext } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const GastosContext = createContext();

export function GastosProvider ({children}){
    
    const { data: gastosData, refetch: refetchGastos } = useData('ListaGastosServlet');
    const { data: ingresosData, refetch: refetchIngresos } = useData('ListaIngresosServlet')

    if (!gastosData || !ingresosData) return children;

    const CATEGORIAS_PREDEFINIDAS = [  // ← TU CÓDIGO EXACTO
        { id: 2, nombre: 'Ocio' },
        { id: 3, nombre: 'Comida' },
        { id: 4, nombre: 'Servicios' },
        { id: 5, nombre: 'Transporte' },
        { id: 6, nombre: 'Hogar' }
    ];

    const categoriasConGastos = CATEGORIAS_PREDEFINIDAS.map(categoria => {
        const gastosCategoria = gastosData.filter(g => g.categoria_id === categoria.id);//optener objeto con elementos por categoria
        //console.log(gastosCategoria)
        const totalCategoria = calcularTotalGastos(gastosCategoria);//total de cada categoria
        //console.log('totalCategoria',totalCategoria)
        const cantidadGastos = gastosCategoria.length;//cantidad de elementos en cada categoria

        return {
            ...categoria,
            gastos: gastosCategoria,
            total: totalCategoria,
            cantidad: cantidadGastos

        };
    });

    const totalGeneral = calcularTotalGastos(gastosData);

    //Ingresos
    const ingresos = ingresosData.filter(gasto => gasto.categoria_id === 1);
    const totalIngresos = calcularTotalGastos(ingresos)
    const balance = totalIngresos - totalGeneral
    console.log(ingresos)
    return(
        <GastosContext.Provider value={{
            categoriasConGastos,
            totalGeneral,
            totalIngresos,
            balance,
            ingresos,
            refetchGastos: () => {
                refetchGastos();
                refetchIngresos();
            }
        }}>
            {children}
        </GastosContext.Provider>
    )
}