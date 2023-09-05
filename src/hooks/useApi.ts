import { useEffect, useState } from "react";

export const useApi = (handler: any) => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
console.log(data);

    useEffect(() => {
        setLoading(true);
        handler()
            .then((result: any)=> {
                setData(result);
            })
            .catch((err: any)=>{
                setError(err);
            })
            .finally(()=>{
                setLoading(false)
            })
    }, [handler])


    return { data, setData, loading, error}    
}