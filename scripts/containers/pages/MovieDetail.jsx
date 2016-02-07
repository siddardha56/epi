import React from 'react';
import { connect, dispatch } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Loader from '../../components/Loader.jsx';
import * as Actions from '../../actions/themoviedb.js';
import {getBackdropURL} from '../../utils/urls.js';

const {getMovieDetail} = Actions;

class MovieDetail extends React.Component {

    constructor(props, context) {
        super(props, context);

        //this.loadPage = this.loadPage.bind(this);
    }

    componentDidMount() {
        console.log("MovieDetail mount", this.props);
        this.props.dispatch(getMovieDetail(this.props.routeParams.id));
    }

    render() {
        console.log("MovieDetail render", this.props);

        return <div className="">
            <img src={getBackdropURL({fileName: this.props.movie.get('backdrop_path')})}/>
        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return {dispatch: dispatch}
}

function mapStateToProps(state) {
    //console.log("Movies mapStateToProps", state);
    return {movie: state.data.getIn(['movies', 'detail']), location: state.routing.location};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(MovieDetail);