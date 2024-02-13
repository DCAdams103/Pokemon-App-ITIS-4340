import React, {useEffect, useState} from 'react';
import VerticalCarousel from './VerticalCarousel';
import {config} from 'react-spring';
import Carousel from 'react-elastic-carousel';
import './Home.css';

let slides = [
  {
    key: 0,
    content: "0"
  },
    {
      key: 1,
      content: "1"
    },
    {
      key: 2,
      content: "2"
    },
    {
      key: 3,
      content: "3"
    },
    {
      key: 4,
      content: "4"
    },
    {
      key: 5,
      content: "5"
    },
    {
      key: 6,
      content: "6"
    },
    {
      key: 7,
      content: "7"
    },
    {
      key: 8,
      content: "8"
    }
  ];

  let activeKey = 0;

  let itemArr = [];
  var up = false;
  var down = false;

function Home() {
    
  const [activeItems, setActiveItems] = useState(slides.slice(activeKey, activeKey + 5));
  const [moveDown, setMoveDown] = useState(false);
  const [moveUp, setMoveUp] = useState(false);
  

  const downAction = () => {
    if (activeKey < slides.length-3) {
      setMoveDown(true);
      down = true;
      // activeKey++;
      // setActiveItems(slides.slice(activeKey, activeKey + 4));
      
      // console.log(activeItems);
    }
  }

  const upAction = () => {
    if (activeKey > 0) {
      setMoveUp(true);
      up = true;
      // activeKey--;
      // setActiveItems(slides.slice(activeKey, activeKey + 4));
     
      // console.log(activeItems);
    }
  }

  const onEnd = () => {
    setMoveUp(false);
    setMoveDown(false);
  }

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

        <div className="carousel">
          <ul>
            {activeItems.map(item => <li className={moveDown ? "item-movedown" : moveUp ? "item-moveup" : "item"} key={item.key} onAnimationEnd={() => onEnd()}>{item.content}</li>)}
          </ul>
            
            <button onClick={() => {upAction()}}>Up</button>
            <button onClick={() => {downAction()}}>Down</button>
        </div>

        <footer className="App-footer">

        </footer>
      </div>

        
    </>
  );
}

export default Home;





