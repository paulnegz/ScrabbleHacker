import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  
function AddWord(props) {
    const [word, setTitle] = useState('');
    var onChange = (e)=>{
        var word = e.target.value.split(/\s/).join('');
        setTitle(word);
    }
    var Submit = (e) =>{
        e.preventDefault();
        props.changeLoad();
        props.addTiles(word);
        setTitle('');
    }
    const classes = useStyles();

    return (
        <div style={styleDiv}>
            {/* <form onSubmit={Submit} style={{display: 'flex', alignItems: 'center',  margin: '4px 2px',}}> */}
            <form className={classes.root } noValidate autoComplete="off" onSubmit={Submit} style={{display: 'flex', alignItems: 'center',  margin: '4px 2px',}}>
                <TextField 
                    id="outlined-basic" 
                    label="min. 5 letters.."
                    type="text" 
                    name="word" 
                    value={word.toLowerCase()}
                    onChange={onChange} />
                <input style={{marginTop: '24px',}}
                    type="submit"                    
                    value="SUBMIT" >
                </input>
            </form>
        </div>
    )
}
const styleDiv = {
    margin: '10px 2px',   
}
AddWord.propTypes = {
    addTiles: PropTypes.func
}
export default AddWord;


