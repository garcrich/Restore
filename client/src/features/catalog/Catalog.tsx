import { Button } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";



export default function Catalog() {

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
    .then(res => res.json())
    .then(data => {
      setProducts(data)
    })
  }, [])

  function addProduct() {
    setProducts(prevState => {
      const product = {
        id: prevState.length + 101,
        name: 'product ' + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        brand: 'some brand',
        description: 'seems like a good product',
        pictureUrl: 'https://picsum.photos/200/300'
      }
      return [...prevState, product]
    })
  }

  return (
    <>
      <ProductList products={products} />
      <Button variant="contained" onClick={addProduct}>Add product</Button>
    </>
  )
}