// hooks/useGastosFiltrados.js
import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { GastosContext } from '../contexts/GastosProvider'
export function useGastosFiltrados() {
    const location = useLocation();
    const context = useContext(GastosContext);
    const { categoriasConGastos, refetchGastos } = context || {};

    const [ordenado, setOrdenado] = useState('fecha-desc');
    const categoriaId = location.state?.categoriaId || null;

    //lógica memoizada usememo
    const categoriaSeleccionada = useMemo(() => {
        if (!categoriasConGastos || !categoriaId) return null;
        return categoriasConGastos.find(categoria => categoria.id === categoriaId);
    }, [categoriasConGastos, categoriaId]);

    const gastosCategoria = useMemo(() => {
        return categoriaSeleccionada?.gastos || [];
    }, [categoriaSeleccionada]);

    const gastosOrdenados = useMemo(() => {
        console.log('🔄 Ordenando por:', ordenado, 'gastos:', gastosCategoria.length);
        return [...gastosCategoria].sort((a, b) => {
            switch (ordenado) {
                case 'monto-desc':
                    return b.monto - a.monto;
                case 'monto-asc':
                    return a.monto - b.monto;
                case 'fecha-desc':
                    return new Date(b.fecha) - new Date(a.fecha);
                case 'fecha-asc':
                    return new Date(a.fecha) - new Date(b.fecha);
                default:
                    return 0;
            }
        });
    }, [gastosCategoria, ordenado]);

    return {
        // Datos
        categoriaSeleccionada,
        gastosOrdenados,
        gastosCategoria,
        nombreCategoria: categoriaSeleccionada?.nombre,
        totalGastos: categoriaSeleccionada?.total,
        cantidadGastos: gastosCategoria.length,
        loading: !categoriasConGastos || !categoriaId || !categoriaSeleccionada,
        ordenado,
        setOrdenado,
        refetchGastos
    };
}