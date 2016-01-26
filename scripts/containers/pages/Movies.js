import React from 'react';
import ItemsGrid from '../ItemsGrid';
import LeftNav from '../LeftNav';
import { connect, dispatch } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import Loader from '../../components/Loader';
import getMovies from '../../actions/themoviedb';


class Movies extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.loadPage = this.loadPage.bind(this);
    }

    componentDidMount() {
        //console.log("Component did mount");
        let sortBy = this.props.location.query.sortBy || 'now-playing';
        this.props.dispatch(getMovies(sortBy, this.props.movies.getIn([sortBy, 'lastUpdated'])));
    }

    loadPage(route) {
        let sortBy = route || 'now-playing';
        //console.log("Load page", this.props.movies.getIn([sortBy, 'lastUpdated']));
        this.props.dispatch(getMovies(sortBy, this.props.movies.getIn([sortBy, 'lastUpdated'])));
        this.props.dispatch(routeActions.push("/movies?sortBy=" + route));
    }

    render() {
        //console.log("Movies.props", this.props.movies.toJS(), this.props.location.query.sortBy);
        let leftNavItems = [
            //{label: "Latest", value: "latest"},
            {label: "Now playing", value: "now-playing"},
            {label: "Popular", value: "popular"},
            {label: "Top Rated", value: "top-rated"},
            {label: "Upcoming", value: "upcoming"}
        ];

        return <div className="two-column-wrapper">
            <LeftNav className="left-nav"
                     items={leftNavItems}
                     onItemClick={this.loadPage}
                     selectedItem={this.props.location.query.sortBy}/>
            {this.props.movies.getIn(['state', 'isLoading']) ? <Loader/> : ''}
            <ItemsGrid className="items-grid"
                       movies={this.props.movies.get(this.props.location.query.sortBy)||this.props.movies.get('now-playing')}>
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