import {  createContext,useState } from "react";

export const PropertyContext=createContext();

const PropertyContextProvider=({children})=>{
    const[propertyType,setPropertyType]=useState("");
    const [price,setPrice]=useState("");
    const[location,setLocation]=useState("");
    const [properties,setProperties]=useState([
        'ALL',
        'BUY',
        'RENT',
        'SALE',
        'PG',
        'VILLA'
    ])
    return(
        <PropertyContext.Provider
        value={{properties,
            propertyType,
            setPropertyType,
            location,
            setLocation,
            price,setPrice
        }}>
            {children}
        </PropertyContext.Provider>
    )
}
export default PropertyContextProvider;