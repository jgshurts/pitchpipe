import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Tone from 'tone'

function Key(props) {
    return (
        <button className="key-white" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
        const toneSynth = new Tone.Synth().toDestination();
        this.state = {
            notes: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
            synth: toneSynth,
        };
    }

    handleClick(note) {
        const synth = this.state.synth;
        synth.triggerAttackRelease(note, "5s");
    }

    renderKey(i) {
        return (
            <Key
                value={this.state.notes[i]}
                onClick={() => this.handleClick(this.state.notes[i])}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderKey(0)}
                    {this.renderKey(1)}
                    {this.renderKey(2)}
                    {this.renderKey(3)}
                    {this.renderKey(4)}
                    {this.renderKey(5)}
`                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Keyboard />,
    document.getElementById('root')
);
