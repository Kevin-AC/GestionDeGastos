import { toast } from 'sonner'
export const confirmarEjecucion = ({
    message,
    actionLabel = "Eliminar",
    request,
    onSuccess,
    onError,
    onFinally
}) => {
    toast.warning(message, {
        duration: Infinity,
        action: {
            label: actionLabel,
            onClick: async () => {
                try {
                    const res = await request();
                    onSuccess?.(res);
                }
                catch (error) {
                    console.log(error)
                    toast.error("Error", {
                        description: error.message,
                        
                    });
                    onError?.(error);
                } finally {
                    onFinally?.();
                }
            },
        },
    });
};