import { useState, useEffect } from 'react';
import { mockData } from '../mock/dataMock';

const API_URL ='http://localhost:8080/GestorGastos'
export const useData=(endpoint)=>{
    const [data,setData]= useState(mockData)

    useEffect(() => {
        if(endpoint){
            fetch(`${API_URL}/${endpoint}`)
                .then(res=>res.json())
                .then(setData);
        }
    }, [endpoint])
    return data;
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