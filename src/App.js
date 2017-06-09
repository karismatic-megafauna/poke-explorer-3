import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Card, Input } from 'antd';
import pokemon from 'pokemon-metadata';
import PropTypes from 'prop-types';

import './App.css';

const Search = Input.Search;

class PokemonCard extends Component {
  render() {
    const { name, id, sprites } = this.props.metadata;
    return (
      <Card title={name} extra={id} style={{ width: 200, margin: '10px' }}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <img src={sprites.front_default} alt={name} ></img>
          <Link to={`/${name}`}>More</Link>
        </div>
      </Card>
    )
  }
}

PokemonCard.propTypes = {
  metadata: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    sprites: PropTypes.shape({
      front_default: PropTypes.string
    })
  })
}

const Body = (props) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
      {props.filteredData
        .map((species) => <PokemonCard key={species.name} metadata={pokemon[species.name]}/>)
      }
    </div>
  )}

const Show = (props) => {
  const metadata = pokemon[props.match.url.replace('/', '')]
  return (
    <img src={metadata.sprites.front_default} alt={metadata.name} />
  )
}

  class App extends Component {
    constructor(props) {
      super(props);
      this.state = { search: '', data: [] };
    }

    componentWillMount() {
      fetch('https://pokeapi.co/api/v2/generation/1/').then((response) => {
        response.json().then((data) => {
          this.setState({data: data.pokemon_species});
        })
      })
    }

    onTextChange = (event) => {
      this.setState({search: event.target.value});
    }

    render() {
      const filteredData = this.state.data.filter((species) => species.name.includes(this.state.search));
      return (
        <Router>
          <div>
            <div>
              <Search
                placeholder="input pokemon search text"
                style={{ width: 200 }}
                onSearch={value => console.log(value)}
                onChange={this.onTextChange}
                />
            </div>
            <Route exact path='/' render={() => (
                <Body filteredData={filteredData} />
              )}/>
            <Route path='/:pokemonName' component={Show} />
            </div>
          </Router>
        );
      }
    }

    export default App;
