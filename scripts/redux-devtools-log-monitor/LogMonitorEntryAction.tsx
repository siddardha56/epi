import React, { Component } from 'react';
import JSONTree from 'react-json-tree';

const styles = {
    actionBar: {
        paddingTop: 8,
        paddingBottom: 7,
        paddingLeft: 16
    },
    payload: {
        margin: 0,
        overflow: 'auto'
    }
};

export default class LogMonitorAction extends Component {
    renderPayload(payload) {

        let style = Object.assign({}, styles.payload);
        style.backgroundColor = this.props.theme.base00;

        return (
            <div style={style}>
                { Object.keys(payload).length > 0 ?
                <JSONTree theme={this.props.theme}
                          keyName={'action'}
                          data={payload}
                          expandRoot={this.props.expandActionRoot}/> : '' }
            </div>
        );
    }

    render() {
        let payload = Object.assign({}, this.props.action.payload);
        const {type} = this.props.action;

        let style = Object.assign({}, this.props.style);
        style.backgroundColor = this.props.theme.base02;
        style.color = this.props.theme.base06;

        return (
            <div style={style}>
                <div style={styles.actionBar}
                     onClick={this.props.onClick}>
                    {type}
                </div>
                {!this.props.collapsed ? this.renderPayload(payload) : ''}
            </div>
        );
    }
}
