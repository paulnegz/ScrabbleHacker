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
        setTitle(e.target.value);
    }
    var Submit = (e) =>{
        e.preventDefault();
        props.addTiles(word);
        setTitle('');
    }
    const classes = useStyles();

    return (
        <div style={styleDiv}>
            {/* <form onSubmit={Submit} style={{display: 'flex', alignItems: 'center',  margin: '4px 2px',}}> */}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={Submit} style={{display: 'flex', alignItems: 'center',  margin: '4px 2px',}}>
                <TextField 
                    id="outlined-basic" 
                    label="random letters"
                    type="text" 
                    name="word" 
                    value={word}
                    onChange={onChange} />
                <input style={{marginTop: '24px',border: '.6px solid blue',}}
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


