"use strict";
const react_1 = require('react');
const LogMonitorEntry_tsx_1 = require('./LogMonitorEntry.tsx');
const LogMonitorButton_tsx_1 = require('./LogMonitorButton.tsx');
const function_1 = require('react-pure-render/function');
const themes = require('redux-devtools-themes');
const pipboyColors_ts_1 = require('./pipboyColors.ts');
const redux_devtools_1 = require('redux-devtools');
const actions_ts_1 = require('./actions.ts');
const reducers_ts_1 = require('./reducers.ts');
const react_dom_1 = require('react-dom');
require('./style.css');
const { reset, rollback, commit, sweep, toggleAction } = redux_devtools_1.ActionCreators;
const styles = {
    container: {
        fontFamily: 'monaco, Consolas, Lucida Console, monospace',
        position: 'relative',
        overflowY: 'hidden',
        width: '100%',
        height: '100%',
        minWidth: 300,
        direction: 'ltr'
    },
    buttonBar: {
        padding: '15px 0',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderColor: 'transparent',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    elements: {
        maxHeight: "calc(100% - 233px)",
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    textAreaDebug: {
        margin: '5px',
        padding: '5px',
        resize: 'none',
        color: '#5DFE6B',
        background: 'rgba(93, 254, 107, 0.1)',
        minHeight: '90px',
        minWidth: '97%',
        marginTop: '5px',
        marginBottom: '5px',
        outline: 'none',
        border: '1px solid rgba(93, 254, 107, 0.57)'
    }
};
class LogMonitor extends react_1.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = function_1.default;
        this.handleToggleAction = this.handleToggleAction.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleRollback = this.handleRollback.bind(this);
        this.handleSweep = this.handleSweep.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
        this.copyTrace = this.copyTrace.bind(this);
        this.applyTrace = this.applyTrace.bind(this);
    }
    componentDidMount() {
        const node = this.refs.container;
        if (!node) {
            return;
        }
        if (this.props.preserveScrollTop) {
            node.scrollTop = this.props.monitorState.initialScrollTop;
            this.interval = setInterval(this.updateScrollTop, 1000);
        }
    }
    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    updateScrollTop() {
        const node = this.refs.container;
        this.props.dispatch(actions_ts_1.updateScrollTop(node ? node.scrollTop : 0));
    }
    componentWillReceiveProps(nextProps) {
        const node = this.refs.container;
        if (!node) {
            this.scrollDown = true;
        }
        else if (this.props.stagedActionIds.length <
            nextProps.stagedActionIds.length) {
            const { scrollTop, offsetHeight, scrollHeight } = node;
            this.scrollDown = Math.abs(scrollHeight - (scrollTop + offsetHeight)) < 20;
        }
        else {
            this.scrollDown = false;
        }
    }
    componentDidUpdate() {
        const node = this.refs.container;
        if (!node) {
            return;
        }
        if (this.scrollDown) {
            const { offsetHeight, scrollHeight } = node;
            node.scrollTop = scrollHeight - offsetHeight;
            this.scrollDown = false;
        }
    }
    handleRollback() {
        this.props.dispatch(rollback());
    }
    handleSweep() {
        this.props.dispatch(sweep());
    }
    handleCommit() {
        this.props.dispatch(commit());
    }
    handleToggleAction(id) {
        this.props.dispatch(toggleAction(id));
    }
    handleReset() {
        this.props.dispatch(reset());
    }
    copyTrace() {
        const { actionsById, stagedActionIds, computedStates } = this.props;
        let trace = [];
        for (let i = 0; i < stagedActionIds.length; i++) {
            const actionId = stagedActionIds[i];
            const action = actionsById[actionId].action;
            const { state, error } = computedStates[i];
            trace.push({ action: action });
        }
        react_dom_1.default.findDOMNode(this.refs.textAreaValue).value = JSON.stringify(trace);
    }
    applyTrace() {
        let trace = JSON.parse(react_dom_1.default.findDOMNode(this.refs.textAreaValue).value);
        console.log("trace", trace[2], redux_devtools_1.ActionCreators);
        for (let i = 0; i < trace.length; i++) {
            this.props.dispatch(redux_devtools_1.ActionCreators.performAction(trace[i].action));
        }
    }
    getTheme() {
        let { theme } = this.props;
        if (theme === 'pipboy') {
            return pipboyColors_ts_1.default;
        }
        if (typeof theme !== 'string') {
            return theme;
        }
        if (typeof themes[theme] !== 'undefined') {
            return themes[theme];
        }
        console.warn('DevTools theme ' + theme + ' not found, defaulting to pipboy');
        return theme;
    }
    render() {
        const elements = [];
        const theme = this.getTheme();
        const { actionsById, skippedActionIds, stagedActionIds, computedStates, select } = this.props;
        for (let i = 0; i < stagedActionIds.length; i++) {
            const actionId = stagedActionIds[i];
            const action = actionsById[actionId].action;
            const { state, error } = computedStates[i];
            let previousState;
            if (i > 0) {
                previousState = computedStates[i - 1].state;
            }
            elements.push(react_1.default.createElement(LogMonitorEntry_tsx_1.default, {key: actionId, theme: theme, select: select, action: action, actionId: actionId, state: state, previousState: previousState, collapsed: skippedActionIds.indexOf(actionId) > -1, error: error, expandActionRoot: this.props.expandActionRoot, expandStateRoot: this.props.expandStateRoot, onActionClick: this.handleToggleAction}));
        }
        return (react_1.default.createElement("div", {className: theme.scheme === 'pipboy' ? 'container' : '', style: { styles: .container, backgroundColor: theme.base00 }}, react_1.default.createElement("div", {style: {}}), "styles.buttonBar, borderColor: theme.base02}}>", react_1.default.createElement(LogMonitorButton_tsx_1.default, {theme: theme, onClick: this.copyTrace, enabled: true}, "Get trace"), react_1.default.createElement(LogMonitorButton_tsx_1.default, {theme: theme, onClick: this.applyTrace, enabled: true}, "Apply trace"))
            ,
                react_1.default.createElement("div", {style: { borderColor: theme.base02 }}, react_1.default.createElement("textarea", {className: "input", ref: "textAreaValue", style: {}}), "styles.textAreaDebug}}>"));
        div >
            react_1.default.createElement("div", {style: { styles: .buttonBar, borderColor: theme.base02 }}, react_1.default.createElement(LogMonitorButton_tsx_1.default, {theme: theme, onClick: this.handleReset, enabled: true}, "Reset"), react_1.default.createElement(LogMonitorButton_tsx_1.default, {theme: theme, onClick: this.handleRollback, enabled: computedStates.length > 1}, "Revert"), react_1.default.createElement(LogMonitorButton_tsx_1.default, {theme: theme, onClick: this.handleSweep, enabled: skippedActionIds.length > 0}, "Sweep"), react_1.default.createElement(LogMonitorButton_tsx_1.default, {theme: theme, onClick: this.handleCommit, enabled: computedStates.length > 1}, "Commit"))
                ,
                    react_1.default.createElement("div", {className: theme.scheme === 'pipboy' ? 'elements' : '', style: styles.elements, ref: 'container'}, elements);
        {
            theme.scheme === 'pipboy' ? react_1.default.createElement("div", {className: "scan"}) : '';
        }
        div >
        ;
        ;
    }
}
LogMonitor.update = reducers_ts_1.default;
LogMonitor.propTypes = {
    dispatch: react_1.PropTypes.func,
    computedStates: react_1.PropTypes.array,
    actionsById: react_1.PropTypes.object,
    stagedActionIds: react_1.PropTypes.array,
    skippedActionIds: react_1.PropTypes.array,
    monitorState: react_1.PropTypes.shape({
        initialScrollTop: react_1.PropTypes.number
    }),
    preserveScrollTop: react_1.PropTypes.bool,
    select: react_1.PropTypes.func.isRequired,
    theme: react_1.PropTypes.oneOfType([
        react_1.PropTypes.object,
        react_1.PropTypes.string
    ]),
    expandActionRoot: react_1.PropTypes.bool,
    expandStateRoot: react_1.PropTypes.bool
};
LogMonitor.defaultProps = {
    select: (state) => state,
    theme: 'nicinabox',
    preserveScrollTop: true,
    expandActionRoot: true,
    expandStateRoot: true
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LogMonitor;
//# sourceMappingURL=LogMonitor.js.map