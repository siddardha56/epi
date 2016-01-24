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
        this.props.dispatch(getMovies(this.props.location.query.sortBy));
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
    }

    loadPage(route) {
        this.props.dispatch(getMovies(route));
        this.props.dispatch(routeActions.push("/movies?sortBy=" + route));
    }

    render() {
        console.log("Movies.props", this.props.movies.get(this.props.location.query.sortBy));
        let leftNavItems = [
            {label: "Latest", value: "latest"},
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
            <ItemsGrid movies={this.props.movies.get(this.props.location.query.sortBy)}></ItemsGrid>
        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return {dispatch: dispatch}
}


export default connect(
    (state) => {
        return {location: state.routing.location};
    },
    mapDispatchToProps
)
(Movies);