/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
//import { mockData } from '../mock/dataMock';
const API_URL = '/GestorGastos';  //url  ← SIN http://localhost:8080
export const useData=(endpoint)=>{
    const [data,setData]= useState(null)
    const [trigger,setTrigger]= useState(0);

    useEffect(() => {
        //console.log('🔄 Hook ejecutándose para:', endpoint); 
        if(endpoint){
            console.log('🚀 Fetch a:', `${API_URL}/${endpoint}`);
            fetch(`${API_URL}/${endpoint}`)
                .then(res => {
                    console.log('📡 Response status:', res.status, res.ok);
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then(recibidos => {
                   //console.log('✅ Datos recibidos:', recibidos); 
                    setData(recibidos);
                })
        }
       
    }, [endpoint,trigger])
    const refetch = () => setTrigger(prev => prev + 1);//actualizar el fetch mostar nuevos registros
    return {data,refetch};
};
// usePost retrocompatible: detecta FormData, objeto JS o URLSearchParams
export const usePost = () => {
    const postData = async (endpoint, body, options = {}) => {
        // options: { forceFormUrlEncoded: boolean, includeCredentials: boolean }
        const url = `${API_URL}/${endpoint}`;
        let fetchOptions = {
            method: 'POST',
            headers: {},
            credentials: options.includeCredentials ? 'include' : undefined,
        };

        // Si body es FormData (ej. new FormData()), dejar tal cual (no setear Content-Type)
        if (body instanceof FormData) {
            fetchOptions.body = body;
            // no setear headers Content-Type para que el navegador lo gestione
        } else if (options.forceFormUrlEncoded) {
            // Forzar application/x-www-form-urlencoded (mantener compatibilidad)
            fetchOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            fetchOptions.body = new URLSearchParams(body).toString();
        } else if (typeof body === 'object' && body !== null) {
            // Enviar JSON por defecto para objetos
            fetchOptions.headers['Content-Type'] = 'application/json';
            fetchOptions.body = JSON.stringify(body);
        } else {
            // Cualquier otro caso (string), enviarlo tal cual y usar text/plain
            fetchOptions.headers['Content-Type'] = 'text/plain';
            fetchOptions.body = String(body);
        }

        const res = await fetch(url, fetchOptions);
        const text = await res.text();
        let payload = null;
        try { payload = text ? JSON.parse(text) : null; } catch (e) { payload = text; }

        if (!res.ok) {
            const err = new Error(typeof payload === 'string' ? payload : (payload?.message || `HTTP ${res.status}`));
            err.status = res.status;
            err.payload = payload;
            throw err;
        }
        return payload;
    };
    return postData;
};

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

