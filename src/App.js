import React, { Component } from 'react';
import { Card } from 'antd';
import pokemon from 'pokemon-metadata';

import './App.css';
import data from './data.json';

class PokemonCard extends Component {
  render() {
    return (
      <Card title={this.props.metadata.name} extra={this.props.metadata.id} style={{ width: 200, margin: '10px' }}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <img src={this.props.metadata.sprites.front_default} alt={this.props.metadata.name} ></img>
        </div>
      </Card>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <input></input>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
          {data.pokemon_species.map((species) =>
            <PokemonCard key={species.name} metadata={pokemon[species.name]}/>
          )}
        </div>
      </div>
    );
  }
}

export default App;
