import React from 'react'
import WordItem from './WordItem';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


function WordList(props) {
    if (props.tiles.length===0){
        console.log("we here");
        return null;
    }
    return (
        // map is a for loop through properties
        props.tiles.map((tile)=>(
          <Grid item xs={6} sm={4} md={3}>
              <Paper> <WordItem key={tile.id} tile={tile} /> </Paper>
          </Grid>
        ))
    );
}

WordList.propTypes = {
    titles: PropTypes.array
}
export default WordList;
