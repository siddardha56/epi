import React from 'react';
import ItemsGrid from '../ItemsGrid';
import LeftNav from '../LeftNav';
import { connect, dispatch } from 'react-redux';
import { routeActions } from 'redux-simple-router';

class Movies extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.loadPage = this.loadPage.bind(this);
    }

    loadPage(route) {
        this.props.push("/movies?sortBy=" + route);
    }

    render() {
        console.log("Movies.props", this.props);
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
            <ItemsGrid movies={this.props.movies}></ItemsGrid>
        </div>
    }
}

export default connect(
    (state) => {
        return {location: state.routing.location};
    },
    {push: routeActions.push}
)
(Movies);