import React from 'react';
import ItemsGrid from '../ItemsGrid';

export default class TV extends React.Component {
    render() {
        console.log("TV.props", this.props);

        return <ItemsGrid movies={[]}></ItemsGrid>;
    }
}