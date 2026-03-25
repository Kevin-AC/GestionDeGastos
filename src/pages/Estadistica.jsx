import Nav from "../components/Nav";
import { useRef, useEffect } from "react";
import * as echarts from 'echarts/core';
import { PieChart,BarChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent, TitleComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { useContext } from 'react';
import { GastosContext } from '../contexts/GastosProvider';
echarts.use([PieChart, BarChart, TooltipComponent, LegendComponent, TitleComponent, GridComponent, CanvasRenderer]);

export default function Estadistica() {
    const pieRef = useRef(null);
    const barRef = useRef(null)
    const context = useContext(GastosContext); 
    const { categoriasConGastos } = context || {};
    //console.log('objeto',categoriasConGastos)

    const topGastos = categoriasConGastos
        ?.flatMap(categoria => categoria.gastos.map(gasto => ({
            nombre: gasto.descripcion || `Gasto ${gasto.id}`, 
            total: gasto.monto || gasto.valor 
        })))
        ?.sort((a, b) => b.total - a.total)  // Ordenar Des
        ?.slice(0, 5) || [];  // Top 5
    //para grafico pie
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const chartDataPie = categoriasConGastos?.map((categoria) => ({//organizar los datos de categoriasConGastos para tomar el total y nombre 
        value: categoria.total,
        name: categoria.nombre
    })) || [];
    //para grafico de barra
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const labelsBar = topGastos?.map(cat => cat.nombre) || [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const valuesBar = topGastos?.map(cat => cat.total) || [];


    console.log(chartDataPie)
    useEffect(() => {
        const myChart = echarts.init(pieRef.current);
        const option = {
            tooltip: { trigger: 'item' },
            legend: { top: '5%', left: 'center' },
            series: [{
                name: 'Total',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '70%'],
                startAngle: 180,
                endAngle: 360,
                data:chartDataPie
            }]
        };
        myChart.setOption(option);

        const resizeHandler = () => myChart.resize();
        window.addEventListener('resize', resizeHandler);

        return () => {
            myChart.dispose();
            window.removeEventListener('resize', resizeHandler);
        };
    }, [chartDataPie]);

    useEffect(() => {
        if (!barRef.current) return;
        const myChart = echarts.init(barRef.current);
        const option = {
            title: { text: 'Top Gastos' },
            tooltip: {},
            xAxis: { type: 'category', data: labelsBar },
            yAxis: { type: 'value' },
            series: [{ name: 'Total', data: valuesBar, type: 'bar' }]
        };
        myChart.setOption(option);
        const resize = () => myChart.resize();
        window.addEventListener('resize', resize);
        return () => { myChart.dispose(); window.removeEventListener('resize', resize); };
    }, [labelsBar, valuesBar]);


    return (
        <main>
            <Nav />
            <section className="flex lg:flex-row flex-col justify-center mt-12 p-4 lg-p-0">
                {/* Pie Chart */}
                <div className="flex-1" style={{ minWidth: '400px' }}>
                    <p className="text-center text-xl font-bold">Gastos por Categorias</p>
                    <div ref={pieRef} style={{ width: '100%', height: 700 }} />
                </div>
                {/* Bar Chart */}
                <div className="flex-1" style={{ minWidth: '400px' }}>
                    <div ref={barRef} style={{ width: '100%', height: 590 }} />
                </div>
            </section>
        </main>
    );
}
