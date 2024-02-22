import React, {useCallback, useEffect, useState} from 'react';
import './Home.css';
import {read, utils} from 'xlsx'
import { TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import {Link} from 'react-router-dom';

const theme = createTheme({ 
  pallete: {
    primary: {
      main: pink[500]
    }, 
    secondary: {
      main: pink[500]
    } 
  }
});

let slides = [
  {
    key: -2,
    content: ''
  },
  {
    key: -1, 
    content: ''
  },
];

let activeKey = 0;

var up = false;
var down = false;

let pokeNames = [];

function Home() {

  // for(let i = 1; i <= 151; i++) {
  //   slides.push({key:i, content: ''})
  // }
    
  const [activeItems, setActiveItems] = useState(slides.slice(activeKey, activeKey + 5));
  const [moveDown, setMoveDown] = useState(false);
  const [moveUp, setMoveUp] = useState(false);
  const [sprites, setSprites] = useState([...slides])
  const [names, setNames] = useState([...pokeNames])
  const [query, setQuery] = useState('')

  useEffect(() => {
    (async () => {
      await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response=>response.json())
      .then(data => {

        for(let k in data.results) {
          pokeNames.push(data.results[k].name)
          slides.push({key:parseInt(k)+1, content: data.results[k].name})
        }

        setNames([...pokeNames])
        setActiveItems(slides.slice(activeKey, activeKey + 5));
      })
  
    })()
  }, [])

  const downAction = () => {
    if (activeKey < slides.length-3) {
      setMoveDown(true);
      down = true;
    }
  }

  const upAction = () => {
    if (activeKey > 0) {
      setMoveUp(true);
      up = true;
    }
  }

  const onEnd = () => {
    (async () => {
      await timeout(95);
      setMoveUp(false); 
      setMoveDown(false);
    })()
    // setMoveUp(false);
    // setMoveDown(false);
  }

  function timeout(delay) {
      return new Promise( res => setTimeout(res, delay) );
  }

  useEffect(() => {
    if (!moveUp && up) {
      if (activeKey > 0) {
        activeKey--;
        setActiveItems(slides.slice(activeKey, activeKey + 5));

      }
      up = false;
    } else if (!moveDown && down){
      if (activeKey < slides.length-3) {
        activeKey++;
        setActiveItems(slides.slice(activeKey, activeKey + 5));
        
      }
      down = false;
    } 
  }, [moveUp, moveDown])

  const changeHandler = (e) => {
    setQuery(e.target.value)
  }

  const filteredPokemon = slides.filter(name => {
    return name.content.includes(query)
  })

  useEffect(() => {
    activeKey = 0;
    if (query) {
      const newContent = [
        {key: -2, content: ''},
        {key: -1, content: ''},
        ...filteredPokemon,
        {key: -3, content: ''},
      ]
      setActiveItems(newContent.slice(activeKey, activeKey + 5));
      slides = newContent;
      console.log(slides);
    } else {
      slides = [
        {
          key: -2,
          content: ''
        },
        {
          key: -1, 
          content: ''
        },
      ];

      for (let i = 1; i <= pokeNames.length; i++) {
        slides.push({key:i, content: pokeNames[i-1]})
      }
      setActiveItems(slides.slice(activeKey, activeKey + 5));
    }
  }, [query])

  const handleKeyDown = useCallback((event) => {  
    if (event.key === 'ArrowUp') {
      upAction();
    } else if (event.key === 'ArrowDown') {
      downAction();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [handleKeyDown])

  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Kadwa:wght@400;700&display=swap" rel="stylesheet" />
      </head>

      <div className="App">
        <header className="App-header">
          <img className="logo" src="pokemon_logo.png" alt="Pokemon logo" />
          <h1 className="title">Generation 1 Pokedex</h1>
        </header>

        {sprites && names ? 
        <>
          <div className="carousel">
            <ul>
              {activeItems.map(item => 
                <li className={moveDown ? "item-movedown" : moveUp ? "item-moveup" : "item"} style={item.content == '' ? {opacity: 0} : {}} key={item.key} onAnimationStart={() => onEnd()}>
                  <div className='pokemon-container'>
                    <img className="sprite" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.key}.png`} alt={item.content} width='75' height='75' />
                    
                    {/* <h3 className='pokemon-name'>{pokeNames[item.key-1]}</h3> */}
                  </div>
                  <Link className="pokemon-name" to={`Pokemon/${item.key}`} state={{id: item.key}}>{pokeNames[item.key-1]}</Link>
                </li>
              )}
            </ul>

          </div>

          <button className="nav-button" onClick={() => {upAction()}}><img src='up-arrow.png' alt='up arrow' width='50' height='50' /></button>
          <button className="nav-button" onClick={() => {downAction()}}><img src='down-arrow.png' alt='up arrow' width='50' height='50' /></button>
          <br/>
          <TextField id="filled-basic" label="Search" variant="filled"  onChange={changeHandler} sx={{input: { background: "#ffb1b1", color: "white", }}} />
          </>
        :
        <div>
          Loading...
        </div>
        }
        

        <footer className="App-footer">

        </footer>
      </div>

        
    </>
  );
}

export default Home;





