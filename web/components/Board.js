import React from "react";
import Square from './Square';
export default class extends React.Component {
    render() {
        return (
            <div>
                <div className="board-row">
                    {
                        [0, 1, 2].map((i) => (
                            <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>
                        ))
                    }
                </div>
                <div className="board-row">
                    {
                        [3,4,5].map((i)=>(
                            <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>
                        ))
                    }
                </div>
                <div className="board-row">
                    {
                        [6,7,8].map((i)=>(
                            <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}