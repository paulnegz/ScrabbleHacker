import React from 'react';
import { Link,  } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/font.css';



function Header(props) {

    return (
        <header style={headerStyle}>
            {/* <hr style={{color: 'blue', marginTop: '7px', border: '1px solid blue'}} /> */}
            <h3 style={{fontFamily: 'scab',}}> PAUL's SCRABBLE HACK</h3>
            <hr style={{color: 'blue', margin: '5px 5px', border: '1px solid blue'}} />
            <input style={{fontFamily: "'Comfortaa', cursive",}}type="button" onClick={props.newGame} value="New Game"></input>
            <Link style={linkStye} to="//paulnegedu.com/" target="_blank"> BACK TO SITE </Link>
            
        </header>
    )
}

const headerStyle = {
    background: '#333',
    color: 'white',
    alignItems: 'center',
    padding: '5px',
}
const linkStye ={
    color: '#fff',
    textDecoration: 'none',
    fontSize: '13px',
    fontFamily: "'Comfortaa', cursive",

}

Header.propTypes = {
    newGame: PropTypes.func
}
export default Header

