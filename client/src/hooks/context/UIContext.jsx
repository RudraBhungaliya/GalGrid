import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export function UIProvider({ children }){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const value = {
        loading,
        setLoading,
        error,
        setError,
    };

    return(
        <UIContext.Provider value = {value}>
            { children }
        </UIContext.Provider>
    );
}

export function useUI(){
    return useContext(UIContext);
}