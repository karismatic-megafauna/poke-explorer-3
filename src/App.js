import React, { Component } from 'react';
import { Card } from 'antd';
import pokemon from 'pokemon-metadata';

import logo from './logo.svg';
import './App.css';
import data from './data.json';

const squirtle = pokemon.squirtle;

class App extends Component {
  render() {
    return (
      <div>
        {data.pokemon_species.map((species) => {
          // Let's turn this into our own react component!
          const metadata = pokemon[species.name];
          return (
            <Card title={metadata.name} extra={metadata.id} style={{ width: 300 }}>
              <img src={metadata.sprites.front_default}></img>
            </Card>
          )
        })}
      </div>
    );
  }
}

export default App;
