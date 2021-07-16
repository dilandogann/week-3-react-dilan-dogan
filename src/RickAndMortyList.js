import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Search from './search';
import Icon from '@material-ui/core/Icon';
import { Link, Route, Switch } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
    },
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#5eb53f',
        height: '100px'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: 'cornsilk'
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        paddingLeft: '340px',
        paddingTop: '35px',
    },
    title: {
        marginLeft: '580px',
        marginTop: '20px'
    },
    editIcon: {
        cursor: 'pointer'
    }
}));


function RickAndMortyList(props) {
    const [data, setData] = useState([]);
    const [url, setUrl] = useState('https://rickandmortyapi.com/api/character');
    const classes = useStyles();

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then(function (rickAndMortyData) {
                setData(rickAndMortyData.results)
            });
    }, [url]);

    const handleUrlChange = (url) => {
        setUrl('https://rickandmortyapi.com/api/character/' + url)
    }
    const setSelected = (selectedData) => {
        props.setSelectedItem(selectedData)
    }

    return (
        <React.Fragment>
            <div className="classes.root">
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                        <Typography className={classes.title} variant="h3" noWrap >
                            WELCOME TO RICK AND MORTY WORLD!
                        </Typography>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerContainer}>
                        <List>
                            <Search handleUrlParams={handleUrlChange}></Search>
                        </List>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <Toolbar />
                    <TableContainer component={Paper}>
                        <Table stickyHeader  className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Avatar</StyledTableCell>
                                    <StyledTableCell align="left">Name</StyledTableCell>
                                    <StyledTableCell align="left">Last Location</StyledTableCell>
                                    <StyledTableCell align="left">Gender</StyledTableCell>
                                    <StyledTableCell align="left">Status</StyledTableCell>
                                    <StyledTableCell align="left">Location</StyledTableCell>
                                    <StyledTableCell align="left">Type</StyledTableCell>
                                    <StyledTableCell align="left">Operations</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data ? data.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell align="left"><Avatar alt={row.name} sharp="true" src={row.image} className={classes.large} /></StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{row.location.name}</StyledTableCell>
                                        <StyledTableCell align="left">{row.gender}</StyledTableCell>
                                        <StyledTableCell align="left">{row.status}</StyledTableCell>
                                        <StyledTableCell align="left">{row.location.name}</StyledTableCell>
                                        <StyledTableCell align="left">{row.type === "" ? '-' : row.type}</StyledTableCell>
                                        <StyledTableCell align="left" onClick={() => setSelected(row)}><Link to="/detail"><Icon className={classes.editIcon}>edit</Icon> </Link></StyledTableCell>
                                    </StyledTableRow>

                                )) : 'No Result Found!'}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </main>
            </div>

        </React.Fragment>
    ); 
}
export default RickAndMortyList;
