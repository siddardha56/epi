"use strict";
const react_1 = require('react');
const react_json_tree_1 = require('react-json-tree');
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
class LogMonitorAction extends react_1.Component {
    renderPayload(payload) {
        return (react_1.default.createElement("div", {style: {
            styles: .payload,
            backgroundColor: this.props.theme.base00
        }}, Object.keys(payload).length > 0 ?
            react_1.default.createElement(react_json_tree_1.default, {theme: this.props.theme, keyName: 'action', data: payload, expandRoot: this.props.expandActionRoot}) : ''));
    }
    render() {
        const { type, payload } = this.props.action;
        return (react_1.default.createElement("div", {style: {
            backgroundColor: this.props.theme.base02,
            color: this.props.theme.base06,
            this: .props.style
        }}, react_1.default.createElement("div", {style: styles.actionBar, onClick: this.props.onClick}, type), !this.props.collapsed ? this.renderPayload(payload) : ''));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LogMonitorAction;
//# sourceMappingURL=LogMonitorEntryAction.js.map