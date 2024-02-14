import axios from "axios";
import { createContext } from "react";
export let ProductDetailsContext=createContext(null);

export function ProductDetailsProvider({children}){
    async function GetProductDetails(id){
        let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        return data?.data
    }
    return <ProductDetailsContext.Provider value={{GetProductDetails}}>
        {children}
    </ProductDetailsContext.Provider>
}
