import * as React from 'react';
import ItemsGrid from '../ItemsGrid.tsx';
import LeftNav from '../LeftNav.tsx';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import {getMovies} from '../../actions/themoviedb.ts';
import './page.scss';

interface MovieProps{
    dispatch: Redux.Dispatch,
    location: HistoryModule.Location
}

interface MovieState{}

class Movies extends React.Component<MovieProps, MovieState> {

    constructor(props, context) {
        super(props, context);

        this.loadPage = this.loadPage.bind(this);
        this.loadMovieDetail = this.loadMovieDetail.bind(this);
    }

    componentDidMount() {
        console.log("Movies mount");
        let sortBy = this.props.location.query.sortBy || 'now_playing';
        this.props.dispatch(getMovies(sortBy, this.props.movies.getIn([sortBy, 'lastUpdated'])));
    }

    loadMovieDetail(movieId) {
        console.log("loadMovieDetail", movieId);

        this.props.dispatch(routeActions.push(`/movie/${movieId}`));
    }

    loadPage(route) {
        let sortBy = route || 'now_playing';
        //console.log("Load page", this.props.movies.getIn([sortBy, 'lastUpdated']));
        this.props.dispatch(getMovies(sortBy, this.props.movies.getIn([sortBy, 'lastUpdated'])));
        this.props.dispatch(routeActions.push("/movies?sortBy=" + route));
    }

    render() {
        console.log("Movies render", this.props.movies.toJS(), this.props.location.query.sortBy);
        let leftNavItems = [
            //{label: "Latest", value: "latest"},
            {label: "Now playing", value: "now_playing"},
            {label: "Popular", value: "popular"},
            {label: "Top Rated", value: "top_rated"},
            {label: "Upcoming", value: "upcoming"}
        ];

        let selectedItem = 'now_playing';
        if (this.props.location && this.props.location.query && this.props.location.query.sortBy)
            selectedItem = this.props.location.query.sortBy;

        return <div className="two-column">
            {/*<LeftNav className="left-nav"
             items={leftNavItems}
             onItemClick={this.loadPage}
             selectedItem={selectedItem}/>*/}
            <LeftNav items={leftNavItems} onItemClick={this.loadPage}/>
            {this.props.movies.getIn(['state', 'isLoading']) ?'loader': ''}
            <ItemsGrid items={this.props.movies.get(selectedItem)}
                       onItemClick={this.loadMovieDetail}>
            </ItemsGrid>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(Movies);