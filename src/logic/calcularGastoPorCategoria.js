export const calcularTotalGastos = (data) => {
    if (!data || data.length === 0) return 0;
    return data.reduce((total, gasto) => total + Number(gasto.monto), 0);
};
