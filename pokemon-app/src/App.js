import './App.css';
import {Component} from 'react';
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
          <Route path='/pokemon/:id' element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
      </>
    )
  };
}

//export default App;
