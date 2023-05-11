import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/utils";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

export default function ProductCard({ product }: { product: Product }) {
  const {status} = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch();
  const { name,  brand, pictureUrl, type } = product;

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
          {currencyFormat(product.price)} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {brand} / {type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton 
          loading={status.includes('pendingAddItem' + product.id)}
          onClick={() => dispatch(addBasketItemAsync({productId: product?.id}))}
          size="small"
        >
            Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  );
}