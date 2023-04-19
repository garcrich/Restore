import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";

export default function ProductCard({ product }: { product: Product }) {
  const { name, price, brand, pictureUrl, type } = product;
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
        <Button size="small">Add to cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
}