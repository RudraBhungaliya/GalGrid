import { useEffect, useState } from "react";
import { useUI } from "../context/UIContext.jsx";

export default function useFetchPhotos(){
    const [photos, setPhotos] = useState([]);
    const { setLoading, setError } = useUI();

    useEffect(() => {
        async function fetchPhotos(){
            try{
                setLoading(true);

                const res = await fetch("https://picsum.photos/v2/list?limit=30");

                if(!res.ok){
                    throw new Error("Failed to fetch photos");
                }

                setPhotos(await res.json());
            }
            catch(err){
                setError(err.message);
            }   
            finally{
                setLoading(false);
            }
        }
        fetchPhotos();
    }, []);

    return { photos };
}