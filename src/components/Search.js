import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    filters: {
        float: 'left'
    },
    textInput: {
        marginLeft: '64px',
        marginBottom:'10px'
    }
}));

function Search( props ) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        alive: false,
        dead: false,
        unknown: false,
        female: false,
        male: false,
        search: ''
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleChangeInput = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const { alive, dead, unknown, female, male, search } = state;

    function setFilteredUrlParams () {
        let params =''
        let genderStatus=handleGenderInput()
        let livingStatus=handleLivingInput()

        if (state.search !== "") {
            params += '?name=' + state.search + (genderStatus !== '' ? ('&' + genderStatus) : '') + (livingStatus !== '' ? ('&' + livingStatus) : '') 
        }
        else if (genderStatus != "") {
            params += '?' + genderStatus + ( livingStatus != "" ? ('&' + livingStatus) : '' )
        }
        else if (livingStatus != "") {
            params += '?' +livingStatus
        }
        props.handleUrlParams(params)
    }
    function handleLivingInput () {
        if (state.alive == true)
            return 'status=alive'
        else if (state.dead == true)
            return 'status=dead'
        else if (state.unknown == true)
            return 'status=unknown'
        return ''
    }
    function handleGenderInput () {
        if (state.female == true)
            return 'gender=female'
        else if (state.male == true)
            return 'gender=male'
        return ''
    }
    return (
        <React.Fragment>
            <div className={classes.filters}>
                <h2>Filter Results</h2>
                <div>
                    <TextField className={classes.textInput} type="text" name="search" onChange={handleChangeInput} label="Name"/>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <FormLabel >Gender:</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={female} onChange={handleChange} name="female" />}
                                label="Female"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={male} onChange={handleChange} name="male" />}
                                label="Male"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <FormLabel>Status:</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={alive} onChange={handleChange} name="alive" />}
                                label="Alive"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={dead} onChange={handleChange} name="dead" />}
                                label="Dead"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={unknown} onChange={handleChange} name="unknown" />}
                                label="Unknown"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    onClick={setFilteredUrlParams}
                    startIcon={<FilterListIcon />}
                >
                    Filter
                </Button>
            </div>
        </React.Fragment>
    );
}

export default Search;