import React from "react";
import {Link} from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AuctionLotCardView: React.FC<{}> = () => {

    return (
        <Card sx={{maxWidth: 345}}>
            <CardContent>
                <CardMedia
                    sx={{height: 140}}
                    image="/image/auction.png"
                    title="lots list"
                />
                <Typography gutterBottom variant="h5" component="div">
                    Список лотів
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Цей розділ дозволяє адміністратору керувати лотами.
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={Link}
                    to={`/dashboard/auction`}
                    size="small">
                    До розділу
                </Button>

            </CardActions>
        </Card>
    )
}

export default AuctionLotCardView;
