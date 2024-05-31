import React from "react";
import {Link} from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CategoryCardView: React.FC<{}> = () => {

    return (
        <Card sx={{maxWidth: 345}}>
            <CardContent>
                <CardMedia
                    sx={{height: 140}}
                    image="/image/car.png"
                    title="green iguana"
                />
                <Typography gutterBottom variant="h5" component="div">
                    Категорії аукціонів
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Цей розділ дозволяє адміністратору додавати та змінювати категорії аукціонів.
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={Link}
                    to={`/dashboard/category`}
                    size="small">
                    До розділу
                </Button>

            </CardActions>
        </Card>
    )
}

export default CategoryCardView;
