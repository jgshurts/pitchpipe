import React from "react";

export class InstrumentSets extends React.Component {

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

export class Instruments extends React.Component {

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
