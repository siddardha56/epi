import React, { PropTypes, Component } from 'react';
import LogMonitorEntry from './LogMonitorEntry.jsx';
import LogMonitorButton from './LogMonitorButton.jsx';
import shouldPureComponentUpdate from 'react-pure-render/function';
import * as themes from 'redux-devtools-themes';
import pipboyColors from './pipboyColors';
import { ActionCreators } from 'redux-devtools';
import { updateScrollTop } from './actions';
import reducer from './reducers';
import ReactDOM from 'react-dom';
import './style.css';
//import {store} from '../createStore';

const { reset, rollback, commit, sweep, toggleAction } = ActionCreators;


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
        //position: 'absolute',
        //left: 0,
        //right: 0,
        //top: 38,
        //bottom: 0,
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
        //border: '1px solid #313131',
        //boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.53)',
        minHeight: '90px',
        minWidth: '97%',
        marginTop: '5px',
        marginBottom: '5px',
        outline: 'none',
        border: '1px solid rgba(93, 254, 107, 0.57)'
    }
};

export default class LogMonitor extends Component {
    static update = reducer;

    static propTypes = {
        dispatch: PropTypes.func,
        computedStates: PropTypes.array,
        actionsById: PropTypes.object,
        stagedActionIds: PropTypes.array,
        skippedActionIds: PropTypes.array,
        monitorState: PropTypes.shape({
            initialScrollTop: PropTypes.number
        }),

        preserveScrollTop: PropTypes.bool,
        select: PropTypes.func.isRequired,
        theme: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        expandActionRoot: PropTypes.bool,
        expandStateRoot: PropTypes.bool
    };

    static defaultProps = {
        select: (state) => state,
        theme: 'nicinabox',
        preserveScrollTop: true,
        expandActionRoot: true,
        expandStateRoot: true
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
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
            this.interval = setInterval(::this.updateScrollTop, 1000);
        }
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    updateScrollTop() {
        const node = this.refs.container;
        this.props.dispatch(updateScrollTop(node ? node.scrollTop : 0));
    }

    componentWillReceiveProps(nextProps) {
        const node = this.refs.container;
        if (!node) {
            this.scrollDown = true;
        } else if (
            this.props.stagedActionIds.length <
            nextProps.stagedActionIds.length
        ) {
            const { scrollTop, offsetHeight, scrollHeight } = node;

            this.scrollDown = Math.abs(
                    scrollHeight - (scrollTop + offsetHeight)
                ) < 20;
        } else {
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
        //console.log("props", this.props);
        const { actionsById, stagedActionIds, computedStates } = this.props;

        let trace = [];
        for (let i = 0; i < stagedActionIds.length; i++) {
            const actionId = stagedActionIds[i];
            const action = actionsById[actionId].action;
            const { state, error } = computedStates[i];

            trace.push({action});
        }
        //console.log("trace", trace);

        ReactDOM.findDOMNode(this.refs.textAreaValue).value = JSON.stringify(trace);
    }


    applyTrace() {
        let trace = JSON.parse(ReactDOM.findDOMNode(this.refs.textAreaValue).value);
        //console.log("trace", ReactDOM.findDOMNode(this.refs.textAreaValue).value);
        console.log("trace", trace[2], ActionCreators);
        //this.props.dispatch(ActionCreators.performAction(trace[2].action));
        for (let i = 0; i < trace.length; i++) {
            this.props.dispatch(ActionCreators.performAction(trace[i].action));
        }
    }

    getTheme() {
        let { theme } = this.props;

        if (theme === 'pipboy') {
            return pipboyColors;
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
            elements.push(
                <LogMonitorEntry key={actionId}
                                 theme={theme}
                                 select={select}
                                 action={action}
                                 actionId={actionId}
                                 state={state}
                                 previousState={previousState}
                                 collapsed={skippedActionIds.indexOf(actionId) > -1}
                                 error={error}
                                 expandActionRoot={this.props.expandActionRoot}
                                 expandStateRoot={this.props.expandStateRoot}
                                 onActionClick={this.handleToggleAction}/>
            );
        }

        return (
            <div className={theme.scheme === 'pipboy'? 'container': ''}
                 style={{...styles.container, backgroundColor: theme.base00}}>
                <div style={{...styles.buttonBar, borderColor: theme.base02}}>
                    <LogMonitorButton
                        theme={theme}
                        onClick={this.copyTrace}
                        enabled>
                        Get trace
                    </LogMonitorButton>
                    <LogMonitorButton
                        theme={theme}
                        onClick={this.applyTrace}
                        enabled>
                        Apply trace
                    </LogMonitorButton>
                </div>
                <div style={{borderColor: theme.base02}}>
                    <textarea className="input" ref="textAreaValue" style={{...styles.textAreaDebug}}></textarea>
                </div>
                <div style={{...styles.buttonBar, borderColor: theme.base02}}>
                    <LogMonitorButton
                        theme={theme}
                        onClick={this.handleReset}
                        enabled>
                        Reset
                    </LogMonitorButton>
                    <LogMonitorButton
                        theme={theme}
                        onClick={this.handleRollback}
                        enabled={computedStates.length > 1}>
                        Revert
                    </LogMonitorButton>
                    <LogMonitorButton
                        theme={theme}
                        onClick={this.handleSweep}
                        enabled={skippedActionIds.length > 0}>
                        Sweep
                    </LogMonitorButton>
                    <LogMonitorButton
                        theme={theme}
                        onClick={this.handleCommit}
                        enabled={computedStates.length > 1}>
                        Commit
                    </LogMonitorButton>
                </div>
                <div className={theme.scheme === 'pipboy'? 'elements': ''} style={styles.elements} ref='container'>
                    {elements}
                </div>
                {theme.scheme === 'pipboy' ? <div className="scan"></div> : ''}
            </div>
        );
    }
}