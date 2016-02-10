import * as React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import * as Actions from '../../actions/themoviedb.ts';
import {getBackdropURL} from '../../utils/urls.ts';
import './movie-detail.scss';

const {getMovieDetail} = Actions;

class MovieDetail extends React.Component {

    constructor(props, context) {
        super(props, context);

        //this.loadPage = this.loadPage.bind(this);
    }

    componentDidMount() {
        console.log("MovieDetail mount", this.props);
        this.props.dispatch(getMovieDetail(this.props.routeParams.id));
    }

    render() {
        let movie = this.props.movie;
        console.log("MovieDetail render", this.props.movie.toJS());
        let posterURL = (movie.get('poster_path') ? 'http://image.tmdb.org/t/p/w300' + movie.get('poster_path') : '');

        return <div className="backdrop"
                    style={{backgroundImage: `url(${getBackdropURL({fileName: this.props.movie.get('backdrop_path')})})`,
        backgroundSize: 'cover'}}>
            <div className="overlay"></div>
            <div className="detail">
                <img className="poster" src={posterURL} style={{width: '187px', height: '280px'}}/>

                <div className="title">{this.props.movie.get('title')}</div>

                <div>{this.props.movie.get('tagline')}</div>
                <div className="overview">{this.props.movie.get('overview')}</div>

            </div>

        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return {dispatch: dispatch}
}

function mapStateToProps(state) {
    //console.log("Movies mapStateToProps", state);
    return {movie: state.data.getIn(['movies', 'detail']), location: state.routing.location};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(MovieDetail);