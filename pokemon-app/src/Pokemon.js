import React, { useState, useEffect } from "react";
import axios from "axios";
import { OpenAI } from 'openai';
import './App.css';
import './Pokemon.css';

const Pokemon = () => {
    const [summary, setSummary] = useState("");

    useEffect(() => {
        const openai = new OpenAI({
            apiKey: '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',
            dangerouslyAllowBrowser: true,
        });

        const load = async () => {
            axios.get('https://pokeapi.co/api/v2/pokemon/venusaur')
                .then((response) => {
                    let prompt = `Give me a summary of the pokemon ${"Venusaur"} in 3 sentences.`;
                    openai.chat.completions.create({
                        messages: [{ role: 'user', content: prompt }],
                        model: 'gpt-4',
                    }).then((result) => {
                        setSummary(result.choices[0].message.content);
                    })
                })
        };
        load();
    }, []);

    return (
        <div>
            <div className="app-container h-screen">
                <div className="pokemon-header">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/1200px-International_Pokémon_logo.svg.png" alt="Pokédex logo" />
                    <h1>Pokémon Gen 1 Pokédex</h1>
                </div>

                <div className="main">
                    <div className="pokemon-main">
                        <img src="https://sg.portal-pokemon.com/play/resources/pokedex/img/pm/3bfcc4360c44f37815dc1e59f75818935cbfc41b.png" alt="Pokemon Img" />
                        <h2>Venusaur</h2>
                        <p>#0003</p>
                    </div>

                    <div className="pokemon-info">
                        <p>{summary}</p>

                        <div className="stats">
                            <div className="weak-against">
                                <h3>Weak Against</h3>

                                <div>
                                    <p>Fire</p>
                                    <p>Fire</p>
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

                <div className="pokemon-footer"></div>
            </div>
        </div>
    );
};

export default Pokemon;