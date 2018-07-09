var declareWinner = true;
import bulletTrain from "bullet-train-client"; //Add this line if you're using bulletTrain via npm

import React from 'react'
function Square(props) {
    const {shape1, shape1Color, shape2Color, squareWidth, squareHeight} = props;
    return (
        <button
            className="square"
            onClick={props.onClick}
            style={squareWidth && squareHeight ? {width: squareWidth, height: squareHeight} : {}}
        >
            <span style={{color: props.value === shape1 ? shape1Color : shape2Color}}>{props.value}</span>
        </button>
    );
}

function calculateWinner(squares) {
    if (!declareWinner) return null;
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            shape1Color: 'black',
            shape2Color: 'black'
        };
    }

    handleClick(i) {
        if (!this.state.selected) return;
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? this.state.shape1 : this.state.shape2;
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    componentDidMount() {
        bulletTrain.init({
            environmentID:"2KqnqeE5HCfCDV9xaZEdg4",
            onChange: (oldFlags,params)=>{ //Occurs whenever flags are changed
                declareWinner = bulletTrain.hasFeature("declare-winner");
                this.setState({
                    selected: !bulletTrain.hasFeature("select-who-goes-first"),
                    shape1: bulletTrain.getValue("shape-1"),
                    shape2: bulletTrain.getValue("shape-2"),
                    shape1Color: bulletTrain.getValue("shape-1-color"),
                    shape2Color: bulletTrain.getValue("shape-2-color"),
                    squareWidth: parseInt(bulletTrain.getValue("square-width")),
                    squareHeight: parseInt(bulletTrain.getValue("square-height"))
                });
            }
        });
    }

    renderSquare(i) {
        return (
            <Square
                {...this.state}
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = (
                <div>Next player:
                    <span style={{color: this.state.xIsNext ? this.state.shape1Color : this.state.shape2Color}}>
                        {(this.state.xIsNext ? this.state.shape1 : this.state.shape2)}
                    </span>
                </div>
            );
        }

        return (
            <div>
                {!this.state.selected ? (
                    <div>
                        Who goes first?
                        <button onClick={() => this.setState({selected: true})}>{this.state.shape1}</button>
                        <button onClick={() => this.setState({selected: true, xIsNext: false})}>{this.state.shape2}</button>
                    </div>
                ) : (
                    <div className="status">{status}</div>
                )}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default class extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}