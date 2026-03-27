/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthPrivider';
const API_URL = '/GestorGastos';  //url   http://localhost:8080


export const useData=(endpoint)=>{
    const [data,setData]= useState(null)
    const [trigger,setTrigger]= useState(0);
    const {user} = useContext(AuthContext);
    const userID= user?.idUsuario || user?.id || 1 ;

    //console.log('🔍 useData:', endpoint, 'userId:', userID, 'user:', user); 


    useEffect(() => {
        //console.log('⚡ useEffect ejecutado:', endpoint, userID);
        if(endpoint && userID){
            const URL = `${API_URL}/${endpoint}?idUsuario=${userID}`
           // console.log('🚀 Fetch URL:', URL);
            fetch(URL)
                .then(res => {
                    console.log('📡 Response status:', res.status, res.ok);
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then(recibidos => {setData(recibidos)})
                .catch(error =>{
                    console.error('❌ Fetch error:', error);
                    setData([]); 
                })
        }
       
    }, [endpoint,trigger,userID])

    const refetch = () => setTrigger(prev => prev + 1);//actualizar el fetch mostar nuevos registros
    return {data,refetch};
};
// usePost retrocompatible: detecta FormData, objeto JS o URLSearchParams
export const useApi = () => {

    const request = async (endpoint, body, options = {}) => {
        // options: { forceFormUrlEncoded: boolean, includeCredentials: boolean }
        const url = `${API_URL}/${endpoint}`;
        let fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            credentials: options.includeCredentials ? 'include' : undefined,
            body: JSON.stringify(body)
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
    return { post: request };
};

export const useDelete=()=>{
    const {user}= useContext(AuthContext);
    const userID = user?.idUsuario || user?.id || 1;

    const deleteData = async (endpoint, idTransaccion) => {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            // body: JSON.stringify({
            //     accion: 'eliminar',
            //     idTransaccion,
            //     idUsuario:userID
            // })
        })
        if(!response.ok){
            throw new Error('Error al eliminar')
        }
        return response.text();
    }
    return deleteData
}

