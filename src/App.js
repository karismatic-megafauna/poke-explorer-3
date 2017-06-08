import React, { Component } from 'react';
import { Card, Input } from 'antd';
import pokemon from 'pokemon-metadata';
import PropTypes from 'prop-types';

import './App.css';
import data from './data.json';

const Search = Input.Search;

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

PokemonCard.propTypes = {
  metadata: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    sprites: PropTypes.shape({
      front_default: PropTypes.string
    })
  })
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {search: ''};
  }

  onTextChange = (event) => {
    this.setState({search: event.target.value});
  }

  render() {
    return (
      <div>
        <div>
          <Search
            placeholder="input pokemon search text"
            style={{ width: 200 }}
            onSearch={value => console.log(value)}
            onChange={this.onTextChange}
            />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
          {data.pokemon_species
            .filter((species) => species.name.includes(this.state.search))
            .map((species) => <PokemonCard key={species.name} metadata={pokemon[species.name]}/>)
          }
        </div>
      </div>
    );
  }
}

export default App;
