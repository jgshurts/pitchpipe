import React from "react";
import * as Tone from "tone";

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

export class Keyboard extends React.Component {

    async handleClick(note) {
        let samplesUrl = this.props.instrumentData.sampleSet;

        const baseUrl = "https://pitchpipe-samples.s3.amazonaws.com/";
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
            volume: 11
        }).toDestination();

        this.setState( {synth: sampler});

        Tone.loaded().then(() => {
            this.state.synth.context.resume().then(() => {
                this.state.synth.triggerAttackRelease(note, 3.4)
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
