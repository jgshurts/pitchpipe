import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Tone from 'tone'

function Key(props) {
    return (
        <button
            className="key-white"
            onClick={props.onClick}
            style={{width: props.width}}
        >
            {props.value}
        </button>
    );
}

class Keyboard extends React.Component {

    async handleClick(note) {
        await Tone.start();
        const sampler = new Tone.Sampler({
            urls: {
                "E2": "E2.mp3",
                "A2": "A2.mp3",
                "D3": "D3.mp3",
                "G3": "G3.mp3",
                "B3": "B3.mp3",
                "E4": "E4.mp3",
            },
            release: 1,
            baseUrl: "http://localhost:3000/samples/guitar/",
        }).toDestination();

        this.setState( {synth: sampler});

        Tone.loaded().then(() => {
            this.state.synth.context.resume().then(() => {
                this.state.synth.triggerAttackRelease(note, 4)
            });
        });
    }

    renderKey(i) {
        const keyWidth = 300/this.props.notes.length
        return (
            <Key
                key={i.toString()}
                value={this.props.notes[i]}
                onClick={() => this.handleClick(this.props.notes[i])}
                width={keyWidth}
            />
        );
    }

    render() {
        const keyElements = [];
        for(let i = 0; i < this.props.notes.length; i++) {
            keyElements.push(this.renderKey(i));
        }

        return (
                <div className={"keyboard"}>
                    {keyElements}
                </div>
        );
    }
}

function Instrument(props) {
    return (
        <button
            className="instrument"
            style={{width: props.width}}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}


class Instruments extends React.Component {

    renderInstrument(name) {
        const buttonWidth = 300/this.props.instruments.size

        return (
            <Instrument
                key={name}
                value={name}
                onClick={() => this.props.onClick(name)}
                width={buttonWidth}
            />
        );
    }

    render() {
        const instrumentButtons = [];
        for(const name of this.props.instruments.keys()) {
            instrumentButtons.push(this.renderInstrument(name));
        }

        return (
            <div className={"instruments"}>
                {instrumentButtons}
            </div>
        )
    }

}

class App extends React.Component {

    constructor(props) {
        super(props);

        const instrumentData = new Map([
            ["Guitar", ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']],
            ["Mandolin", ['G3', 'D4', 'A4', 'E5']],
            ["Octave Mandolin", ['G2', 'D3', 'A3', 'E4']]
        ]);

        this.state = {instruments: instrumentData, selectedInstrument: "Guitar"};
    }

    handleInstrumentClick(name) {
        this.setState({selectedInstrument: name});
    }

    render() {
        return (
            <div className={"container"}>
                <Keyboard notes={this.state.instruments.get(this.state.selectedInstrument)}/>
                <Instruments instruments={this.state.instruments}
                             selectedInstrument={this.state.selectedInstrument}
                             onClick={(name) => this.handleInstrumentClick(name)}
                />
            </div>
        );
    }

}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
