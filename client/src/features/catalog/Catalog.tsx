import ProductList from "./ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Product } from "../../app/models/product";



export default function Catalog() {

  const products = useAppSelector(productSelectors.selectAll );
  const { productsLoaded, status } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded])


  if (status.includes('pending')) return <LoadingComponent message="Loading products..." />

  return (
    <>
      
      <ProductList products={products} />
    </>
  )
}