import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
//import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

export default class ItemsGrid extends React.Component {

    render() {
        console.log("ItemsGrid.props", this.props);

        let movies = this.props.movies.get('results') || [];
        const tileElements = movies.map(movie => {
            let posterURL = (movie.get('poster_path') ? 'http://image.tmdb.org/t/p/w300' + movie.get('poster_path') : '');

            return <GridTile
                key={movie.get('id')}
                actionIcon={<IconButton></IconButton>}
                style={{width: "187px", marginTop: "25px", paddingLeft: "15x"}}>
                <img src={posterURL}/>
            </GridTile>
        });

        const gridListStyle = {width: '100%', height: '700px', overflowY: 'auto'};

        return <div style={{width: "75%", display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            {/* Basic grid list with mostly default options */}
            <GridList
                cols={4}
                padding={15}
                cellHeight={281}
                style={gridListStyle}>
                {tileElements}
            </GridList>
        </div>;

    }
}
