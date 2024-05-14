import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import BackIcon from '@mui/icons-material/ArrowBack';

const SectionCaption: React.FC<{ caption: string }> = (props) => {

    let navigate = useNavigate();

    return (
        <Grid container spacing={2} style={{marginBottom: "16px"}}>
            <Grid item xs={6}>
                <Typography gutterBottom variant="h5" component="div">
                    {props.caption}
                </Typography>
            </Grid>
            <Grid alignItems="flex-end" textAlign="right" justifyContent="flex-end" item xs={6}>
                <Button onClick={() => {
                    navigate(-1)
                }} variant="outlined">
                    <ListItemIcon>
                        <BackIcon color="info"/>
                    </ListItemIcon>

                    Назад
                </Button>
            </Grid>
        </Grid>

    )
}

export default SectionCaption;
