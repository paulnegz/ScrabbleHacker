import React, { useState,  } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AddWord from './components/AddWord';
import WordList from './components/WordList';
import Owlbot  from 'owlbot-js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import words from 'an-array-of-english-words';

//daddy
const dictionary = words.reduce((dict, word) => (Object.assign(dict, { [word]: {} })), {});//create an object of dictionary bigO(1)

function App() {
  var client = Owlbot('6c4449b0427c47238f67e64e9c108d679aecca1d'); //key for API dictionary call
  function shorten(text,max) { //shorten definition
    if (text.length>max){
      return (text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') : text).concat( '...');
    }
    return (text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') : text);
}
  const [tiles, setTiles] = useState([  ]); ///defining state
  const [isLoading, setIsLoading] = useState(false);

  var addTiles = async (title) =>{
    var filteredWordArray=await createPermutations(title);
    defineWord(filteredWordArray);
    
  }
  var createPermutations = async(title)=>{
    var words_array = [];
    var recursive=(randomWord, subWord )=>{
      var newWord = "";
      for (var i = 0; i < randomWord.length; i++)
      {
      newWord = subWord + randomWord.substr(i, 1);
        if (newWord.length>2){//only words longer than 2 letters allowed!!
        words_array.push(newWord);//add to array of permutated words	  
        }
      recursive(randomWord.substr(0, i) + randomWord.substr(i + 1), subWord + randomWord.substr(i, 1));
      }
    }
    recursive(title,"");//makes all permutations and stores in array
    // console.log(words_array);
    //checking the dictionary object
    var filteredWordArray = words_array.filter(word => dictionary[word]);//foreach inside the filter. Searching through dictionary object
    filteredWordArray=filteredWordArray.filter((item, index)=>filteredWordArray.indexOf(item)===index);//remove repetitions
    return filteredWordArray;
    
  }
  var defineWord= async(words_array)=>{
    var trial= [];
     words_array.map(word=>{
      try{
        client.define(word)
        .then(result=>{
          var definiton = shorten(result.definitions[0].definition,70).concat( '...') ;
          const newTile = {
            name: result.word,
            figureOfSpeech: result.definitions[0].type,
            definition: definiton,
          };
          trial.push(newTile);
          setTiles((tiles)=>[...tiles, newTile]); //array of arrays but good state
         })
         .catch(error=>{})
      }catch(error){}
    })
    // console.log(trial);
    
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
    setTiles([]);
    setTiles([]);
    setTiles([]);
  }
  //error message for less
  // var notLong=()=>{
  //   <h1>NOT ENOUGH</h1>
  //   setTiles([]);
  // }


  var changeLoad = async()=>{
    setIsLoading(!isLoading);
    console.log("HERE");
  }
  const classes = useStyles();   
  return (
    <Router> 
      
      <div className="App">
        <header className="App-header">
          <Route exact path="/" render = {props =>(
            <React.Fragment>
              <Header newGame={newGame}/>
              <div style={{Left: '1.5px solid blue', borderRight: '1.5px solid blue',  }}>
                <AddWord  addTiles={addTiles} changeLoad={changeLoad} />
                <div className={classes.root}>
                  <Grid alignItems="center" container spacing={1}>

                    {isLoading ? (
                      <div>Loading ...</div>
                    ) : (
                      <WordList tiles={tiles} />
                    )}  

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
