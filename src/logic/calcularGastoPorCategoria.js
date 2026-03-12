export const calcularGastoPorCategoria = (gastos) => {//calcular el gasto por cada categoria
    if (!gastos || gastos.length === 0) return 0;
    let totalCategoria = 0;
    gastos.forEach(gastos => {
        totalCategoria += gastos.monto
    })
    //console.log('gatocategoria',totalCategoria)
    return totalCategoria;
}
