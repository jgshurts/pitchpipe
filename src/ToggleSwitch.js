import React, { Component } from 'react';

export class ToggleSwitch extends Component {

    render() {
        return (
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    className="toggle-switch-checkbox"
                    name={this.props.name}
                    id={this.props.name}
                    onChange={e => this.props.onChange(e.target.checked)}
                />
                <label className="toggle-switch-label" htmlFor={this.props.name}>
                    <span className="toggle-switch-inner" data-yes={"On"} data-no={"Off"} />
                    <span className="toggle-switch-switch" />
                </label>
            </div>
        );
    }
}

