import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Tone from 'tone'

function Key(props) {
    return (
        <li
            className="key-white"
            onClick={props.onClick}
            style={{width: props.width}}
        >
            <p className={"key-note"}>
                {props.value}
            </p>
        </li>
    );
}

class Keyboard extends React.Component {


    async handleClick(note) {
        let samplesUrl = this.props.instrumentData.samplesUrl;
        let notes = this.props.instrumentData.notes;
        // use guitar samples for any instrument set up to use default samples
        if(samplesUrl === 'default') {
            samplesUrl = 'guitar';
            notes = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];
        }

        const baseUrl = "http://localhost:3000/samples/";
        const fullBaseUrl = baseUrl + samplesUrl + "/";
        let sampleUrls = {}
        for(const note of notes) {
            sampleUrls[note] = note + ".mp3";
        }
        await Tone.start();
        const sampler = new Tone.Sampler({
            urls: sampleUrls,
            release: 1,
            baseUrl: fullBaseUrl,
        }).toDestination();

        this.setState( {synth: sampler});

        Tone.loaded().then(() => {
            this.state.synth.context.resume().then(() => {
                this.state.synth.triggerAttackRelease(note, 4)
            });
        });
    }

    renderKey(i) {
        const keyWidth = 400/this.props.instrumentData.notes.length
        return (
            <Key
                key={i.toString()}
                value={this.props.instrumentData.notes[i]}
                onClick={() => this.handleClick(this.props.instrumentData.notes[i])}
                width={keyWidth}
            />
        );
    }

    render() {
        const keyElements = [];
        for(let i = 0; i < this.props.instrumentData.notes.length; i++) {
            keyElements.push(this.renderKey(i));
        }

        return (
                <ul className={"keyboard"}>
                    {keyElements}
                </ul>
        );
    }
}

function Instrument(props) {

    let cssClass = "instrument";
    if(props.isSelected) {
        cssClass = cssClass + '-selected'
    }
    return (
        <li
            className={cssClass}
            style={{width: props.width}}
            onClick={props.onClick}
        >
            {props.value}
        </li>
    );
}


class Instruments extends React.Component {

    renderInstrument(name) {

        return (
            <Instrument
                key={name}
                value={name}
                isSelected={name === this.props.selectedInstrument}
                onClick={() => this.props.onClick(name)}
            />
        );
    }

    render() {

        const instrumentElements = [];
        for(const name of this.props.instruments.keys()) {
            instrumentElements.push(this.renderInstrument(name));
        }

        return (
            <div className={"instruments"}>
                {instrumentElements}
            </div>
        )
    }

}

class App extends React.Component {

    constructor(props) {
        super(props);
        const instrumentData = new Map([
            ["Guitar", {samplesUrl: "guitar", notes: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']}],
            ["Mandolin", {samplesUrl: "mandolin", notes: ['G3', 'D4', 'A4', 'E5']}],
            ["Octave Mandolin", {samplesUrl: "default", notes: ['G2', 'D3', 'A3', 'E4']}]
        ]);

        this.state = {instruments: instrumentData, selectedInstrument: "Guitar"};
    }

    handleInstrumentClick(name) {
        this.setState({selectedInstrument: name});
    }

    render() {
        return (
            <div className={"container"}>
                <p className={"instrument-header"}>Select an Instrument</p>
                <p className={"keyboard-header"}>Press a key and tune away.</p>
                <Keyboard
                    instrument={this.state.selectedInstrument}
                    instrumentData={this.state.instruments.get(this.state.selectedInstrument)}
                />
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
