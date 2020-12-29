import './index.css';
import './ToggleSwitch.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import AppConfig from '../src/AppConfig.js';
import {Keyboard} from './Keyboard.js';
import {InstrumentSets, Instruments} from './InstrumentSelection.js'
import {PlaybackControls} from './PlaybackControls'
import * as Tone from "tone";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getNewState("Guitars");
        this.autoPlayStateChange = this.autoPlayStateChange.bind(this);
    }

    getNewState(instrumentSetName, instrumentName, autoPlayIsOn = false) {
        const appConfig = new AppConfig();
        const instrumentSetData = appConfig.getProductionInstrumentData();
        const sampleSets = appConfig.getProductionSampleSetData();
        let selectedInstrument = instrumentName;
        if(selectedInstrument == null) {
            selectedInstrument = instrumentSetData.get(instrumentSetName).defaultInstrument;
        }

        return {
            instrumentSets: Array.from(instrumentSetData.keys()),
            selectedInstrumentSet: instrumentSetName,
            selectedInstrument: selectedInstrument,
            instruments: instrumentSetData.get(instrumentSetName).instruments,
            sampleSets: sampleSets,
            autoPlayIsOn: autoPlayIsOn
        };
    }

    handleInstrumentClick(instrumentName) {
        this.setState(this.getNewState(this.state.selectedInstrumentSet, instrumentName, false));
    }

    handleInstrumentSetClick(instrumentSetName) {
        this.setState(this.getNewState(instrumentSetName, null, false));
    }

    autoPlayStateChange(newValue) {
        this.setState(this.getNewState(
            this.state.selectedInstrumentSet,
            this.state.selectedInstrument,
            newValue
        ));
        if(newValue) {
            this.startAutoPlay();
        } else {
            this.stopAutoPlay();
        }
    }

    /* TODO: refactor, move to separate utility class */
    async startAutoPlay() {

        const instrumentData = this.state.instruments.get(this.state.selectedInstrument);
        const sampleSet = this.state.sampleSets.get(instrumentData.sampleSet);
        const sampledNotes = sampleSet.sampledNotes;

        let samplesUrl = instrumentData.sampleSet;

        const baseUrl = "https://pitchpipe-samples.s3.amazonaws.com/";
        const fullBaseUrl = baseUrl + samplesUrl + "/";
        let sampleUrls = {}
        for(const note of sampledNotes) {
            sampleUrls[note] = note + ".mp3";
        }
        await Tone.start();
        const sampler = new Tone.Sampler({
            urls: sampleUrls,
            release: 1,
            baseUrl: fullBaseUrl,
            volume: 6
        }).toDestination();

        Tone.loaded().then(() => {
            const beatsPerMinute = 60;
            sampler.context.resume().then(() => {
                const seq = new Tone.Sequence((time, note) => {
                    sampler.triggerAttackRelease(note, "1n", time);
                    // subdivisions are given as subarrays
                }, instrumentData.notes).start(0);

                // TODO: This is a hack. Sequence was playing at twice the BPM specified. Not sur why. This fixes for now.
                seq.playbackRate = .5;

                Tone.Transport.bpm.value = beatsPerMinute;
                Tone.Transport.start();

            });
        });
    }

    stopAutoPlay() {
        Tone.Transport.stop();
        Tone.Transport.cancel();
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
                <PlaybackControls
                    autoPlayIsOn={false}
                    onChange={(newValue) => this.autoPlayStateChange(newValue)}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
