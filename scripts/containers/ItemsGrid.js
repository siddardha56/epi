import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
//import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

export default class ItemsGrid extends React.Component {

    render() {
        const tilesData = [
            {
                img: 'http://image.tmdb.org/t/p/w300/kqjL17yufvn9OVLyXYpvtyrFfak.jpg',
                title: 'Mad MAx: Fury Road',
                author: '2015',
            },
            {
                img: 'http://image.tmdb.org/t/p/w300/uXZYawqUsChGSj54wcuBtEdUJbh.jpg',
                title: 'Jurassic World',
                author: '2015',
            },
            {
                img: 'http://image.tmdb.org/t/p/w300/6iQ4CMtYorKFfAmXEpAQZMnA0Qe.jpg',
                title: 'San Andreas',
                author: '2015',
            },
            {
                img: 'http://image.tmdb.org/t/p/w300/3zQvuSAUdC3mrx9vnSEpkFX0968.jpg',
                title: 'Big Hero 6',
                author: '2014',
            },
            {
                img: 'http://image.tmdb.org/t/p/w300/saF3HtAduvrP9ytXDxSnQJP3oqx.jpg',
                title: 'Chappie',
                author: '2014',
            },
            {
                img: 'http://image.tmdb.org/t/p/w300/oAISjx6DvR2yUn9dxj00vP8OcJJ.jpg',
                title: 'Kingsman: The Secret Service',
                author: '2014',
            },
            {
                img: 'http://image.tmdb.org/t/p/w300/qOoFD4HD9a2EEUymdzBQN9XF1UJ.jpg',
                title: 'Vegetables',
                author: 'jill111',
            },
            {
                img: 'http://image.tmdb.org/t/p/w300/A7HtCxFe7Ms8H7e7o2zawppbuDT.jpg',
                title: 'Water plant',
                author: 'BkrmadtyaKarki',
            },
            {
                img: 'http://image.tmdb.org/t/p/w300/s5uMY8ooGRZOL0oe4sIvnlTsYQO.jpg',
                title: 'Water plant',
                author: 'BkrmadtyaKarki',
            },
            {
                img: 'http://image.tmdb.org/t/p/w300/gNGAHcK1DBWYTUgKExb3MnhlJ09.jpg',
                title: 'Water plant',
                author: 'BkrmadtyaKarki',
            },
            {
                img: 'http://image.tmdb.org/t/p/w300/id9Sw7VIn97W3crPd1MIRHJ6t9Y.jpg',
                title: 'Water plant',
                author: 'BkrmadtyaKarki',
            },

        ];

        const tileElements = tilesData.map(tile =>
            <GridTile
                key={tile.img}
                actionIcon={<IconButton></IconButton>}
                style={{width: "187px", marginTop: "25px", paddingLeft: "15x"}}>
                <img src={tile.img}/>
            </GridTile>);

        const gridListStyle = {width: '1080px', height: '700px', overflowY: 'auto'};

        return <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
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
