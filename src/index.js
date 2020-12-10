import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import AppConfig from '../src/AppConfig.js';
import {Keyboard, Key} from './Keyboard.js';

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
