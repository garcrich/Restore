import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

export default function ProductCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const { name, price, brand, pictureUrl, type } = product;

  function handleAddItem(productId: number ) {
    setLoading(true);
    agent.Basket.addItem(productId)
    .then(() => console.log('Item added to basket'))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }

  return (
    <Card>
      <CardHeader 
        avatar={
          <Avatar sx={{bgcolor: 'secondary.main'}}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={name}
        titleTypographyProps={{sx: {fontWeight: 'bold', color: 'primary.main'}}}
        />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
        image={pictureUrl}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5" component="div">
          ${(price / 100).toFixed(2)} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {brand} / {type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton 
          loading={loading}
          onClick={() => handleAddItem(product?.id)}
          size="small"
        >
            Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  );
}