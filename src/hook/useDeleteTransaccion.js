import { useApi } from "./useData"
import { toast } from 'sonner'
import { confirmarEjecucion } from "../logic/ConfirmarEjecucion";

export const useDeleteTransaccion = (refetch)=>{
    const {post} = useApi();

    const handleDelete=(idTransaccion,lista,label)=>{
        const item = lista?.find(t=>t.idTransaccion === idTransaccion);
        if(!item){
            toast.error(`No se encontró el ${label.toLowerCase()}`);
            return;
        }
        confirmarEjecucion({
            message: `¿Eliminar "${item.descripcion}"?`,
            request: () => post("TransaccionServlet", {
                accion: 'eliminar',
                idTransaccion: item.idTransaccion,
            }),
            onSuccess: () => {
                toast.success("Registro eliminado", {
                    description: `${label}: "${item.descripcion}"`,
                });
                refetch();
            }
        });
    }
    return { handleDelete };
}