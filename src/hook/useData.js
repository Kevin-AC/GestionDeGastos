import { useState, useEffect } from 'react';
//import { mockData } from '../mock/dataMock';
const API_URL = '/GestorGastos';  // ← SIN http://localhost:8080
export const useData=(endpoint)=>{
    const [data,setData]= useState(null)
    const [trigger,setTrigger]= useState(0);

    useEffect(() => {
        //console.log('🔄 Hook ejecutándose para:', endpoint); 
        if(endpoint){
            //console.log('🚀 Fetch a:', `${API_URL}/${endpoint}`);
            fetch(`${API_URL}/${endpoint}`)
                .then(res => {
                    console.log('📡 Response status:', res.status, res.ok);
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then(recibidos => {  // ← 'recibidos' son los datos reales
                   //console.log('✅ Datos recibidos:', recibidos);  // ← AQUÍ
                    setData(recibidos);
                })
        }
       
    }, [endpoint,trigger])
    const refetch = () => setTrigger(prev => prev + 1);//actualuar el fetch mostar nuevos registros
    return {data,refetch};
};
export const usePost = () => {
    const postData = async (endpoint, formData) => {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData)
        })
        return response.text();
    }
    return postData
}

export const useDelete=()=>{
    const deleteData = async (endpoint, idTransaccion, idUsuario = 1) => {
        const response = await fetch(`${API_URL}/${endpoint}?id=${idTransaccion}`, {//error
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(
                {
                    accion:'eliminar',
                    idTransaccion,
                    idUsuario
                }
            )
        })
        if(!response.ok){
            throw new Error('Error al eliminar')
        }
        return response.text();
    }
    return deleteData
}

