import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

export default function ProductList({ products }: {products: Product[]}) {

  return (
    <Grid container spacing={4}>
    {products.map((product:Product) => (
      <Grid item xs={3} key={product.id}>
        <ProductCard product={product} />
      </Grid>
    ))}
  </Grid>
  )
}