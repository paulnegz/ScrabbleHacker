import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link,  } from 'react-router-dom';
import '../style/font.css';

// https://www.dictionary.com/browse/tea
function WordItem(props) {

    const classes = useStyles();
    var linkurl = "//www.dictionary.com/browse/".concat(props.tile.name) ;
    return (
        
        <Card className={classes.root}>
            <CardContent>
                <div className='title'>
                <Typography variant="h5" component="h2" className={classes.title}>
                    {props.tile.name}
                </Typography>
                </div>
                <Typography className={classes.pos} color="textSecondary">
                    {props.tile.figureOfSpeech}
                </Typography>
                <Typography variant="body2" component="p" className={classes.definition}>
                    {props.tile.definition}
                <br />
                </Typography>
                <Link style={linkStye} to={linkurl} target="_blank"> LEARN MORE </Link>
            </CardContent>
        </Card>
 
    )

}
const linkStye ={
    color: 'blue',
    textDecoration: 'none',
    fontSize: '8px',
    fontFamily: "'Comfortaa', cursive",

}
const useStyles = makeStyles({
    root: {
    //   minWidth: 265,
    //   maxWidth: 300,
      alignItems: 'left',
      textAlign: 'left',
      fontFamily: 'scab',

    },
    pos: {
      marginBottom: 1.5,
      fontSize: '0.58rem',
      color: 'blue',

    },
    title:{
        fontSize: '0.9rem',
        fontFamily: 'scab',
        textTransform: 'capitalize',
    },
    definition:{
        fontSize: '0.62rem',
    }
  });

export default WordItem;


