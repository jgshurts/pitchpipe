import React from "react";
import {ToggleSwitch} from "./ToggleSwitch.js";

export function PlaybackControls(props) {
    return (
        <div className={"playbackControls"}>
            <span className={"label"}>Auto-Play</span>
            <ToggleSwitch
                name={"Auto-Play"}
                isChecked={props.autoPlayIsOn}
                onChange={props.onChange}
            />
        </div>
    );
}