import React, { useState, useEffect } from "react";
import axios from "axios";
import { OpenAI } from 'openai';
import './App.css';
import './Pokemon.css';
import { useLocation, useParams } from "react-router-dom";

const returnType = (type) => {

    if (type === "fire") {
        return ( 
            <p className="type-fire">Fire</p>
        )
    } else if (type === "grass") {
        return (
            <p className="type-grass">Grass</p>
        )
    } else if (type === "poison") {
        return (
            <p className='type-poison'>Poison</p>
        )   
    } else if (type == 'flying') {
        return (
            <p className='type-flying'>Flying</p>
        )
    } else if (type === "water") {
        return (
            <p className="type-water">Water</p>
        )
    } else if (type === "bug") {    
        return (
            <p className="type-bug">Bug</p>
        )
    } else if (type === "electric") {
        return (
            <p className="type-electric">Electric</p>
        )
    } else if (type === "ground") {
        return (
            <p className="type-ground">Ground</p>
        )
    } else if (type === "fairy") {
        return (
            <p className="type-fairy">Fairy</p>
        )
    } else if (type === "fighting") {
        return (
            <p className="type-fighting">Fighting</p>
        )
    } else if (type === "psychic") {
        return (
            <p className="type-psychic">Psychic</p>
        )
    } else if (type === "rock") {
        return (
            <p className="type-rock">Rock</p>
        )
    } else if (type === "ice") {
        return (
            <p className="type-ice">Ice</p>
        )
    } 
    else if(type === "normal") {
        return (
            <p className='type-normal'>Normal</p>
        )
    }
    
}

const createNumber = (id) => {
    let result = "#"
    for(let i = 0; i < 4 - id.length; i++) {
        result = result.concat("0");
    }

    result = result.concat(id);

    return result;

}

const showWeaknesses = (weaknesses) => {
    console.log("show weaknesses", weaknesses)
    weaknesses.map((weakness, index) => {
        console.log(weakness)
        return (returnType(weakness))
    })
}

const Pokemon = () => {
    const [summary, setSummary] = useState("");
    const [types, setTypes] = useState([]);
    const [name, setName] = useState('')
    const [weakAgainst, setWeakAgainst] = useState([]);
    let { id } = useParams();
    
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
          await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
          .then(response=>response.json())
          .then(data => {
            let description = data.flavor_text_entries[0].flavor_text;
            setSummary(description);
          })
        })()
    }, [])

    useEffect(() => {
        (async () => {
          await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then(response=>response.json())
          .then(data => {
            let types = [];
            for (let i = 0; i < data.types.length; i++) {
                types.push(data.types[i].type.name)
            }
            setTypes([...types]);

            setName(data.name);

          })
        })()
        
    }, [])

    useEffect(() => {
        let weakAgainstTemp = [];
        for(let i = 0; i < types.length; i++) {
            (async () => {
                await fetch(`https://pokeapi.co/api/v2/type/${types[i]}`)
                .then(response=>response.json())
                .then(data => {
                  for (let i = 0; i < data.damage_relations.double_damage_from.length; i++) {
                    weakAgainstTemp.push(data.damage_relations.double_damage_from[i].name);
                  }

                  console.log(weakAgainstTemp)
                  setWeakAgainst([...weakAgainstTemp]);

                })
              })()
        }
        
    }, [types])

    return (
    <>
        <header className="App-header">
          <img className="logo" src="/pokemon_logo.png" alt="Pokemon logo" />
          <h1 className="title">Generation 1 Pokedex</h1>
        </header>
        <div>
            <div className="app-container h-screen">

            <Link to="/home" className="back-button">
                <div>
                    <img src="./backButton.JPG" alt="Back" className="back-icon" />
                </div>
            </Link>  
                

                <div className="main">


                    <div className="pokemon-main">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="Pokemon Img" />
                        <h2 className='pokemon-name'>{name}</h2>
                        <p>{createNumber(id)}</p>
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
                                    {weakAgainst.map((weakness, index) =>
                                        returnType(weakness)
                                    )}
                                    
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