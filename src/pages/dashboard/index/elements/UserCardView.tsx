import React from "react";
import {Link} from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const UserCardView: React.FC<{}> = () => {

    return (
        <Card sx={{maxWidth: 345}}>
            <CardContent>
                <CardMedia
                    sx={{height: 140}}
                    image="/image/user.png"
                    title="users list"
                />
                <Typography gutterBottom variant="h5" component="div">
                    Список користувачів
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Цей розділ дозволяє адміністратору керувати користувачами.
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={Link}
                    to={`/dashboard/user`}
                    size="small">
                    До розділу
                </Button>

            </CardActions>
        </Card>
    )
}

export default UserCardView;
