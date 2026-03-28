/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthPrivider';
const API_URL = '/GestorGastos';  //url   http://localhost:8080


export const useData=(endpoint)=>{
    const [data,setData]= useState(null)
    const [trigger,setTrigger]= useState(0);
    const { user } = useContext(AuthContext);
    const userID = user?.idUsuario || user?.id || 1;


    useEffect(() => {
       
        if(endpoint && userID){
            const URL = `${API_URL}/${endpoint}?idUsuario=${userID}`
           
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

export const useApi = () => {
    const { user } = useContext(AuthContext);
    const userID = user?.idUsuario || user?.id || 1;

    const request = async (endpoint, body, options = {}) => {
        // options: { forceFormUrlEncoded: boolean, includeCredentials: boolean }
        const url = `${API_URL}/${endpoint}`;

        const enrichedBody = body instanceof FormData
            ? (() => { body.set('idUsuario', userID); return body; })()
            : { idUsuario: userID, ...body };


        let fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            credentials: options.includeCredentials ? 'include' : undefined,
        };

        // Si body es FormData (ej. new FormData()), dejar tal cual (no setear Content-Type)
        if (enrichedBody instanceof FormData) {
            fetchOptions.body = enrichedBody;
            // no setear headers Content-Type para que el navegador lo gestione
        } else if (options.forceFormUrlEncoded) {
            // Forzar application/x-www-form-urlencoded (mantener compatibilidad)
            console.log('enrichedBody:', enrichedBody);
            fetchOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            fetchOptions.body = new URLSearchParams(enrichedBody).toString();
        } else if (typeof enrichedBody === 'object' && enrichedBody !== null) {
            // Enviar JSON por defecto para objetos
            fetchOptions.headers['Content-Type'] = 'application/json';
            fetchOptions.body = JSON.stringify(enrichedBody);
        } else {
            // Cualquier otro caso (string), enviarlo tal cual y usar text/plain
            fetchOptions.headers['Content-Type'] = 'text/plain';
            fetchOptions.body = String(enrichedBody);
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


