import { createContext, useContext, useState } from 'react';
const CategoryContext = createContext();

export function CategoriaProvider({children}){
    const [categoriaId,setCategoriaId]=useState(1)
    return (
        <CategoryContext.Provider value={{ categoriaId, setCategoriaId }}>
            {children}
        </CategoryContext.Provider>
    );
    
}
// eslint-disable-next-line react-refresh/only-export-components
export const useCategory = () => useContext(CategoryContext);