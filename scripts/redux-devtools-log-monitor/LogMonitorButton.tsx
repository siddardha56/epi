import React from 'react';
import brighten from './brighten.ts';
import shouldPureComponentUpdate from 'react-pure-render/function';

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

export default class LogMonitorButton extends React.Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);

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
        this.setState({hovered: true});
    }

    handleMouseLeave() {
        this.setState({hovered: false});
    }

    handleMouseDown() {
        this.setState({active: true});
    }

    handleMouseUp() {
        this.setState({active: false});
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
        style = Object.assign({}, styles.base);

        if (this.props.theme.scheme === "pipboy") {

            style.color = this.props.theme.base00;
            style.backgroundColor = this.props.theme.base06;
            style.orderRadius = 'none';


            if (!this.props.enabled) {
                style.cursor = 'auto';
                style.backgroundColor = this.props.theme.base02;
            }
        }

        else {
            style.backgroundColor = this.props.theme.base02;

            if (this.props.enabled && this.state.hovered) {
                style.backgroundColor = brighten(this.props.theme.base02, 0.2)
            }

            if (!this.props.enabled) {
                style.opacity = 0.2;
                style.cursor = 'text';
                style.backgroundColor = 'transparent';
            }
        }

        return (
            <a onMouseEnter={this.handleMouseEnter}
               onMouseLeave={this.handleMouseLeave}
               onMouseDown={this.handleMouseDown}
               onMouseUp={this.handleMouseUp}
               onClick={this.onClick}
               style={style}>
                {this.props.children}
            </a>
        );
    }
}
