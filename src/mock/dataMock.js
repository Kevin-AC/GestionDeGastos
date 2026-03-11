// dataMock.js
export const mockData = [
    {//user
        id:1,
        nombre:'Kevin',
        saldoTotal:4500000,

    },
    { //categorias y gastos por categoria
        id: 1,
        nombre: 'Ocio',
        presupuesto: 1000000,
        gastos: [//gatos
            { id: 1, descripcion: 'Netflix', monto: 35000, fecha: '2026-03-01' },
            { id: 2, descripcion: 'Cine con amigos', monto: 55000, fecha: '2026-03-03' },
            { id: 3, descripcion: 'Concierto', monto: 120000, fecha: '2026-03-05' },
            { id: 4, descripcion: 'Suscripción Spotify', monto: 28000, fecha: '2026-03-06' },
            { id: 5, descripcion: 'Juego Steam', monto: 80000, fecha: '2026-03-08' },
        ],
    },
    {
        id: 2,
        nombre: 'Comida',
        presupuesto: 800000,
        gastos: [
            { id: 6, descripcion: 'Almuerzo oficina', monto: 20000, fecha: '2026-03-01' },
            { id: 7, descripcion: 'Mercado semana', monto: 180000, fecha: '2026-03-02' },
            { id: 8, descripcion: 'Domicilio Rappi', monto: 35000, fecha: '2026-03-03' },
            { id: 9, descripcion: 'Café Juan Valdez', monto: 15000, fecha: '2026-03-04' },
            { id: 10, descripcion: 'Pizza noche', monto: 45000, fecha: '2026-03-05' },
        ],
    },
    {
        id: 3,
        nombre: 'Servicios',
        presupuesto: 600000,
        gastos: [
            { id: 11, descripcion: 'Luz', monto: 120000, fecha: '2026-03-01' },
            { id: 12, descripcion: 'Agua', monto: 70000, fecha: '2026-03-02' },
            { id: 13, descripcion: 'Internet', monto: 110000, fecha: '2026-03-03' },
            { id: 14, descripcion: 'Celular', monto: 60000, fecha: '2026-03-04' },
            { id: 15, descripcion: 'Gas', monto: 90000, fecha: '2026-03-05' },
        ],
    },
    {
        id: 4,
        nombre: 'Transporte',
        presupuesto: 500000,
        gastos: [
            { id: 16, descripcion: 'Transmilenio', monto: 6000, fecha: '2026-03-01' },
            { id: 17, descripcion: 'Uber oficina', monto: 22000, fecha: '2026-03-02' },
            { id: 18, descripcion: 'Taxi lluvia', monto: 18000, fecha: '2026-03-03' },
            { id: 19, descripcion: 'Parqueadero', monto: 12000, fecha: '2026-03-04' },
            { id: 20, descripcion: 'Gasolina', monto: 80000, fecha: '2026-03-05' },
        ],
    },
    {
        id: 5,
        nombre: 'Hogar',
        presupuesto: 1200000,
        gastos: [
            { id: 21, descripcion: 'Arriendo', monto: 900000, fecha: '2026-03-01' },
            { id: 22, descripcion: 'Aseo casa', monto: 40000, fecha: '2026-03-03' },
            { id: 23, descripcion: 'Decoración', monto: 60000, fecha: '2026-03-04' },
            { id: 24, descripcion: 'Herramientas', monto: 35000, fecha: '2026-03-05' },
            { id: 25, descripcion: 'Productos limpieza', monto: 25000, fecha: '2026-03-06' },
        ],
    },
];
