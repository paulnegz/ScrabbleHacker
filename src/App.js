import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AddWord from './components/AddWord';
import WordList from './components/WordList';
import Spinner from './components/Spinner';
import Owlbot  from 'owlbot-js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import words from 'an-array-of-english-words';
import prefixfree from 'prefixfree';

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
    var filteredWordArray = words_array.filter(word => dictionary[word]);//foreach inside the filter. Searching through dictionary
    filteredWordArray=filteredWordArray.filter((item, index)=>filteredWordArray.indexOf(item)===index);//remove repetitions
    
    console.log("filtered",filteredWordArray);
    return filteredWordArray;
    
  }
  var defineWord= async(words_array)=>{
    var trial= [];
     words_array.map((word, index)=>{
      try{
        client.define(word)
        .then(result=>{
          var definiton = shorten(result.definitions[0].definition,70) ;
          const newTile = {
            name: result.word.toLowerCase(),
            figureOfSpeech: result.definitions[0].type.toLowerCase(),
            definition: definiton.toLowerCase(),
          };
          trial.push(newTile);
          setTiles((tiles)=>[...tiles, newTile]); //array of arrays but good state
          if (index===words_array.length-1)
          {
            //checking for last word.
            //end loader!!!
            console.log("defined: ",trial);
            setIsLoading(false);
          }
        })
         .catch(error=>{
          if (index===words_array.length-1)
          {
            //checking for last word.
            //end loader!!!
            console.log("defined: ",trial);
            setIsLoading(false);
          }
         })
      }catch(error){}

    })

    
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
    setIsLoading(false);
    setTiles([]);

  }

  var changeLoad = ()=>{
    setIsLoading(true);
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
                <AddWord  changeLoad={changeLoad} addTiles={addTiles} newGame={newGame}/>
                <div className={classes.root}>
                  {isLoading ? (
                        <Spinner />
                      ) : ( <span></span> )}  
                  
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
