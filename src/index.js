import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Tone from 'tone'

const AppConfig = require('../src/AppConfig.js')

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
        let samplesUrl = this.props.instrumentData.sampleSet;

        const baseUrl = "http://localhost:3000/samples/";
        const fullBaseUrl = baseUrl + samplesUrl + "/";
        let sampleUrls = {}
        for(const note of this.props.sampledNotes) {
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

class InstrumentSets extends React.Component {

    renderInstrumentSet(name) {

        return (
            <InstrumentSet
                key={name}
                value={name}
                isSelected={name === this.props.selectedInstrument}
                onClick={() => this.props.onClick(name)}
            />
        );
    }

    render() {

        const instrumentSetElements = [];
        for(const name of this.props.instrumentSets) {
            instrumentSetElements.push(this.renderInstrumentSet(name));
        }

        return (
            <div className={"instrumentSets"}>
                {instrumentSetElements}
            </div>
        )
    }
}

function InstrumentSet(props) {

    // TODO: make this DRY; extract superclass Selector that does layout and styling
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
        this.state = this.getNewState("Guitars");
    }

    getNewState(instrumentSetName, instrumentName) {
        const appConfig = new AppConfig();
        const instrumentSetData = appConfig.getProductionInstrumentData();
        const sampleSets = appConfig.getProductionSampleSetData();
        let selectedInstrument = instrumentName;
        if(selectedInstrument == null) {
            selectedInstrument = instrumentSetData.get(instrumentSetName).defaultInstrument;
        }

        return {
            instrumentSets: instrumentSetData.keys(),
            selectedInstrumentSet: instrumentSetName,
            selectedInstrument: selectedInstrument,
            instruments: instrumentSetData.get(instrumentSetName).instruments,
            sampleSets: sampleSets
        };
    }

    handleInstrumentClick(instrumentName) {
        this.setState(this.getNewState(this.state.selectedInstrumentSet, instrumentName));
    }

    handleInstrumentSetClick(instrumentSetName) {
        this.setState(this.getNewState(instrumentSetName, null));
    }


    render() {

        const instrumentData = this.state.instruments.get(this.state.selectedInstrument);
        const sampledNotes = this.state.sampleSets.get(instrumentData.sampleSet).sampledNotes;


        return (
            <div className={"container"}>
                <p className={"instrument-header"}>Select an Instrument</p>
                <p className={"keyboard-header"}>Press a key and tune away.</p>
                <Keyboard
                    instrument={this.state.selectedInstrument}
                    instrumentData={instrumentData}
                    sampledNotes={sampledNotes}
                />
                <InstrumentSets instrumentSets={this.state.instrumentSets}
                             selectedInstrument={this.state.selectedInstrumentSet}
                             onClick={(name) => this.handleInstrumentSetClick(name)}
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
