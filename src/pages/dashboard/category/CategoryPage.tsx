import React, {Fragment} from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from "hooks/app";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Category} from "models/Category";
import {deleteCategory} from "store/slice/category/actions/DeleteCategory";
import {useDashboardContext} from "components/template/dasbboard/DashboardContext";
import {useNavigate} from "react-router-dom";
import SectionCaption from "components/ui/caption/SectionCaption";


const DashboardCategoryPage: React.FC<{}> = () => {

    const {categoryList} = useAppSelector(state => state.category);
    const {setNotification} = useDashboardContext();
    const navigate = useNavigate();
    let dispatch = useAppDispatch();

    const handleDelete = (category: Category) => {
        dispatch(deleteCategory(category))
            .then(() => {
                setNotification("Категорія успішно видалена")
            })
    }


    return (
        <Fragment>
            <SectionCaption caption="Категорії аукціонів"/>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Stack
                        spacing={4}
                        alignItems="center"
                        direction="row"
                        useFlexGap
                        flexWrap="wrap"
                    >

                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{width: "200px"}}>ID</TableCell>
                                        <TableCell>Назва категорії</TableCell>
                                        <TableCell style={{width: "200px"}}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categoryList.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row._id}
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                                    <Button onClick={() => {
                                                        navigate(`/dashboard/category/${row._id}/edit`)
                                                    }}>
                                                        <EditIcon/>
                                                    </Button>
                                                    <Button onClick={() => handleDelete(row)}><DeleteIcon/></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default DashboardCategoryPage;
