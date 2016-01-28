import React from 'react';
import {connect} from 'react-redux';

 class Tracer extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        console.log("tracer", this.props);
        return <div></div>;
    }
}

export default connect(
    (state) => ({state})
)(Tracer);


