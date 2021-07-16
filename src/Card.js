import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            backgroundColor: 'bisque',
            height: '935px',
            display:'flow-root'
        },
        root: {
            maxWidth: 400,
            marginLeft: '700px',
            marginTop: '50px'
        },
        media: {
            height: 0,
            paddingTop: '76.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
        episode: {
            textAlign: 'left'
        },
        titles:{
            fontSize:'20px'
        },
        values:{
            fontSize:'18px',
            marginLeft:'4px'
        },
        showTitle:{
            marginLeft: '230px'
        }
    }),
);

function CardComp({ image, name, gender, type, status, location,episode }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [episodes, setEpisodes] = useState([]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        let episodesStr = ''
        for (let i = 0; i < 5; i++) {
            episodesStr += episode[i].substring(episode[i].toString().lastIndexOf('/') + 1) + ','
        }
        episodesStr = episodesStr.substring(0, episodesStr.toString().lastIndexOf(','))
        fetch('https://rickandmortyapi.com/api/episode/' + episodesStr)
            .then((response) => response.json())
            .then(function (episodeData) {
                console.log(episodeData)
                setEpisodes(episodeData)
            });

    }, []);
    return (
        <React.Fragment>
            <div className={classes.container}>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {name.charAt(0)}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title="Character Name:"
                        subheader={name}
                    />
                    <CardMedia
                        className={classes.media}
                        image={image}
                    />
                    <CardContent className={classes.episode}>
                        <div>
                            <Typography variant="body2" color="textPrimary" component="span" className={classes.titles}>
                                Gender:
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="span" className={classes.values}>
                                {gender}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body2" color="textPrimary" component="span"  className={classes.titles}>
                                Status:
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="span" className={classes.values}>
                                {status}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body2" color="textPrimary" component="span"  className={classes.titles}>
                                Type:
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="span" className={classes.values}>
                                {type != '' ? type : '-'}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body2" color="textPrimary" component="span"  className={classes.titles}>
                                Location:
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="span" className={classes.values}>
                                {location.name}
                            </Typography>
                        </div>

                    </CardContent>
                    <CardActions disableSpacing>
                            <span className={classes.showTitle}>Show Episodes</span>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon ></ExpandMoreIcon>
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph><h3>Episodes</h3></Typography>
                            {episodes.map((episode) => (
                                <Typography paragraph className="episode">
                                    {episode.name}
                                </Typography>

                            ))}
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        </React.Fragment>
    );
}

export default CardComp;