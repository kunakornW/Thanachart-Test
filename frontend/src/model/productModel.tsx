import React from 'react'
import iProductResponse from "./response/productResponse";

interface iProductComponent {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    products: Array<iProductResponse>,
    setProducts: React.Dispatch<React.SetStateAction<Array<iProductResponse>>>,
}

export default iProductComponent;