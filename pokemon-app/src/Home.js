import React, {useEffect, useState} from 'react';
import './Home.css';
import {read, utils} from 'xlsx'

let slides = [
  
];

let activeKey = 0;

var up = false;
var down = false;

let pokeNames = [];

function Home() {

  for(let i = 1; i <= 151; i++) {
    slides.push({key:i, content: ''})
  }
    
  const [activeItems, setActiveItems] = useState(slides.slice(activeKey, activeKey + 5));
  const [moveDown, setMoveDown] = useState(false);
  const [moveUp, setMoveUp] = useState(false);
  const [sprites, setSprites] = useState([...slides])
  const [names, setNames] = useState([...pokeNames])

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
    setMoveUp(false);
    setMoveDown(false);
  }

  useEffect(() => {
    (async () => {
      await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response=>response.json())
      .then(data => {
        for(let k in data.results) {
          pokeNames.push(data.results[k].name)
        }
        setNames([...pokeNames])
      })
  
    })()
  })

  useEffect(() => {
    if (!moveUp && up) {
      console.log('up');
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
        <div className="carousel">
          <ul>
            {activeItems.map(item => 
              <li className={moveDown ? "item-movedown" : moveUp ? "item-moveup" : "item"} key={item.key} onAnimationEnd={() => onEnd()}>
                <div>
                  <img className="sprite" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.key}.png`} alt={item.content} width='75' height='75' />
                  <h3 className='pokemon-name'>{pokeNames[item.key-1]}</h3>
                </div>
              </li>
            )}
          </ul>
            
            <button onClick={() => {upAction()}}>Up</button>
            <button onClick={() => {downAction()}}>Down</button>
        </div>
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





