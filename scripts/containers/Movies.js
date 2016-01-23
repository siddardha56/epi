import React from 'react';
import ItemsGrid from './ItemsGrid';

export default class Movies extends React.Component {
    render() {
        console.log("Movies.props", this.props);

        return <ItemsGrid movies={this.props.movies}></ItemsGrid>;
    }
}