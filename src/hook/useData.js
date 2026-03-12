import { useState, useEffect } from 'react';
import { mockData } from '../mock/dataMock';


export const useData=()=>{
    const [data,setData]= useState(null)
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData(mockData)
    }, [])
    return data;
}