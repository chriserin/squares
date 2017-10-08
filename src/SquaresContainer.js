
import React, { Component } from 'react';
import './SquaresContainer.css';
import join from 'lodash/join';
import shuffle from 'lodash/shuffle';

class Square extends Component {
  constructor(props) {
    super(props);

    this.state = {
      t_in: props.t_in,
      r_in: 0,
      b_in: 0,
      l_in: 0
    };
  }

  random() {
    return Math.floor(Math.random() * 200) + 50;
  }

  pointsString(points) {
    let shuffledPoints = [];

    if(this.props.shuffle) {
      shuffledPoints = shuffle(points);
    } else {
      shuffledPoints = points;
    }

    return join(shuffledPoints.map((x) => `${x[0]},${x[1]}`), ' ');
  }

  render() {
    const grey = this.random();

    const rectStyle = {
      fill: `rgb(${grey}, 177, 100)`,
      'stroke-width': 2,
      stroke: 'black',
    };

    const t_in = this.props.t_in;
    const r_in = this.props.r_in;
    const b_in = this.props.b_in;
    const l_in = this.props.l_in;

    const points = [
      [0, 0 + t_in],
      [0 + t_in, 0],
      [100 - r_in, 0],
      [100, 0 + r_in],
      [100, 100 - b_in],
      [100 - b_in, 100],
      [0 + l_in, 100],
      [0, 100 - l_in],
    ];

    return (
      <div className="square">
        <svg width="100" height="100">
          <polygon points={ this.pointsString(points) } height="100" style={ rectStyle } />
        </svg>
      </div>
    );
  }
}

class SquaresContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      t_in: 0,
      r_in: 0,
      b_in: 0,
      l_in: 0
    };

    this.shrinkCorner = this.shrinkCorner.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  shrinkCorner(corner) {
    this.setState((prevState, props) => ({ [`${corner}_in`]: prevState[`${corner}_in`] + 4 }))
  }

  shuffle() {
    this.setState((prevState, _) => ({shuffle: !prevState.shuffle}));
  }

  render() {
    const squares = Array(1000).fill(
      <Square
        t_in={ this.state.t_in }
        r_in={ this.state.r_in}
        b_in={ this.state.b_in }
        l_in={ this.state.l_in }
        shuffle={ this.state.shuffle }
      />
    );
    return (
      <div className="SquaresContainer">
        <button onClick={ () => this.shrinkCorner('t') } >
          Shrink T
        </button>
        <button onClick={ () => this.shrinkCorner('r') } >
          Shrink R
        </button>
        <button onClick={ () => this.shrinkCorner('b') } >
          Shrink B
        </button>
        <button onClick={ () => this.shrinkCorner('l') } >
          Shrink L
        </button>
        <button onClick={ this.shuffle } >
          Shuffle
        </button>
        <div>
          { squares }
        </div>
      </div>
    );
  }
}

export default SquaresContainer;
