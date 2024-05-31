import React, {ReactNode} from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export interface CategorySectionCardProps {
    caption: string;
    icon: ReactNode;
    onClick: () => void;
}

const CategorySectionCard: React.FC<CategorySectionCardProps> = (props) => {

    return (
        <Card onClick={props.onClick} sx={{display: 'flex', cursor: "pointer"}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography component="div" variant="h5">
                        {props.caption}
                    </Typography>
                </CardContent>

            </Box>
            <Box sx={{width: 100}} display="flex" alignItems="center" justifyContent="center">
                {props.icon}

            </Box>
        </Card>
    )
}

export default CategorySectionCard;
