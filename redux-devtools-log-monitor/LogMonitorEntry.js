"use strict";
const react_1 = require('react');
const react_json_tree_1 = require('react-json-tree');
const LogMonitorEntryAction_tsx_1 = require('./LogMonitorEntryAction.tsx');
const function_1 = require('react-pure-render/function');
const styles = {
    entry: {
        display: 'block',
        WebkitUserSelect: 'none'
    },
    tree: {
        paddingLeft: 0
    }
};
class LogMonitorEntry extends react_1.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = function_1.default;
        this.handleActionClick = this.handleActionClick.bind(this);
    }
    printState(state, error) {
        let errorText = error;
        if (!errorText) {
            try {
                return (react_1.default.createElement(react_json_tree_1.default, {theme: this.props.theme, keyName: 'state', data: this.props.select(state), previousData: this.props.select(this.props.previousState), expandRoot: this.props.expandStateRoot, style: styles.tree}));
            }
            catch (err) {
                errorText = 'Error selecting state.';
            }
        }
        return (react_1.default.createElement("div", {style: {
            color: this.props.theme.base08,
            paddingTop: 20,
            paddingLeft: 30,
            paddingRight: 30,
            paddingBottom: 35
        }}, errorText));
    }
    handleActionClick() {
        const { actionId, onActionClick } = this.props;
        if (actionId > 0) {
            onActionClick(actionId);
        }
    }
    render() {
        const { actionId, error, action, state, collapsed } = this.props;
        const styleEntry = {
            opacity: collapsed ? 0.5 : 1,
            cursor: (actionId > 0) ? 'pointer' : 'default'
        };
        return (react_1.default.createElement("div", {style: {
            textDecoration: collapsed ? 'line-through' : 'none',
            color: this.props.theme.base06
        }}, react_1.default.createElement(LogMonitorEntryAction_tsx_1.default, {theme: this.props.theme, collapsed: collapsed, action: action, expandActionRoot: this.props.expandActionRoot, onClick: this.handleActionClick, style: {}}), "styles.entry, ...styleEntry}}/>", !collapsed &&
            react_1.default.createElement("div", null, this.printState(state, error))));
    }
}
LogMonitorEntry.propTypes = {
    state: react_1.PropTypes.object.isRequired,
    action: react_1.PropTypes.object.isRequired,
    actionId: react_1.PropTypes.number.isRequired,
    select: react_1.PropTypes.func.isRequired,
    error: react_1.PropTypes.string,
    onActionClick: react_1.PropTypes.func.isRequired,
    collapsed: react_1.PropTypes.bool,
    expandActionRoot: react_1.PropTypes.bool,
    expandStateRoot: react_1.PropTypes.bool
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LogMonitorEntry;
//# sourceMappingURL=LogMonitorEntry.js.map