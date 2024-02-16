import React, { useState, useEffect } from "react";
import axios from "axios";
import { OpenAI } from 'openai';
import './App.css';
import './Pokemon.css';

const returnType = (type) => {

    if (type === "fire") {
        return ( 
            <h3>Fire</h3>
        )
    } else if (type === "grass") {
        return (
            <p className="type-grass">Grass</p>
        )
    } else {
        return (
            <p>Normal</p>
        )
    
    }
    
}

const Pokemon = () => {
    const [summary, setSummary] = useState("");
    const [types, setTypes] = useState([]);

    // useEffect(() => {
    //     const openai = new OpenAI({
    //         apiKey: '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',
    //         dangerouslyAllowBrowser: true,
    //     });

    //     const load = async () => {
    //         axios.get('https://pokeapi.co/api/v2/pokemon/venusaur')
    //             .then((response) => {
    //                 let prompt = `Give me a summary of the pokemon ${"Venusaur"} in 3 sentences.`;
    //                 openai.chat.completions.create({
    //                     messages: [{ role: 'user', content: prompt }],
    //                     model: 'gpt-4',
    //                 }).then((result) => {
    //                     setSummary(result.choices[0].message.content);
    //                 })
    //             })
    //     };
    //     load();
    // }, []);

    useEffect(() => {
        (async () => {
          await fetch('https://pokeapi.co/api/v2/pokemon-species/3')
          .then(response=>response.json())
          .then(data => {
            let description = data.flavor_text_entries[0].flavor_text;
            setSummary(description);
          })
        })()
    }, [])

    useEffect(() => {
        (async () => {
          await fetch('https://pokeapi.co/api/v2/pokemon/3')
          .then(response=>response.json())
          .then(data => {
            let types = [];
            for (let i = 0; i < data.types.length; i++) {
                types.push(data.types[i].type.name)
            }
            setTypes([...types]);
          })
        })()
        
    }, [])

    return (
    <>
        <header className="App-header">
          <img className="logo" src="/pokemon_logo.png" alt="Pokemon logo" />
          <h1 className="title">Generation 1 Pokedex</h1>
        </header>
        <div>
            <div className="app-container h-screen">
                

                <div className="main">
                    <div className="pokemon-main">
                        <img src="https://sg.portal-pokemon.com/play/resources/pokedex/img/pm/3bfcc4360c44f37815dc1e59f75818935cbfc41b.png" alt="Pokemon Img" />
                        <h2>Venusaur</h2>
                        <p>#0003</p>
                        <div className="types">
                            {types.map((type, index) => 
                                returnType(type)
                            )}
                        </div>
                       
                    </div>

                    <div className="pokemon-info">
                        <p>{summary}</p>

                        <div className="stats">
                            <div className="weak-against">
                                <h3>Weak Against</h3>

                                <div>
                                    {returnType("fire")}
                                    {returnType("grass")}
                                    <p>Fire</p>
                                    <p>Fire</p>
                                </div>
                            </div>

                            <div className="stats-column">
                                <h3>Stats</h3>

                                <div>
                                    <div className="stat-1">
                                        <p>HP</p>

                                        <div className="bar">
                                            <div className="inner-bar"></div>
                                        </div>
                                    </div>

                                    <div className="stat-1">
                                        <p>HP</p>

                                        <div className="bar">
                                            <div className="inner-bar"></div>
                                        </div>
                                    </div>

                                    <div className="stat-1">
                                        <p>HP</p>

                                        <div className="bar">
                                            <div className="inner-bar"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <footer className="App-footer">

            </footer>
        </div>
    </>
    );
};

export default Pokemon;