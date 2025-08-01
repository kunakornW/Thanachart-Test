import React from 'react'
import iProductResponse from "./response/productResponse";


interface iCartComponent {
    products: Array<iProductResponse>,
    setProducts: React.Dispatch<React.SetStateAction<Array<iProductResponse>>>,
    setCheckOut: React.Dispatch<React.SetStateAction<boolean>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

export default iCartComponent;