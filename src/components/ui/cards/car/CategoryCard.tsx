import {Category} from "models/Category";
import React from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useAppDispatch} from "hooks/app";
import {setActiveCategory} from "store/slice/category/CategorySlice";
import {useTranslation} from "react-i18next";
import {Link as RouteLink} from "react-router-dom";


export interface CarBrandCardProps {
    item: Category;
}

//const socket = io('localhost:4001',{ transports: ["websocket"] });

const CategoryCard: React.FC<CarBrandCardProps> = (props) => {

    const {t} = useTranslation();

    //const {  } = useAppSelector((state) => state.category);

    const dispatch = useAppDispatch();

    function onSelectCategory() {

        //socket.emit("send_message", { "send_message": props.item });

        dispatch(setActiveCategory(props.item));
    }

    return (

        <Card sx={{width: 350, height: 300}}>
            <CardMedia
                sx={{height: 140}}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.item.description}
                </Typography>
            </CardContent>
            <CardActions>

                <Button
                    component={RouteLink}
                    to={`/category/${props.item._id}`}
                    onClick={onSelectCategory}
                    size="small"
                >
                    {t("category.card.view")}
                </Button>
            </CardActions>
        </Card>


    )
};

export default CategoryCard;
