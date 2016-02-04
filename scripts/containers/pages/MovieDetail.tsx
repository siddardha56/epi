import React from 'react';
import { connect, dispatch } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Loader from '../../components/Loader.tsx';

class MovieDetail extends React.Component {

    constructor(props, context) {
        super(props, context);

        //this.loadPage = this.loadPage.bind(this);
    }

    componentDidMount() {
        console.log("Movies mount");
        let sortBy = this.props.location.query.sortBy || 'now_playing';
        this.props.dispatch(getMovies(sortBy, this.props.movies.getIn([sortBy, 'lastUpdated'])));
    }

    render() {
        console.log("MovieDetail render", this.props, this.props.location.query.sortBy);

        return <div className="">
           Movie Detail
        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return {dispatch: dispatch}
}

function mapStateToProps(state) {
    //console.log("Movies mapStateToProps", state);
    return {movies: state.data.get('movies'), location: state.routing.location};
}

export default MovieDetail;