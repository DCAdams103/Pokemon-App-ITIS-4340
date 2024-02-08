import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import VerticalCarousel from './VerticalCarousel';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokemon from './Pokemon';
import Home from './Home';

export default class App extends Component {

  render() {
    return ( 
      <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokemon' element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
      </>
    )
  };
}

//export default App;
