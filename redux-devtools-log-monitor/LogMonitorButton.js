"use strict";
const react_1 = require('react');
const brighten_ts_1 = require('./brighten.ts');
const function_1 = require('react-pure-render/function');
const styles = {
    base: {
        cursor: 'pointer',
        fontWeight: 'bold',
        borderRadius: 3,
        padding: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 5,
        marginBottom: 5,
        flexGrow: 1,
        display: 'inline-block',
        fontSize: '0.8em',
        color: 'white',
        textDecoration: 'none'
    }
};
class LogMonitorButton extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = function_1.default;
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            hovered: false,
            active: false
        };
    }
    handleMouseEnter() {
        this.setState({ hovered: true });
    }
    handleMouseLeave() {
        this.setState({ hovered: false });
    }
    handleMouseDown() {
        this.setState({ active: true });
    }
    handleMouseUp() {
        this.setState({ active: false });
    }
    onClick() {
        if (!this.props.enabled) {
            return;
        }
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    render() {
        let style;
        if (this.props.theme.scheme === "pipboy") {
            style = {
                styles: .base,
                color: this.props.theme.base00,
                backgroundColor: this.props.theme.base06,
                borderRadius: 'none'
            };
            if (!this.props.enabled) {
                style = {
                    style: style,
                    cursor: 'auto',
                    backgroundColor: this.props.theme.base02
                };
            }
        }
        else {
            style = {
                styles: .base,
                backgroundColor: this.props.theme.base02
            };
            if (this.props.enabled && this.state.hovered) {
                style = {
                    style: style,
                    backgroundColor: brighten_ts_1.default(this.props.theme.base02, 0.2)
                };
            }
            if (!this.props.enabled) {
                style = {
                    style: style,
                    opacity: 0.2,
                    cursor: 'text',
                    backgroundColor: 'transparent'
                };
            }
        }
        return (react_1.default.createElement("a", {onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp, onClick: this.onClick, style: style}, this.props.children));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LogMonitorButton;
//# sourceMappingURL=LogMonitorButton.js.map