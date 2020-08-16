import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AddWord from './components/AddWord';
import WordList from './components/WordList';
import Owlbot  from 'owlbot-js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import fs from 'browserify-fs'; 

function App() {
  var client = Owlbot('6c4449b0427c47238f67e64e9c108d679aecca1d'); //key for API dictionary call
  function shorten(text,max) { //shorten definition
    return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') : text
}
  const [tiles, setTiles] = useState([]); ///defining state
  
  // useEffect(() => {
  //   setTiles( (previousState, currentState)=>currentState );
  // });

  var addTiles = (title) =>{
    var words_array = [];
    var recursive=(randomWord, subWord )=>{
      var newWord = "";
      for (var i = 0; i < randomWord.length; i++)
      {
      newWord = subWord + randomWord.substr(i, 1);
        if (newWord.length>2){
        words_array.push(newWord);//add to array of permutated words	  
        }
      recursive(randomWord.substr(0, i) + randomWord.substr(i + 1), subWord + randomWord.substr(i, 1));
      }
    }
    recursive(title,"");//makes all permutations and stores in array
    checkDictionary(words_array);
  }
  var checkDictionary=(words_array)=>{
    var trial= [];
     words_array.map(word=>{
      try{
        client.define(word)
        .then(result=>{
          // console.log(result.word, result.definitions[0].type,);
          // console.log( result.definitions[0].type);
          // console.log( shorten(result.definitions[0].definition,70), '...' );
          var definiton = shorten(result.definitions[0].definition,70).concat( '...') ;
          const newTile = {
            name: result.word,
            figureOfSpeech: result.definitions[0].type,
            definition: definiton,
          };
          trial.push(newTile);
          // setTiles([...tiles, trial]); //array of arrays but good state
          // setTiles([...tiles, newTile]); //keeps updating state instead of adding, renders last option
         })
      }catch(error){}
    })
    // finalAdd(trial);
    setTiles(trial);
  }
  var finalAdd=(trial)=>{
    console.log(trial);
    // setTiles(trial);
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: '2px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  //clear state for new game 
  var newGame =()=>{
    setTiles([...[]]);
  }

  const classes = useStyles();   
  return (
    <Router> 
      <div className="App">
        <header className="App-header">
          <Route exact path="/" render = {props =>(
            <React.Fragment>
              <Header newGame={newGame}/>
              <div style={{borderLeft: '1.5px solid blue', borderRight: '1.5px solid blue',  }}>
                <AddWord  addTiles={addTiles}/>
                <div className={classes.root}>
                  <Grid alignItems="center" container spacing={1}>
                    <WordList tiles={tiles} />
                  </Grid>
                </div>
              </div>
            </React.Fragment>
          )} />
        </header>
      </div>
    </Router>
  );
}
export default App;
