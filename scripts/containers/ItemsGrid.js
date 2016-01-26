import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
//import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import ReactDOM from 'react-dom';


export default class ItemsGrid extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.onCardMouseEnter = this.onCardMouseEnter.bind(this);
        this.onCardMouseLeave = this.onCardMouseLeave.bind(this);
        this.state = {onHoverItemId: -1};
    }

    onCardMouseEnter(itemId) {
        this.setState({onHoverItemId: itemId});
    }

    onCardMouseLeave(itemId) {
        this.setState({onHoverItemId: -1});
    }

    render() {
        //console.log("ItemsGrid.props", this.props);

        let movies = this.props.movies.get('results') || [];
        const tileElements = movies.map(movie => {
            let posterURL = (movie.get('poster_path') ? 'http://image.tmdb.org/t/p/w300' + movie.get('poster_path') : '');

            return <GridTile
                key={movie.get('id')}
                actionIcon={<IconButton></IconButton>}
                style={{width: "187px", marginTop: "25px", paddingLeft: "15x"}}>
                <Card style={{width: '187px', height: '280px'}}
                      ref={movie.get('id')}
                      zDepth={this.state.onHoverItemId === movie.get('id') ? 3 :1}
                      onMouseEnter={()=>(this.onCardMouseEnter(movie.get('id')))}
                      onMouseLeave={()=>(this.onCardMouseLeave(movie.get('id')))}>
                    <img src={posterURL} style={{width: '187px', height: '280px'}}/>
                </Card>
                <CardText style={{textAlign:"center"}}>
                    {movie.get('title')}
                </CardText>
            </GridTile>
        });

        const gridListStyle = {width: '100%', height: '700px', overflowY: 'auto'};

        return <div style={{width: "75%", display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            {/* Basic grid list with mostly default options */}
            <GridList
                cols={4}
                padding={15}
                cellHeight={350}
                style={gridListStyle}>
                {tileElements}
            </GridList>
        </div>;

    }
}
