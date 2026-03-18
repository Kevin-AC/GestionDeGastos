import Nav from "../components/Nav";
import { useRef, useEffect } from "react";
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { useContext } from 'react';
import { GastosContext } from '../contexts/GastosProvider';
echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer]);

export default function Estadistica() {
    const chartRef = useRef(null);
    const context = useContext(GastosContext); 
    const { categoriasConGastos } = context || {};
    
    const chartData = categoriasConGastos?.map((categoria) => ({//organizar los datos de categoriasConGastos para tomar el total y nombre 
        value: categoria.total,
        name: categoria.nombre
    })) || [];

    console.log(chartData)
    useEffect(() => {
        const myChart = echarts.init(chartRef.current);
        const option = {
            tooltip: { trigger: 'item' },
            legend: { top: '5%', left: 'center' },
            series: [{
                name: 'Gastos Categoria',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '70%'],
                startAngle: 180,
                endAngle: 360,
                data:chartData
            }]
        };
        myChart.setOption(option);

        const resizeHandler = () => myChart.resize();
        window.addEventListener('resize', resizeHandler);

        return () => {
            myChart.dispose();
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (
        <main>
            <Nav />
            <section>
                <div ref={chartRef} style={{ width: '100%', height: 700 }} />
            </section>
        </main>
    );
}
