import React, {Fragment, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch} from "hooks/app";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useDashboardContext} from "components/template/dasbboard/DashboardContext";
import {useNavigate} from "react-router-dom";
import {User} from "models/User";
import {ServiceFactory} from "services/ServiceFactory";
import SectionCaption from "components/ui/caption/SectionCaption";


const DashboardUserPage: React.FC<{}> = () => {

    //const { userList } = useAppSelector(state => state.user);

    const [userList, setUserList] = useState<User[]>([]);

    const {setNotification} = useDashboardContext();

    const navigate = useNavigate();
    let dispatch = useAppDispatch();


    const handleDelete = (user: User) => {

        ServiceFactory
            .getUserService()
            .remove(user)
            .then(result => {
                setNotification("Запит успішно виконаний");
                fetchUserList();
            }).catch(error => {
            console.log(error);
        });
    }

    function fetchUserList() {
        ServiceFactory
            .getUserService()
            .getAll()
            .then(list => {
                setUserList(list)
            })
    }

    useEffect(() => {

        fetchUserList();

    }, []);

    return (
        <Fragment>
            <SectionCaption caption="Список учасників"/>
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
                                        <TableCell>І'мя</TableCell>
                                        <TableCell>Електронна адреса</TableCell>
                                        <TableCell>Роль</TableCell>
                                        <TableCell style={{width: "200px"}}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userList.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row._id}
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.role}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                                    <Button onClick={() => {
                                                        navigate(`/dashboard/user/${row._id}/edit`)
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

export default DashboardUserPage;
