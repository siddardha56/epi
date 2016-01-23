import React from 'react';
import { connect, dispatch } from 'react-redux';


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render () {
        return <div>
           Home
        </div>
    }
}

//module.exports = connect(
//    state => ({ number: state.count.number }),
//    { increase, decrease }
//)(Home);

export default connect(
    state => (state)
)(Home);