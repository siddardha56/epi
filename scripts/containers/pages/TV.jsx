import React from 'react';
import ItemsGrid from '../ItemsGrid.jsx';
import LeftNav from '../LeftNav.jsx';
import { connect, dispatch } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import Loader from '../../components/Loader.jsx';
import {getTV} from '../../actions/themoviedb';


export default class TV extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.loadPage = this.loadPage.bind(this);
    }

    componentDidMount() {
        console.log("Tv mounted")
        let sortBy = this.props.location.query.sortBy || 'on_the_air';
        this.props.dispatch(getTV(sortBy, this.props.tv.getIn([sortBy, 'lastUpdated'])));
    }

    loadPage(route) {
        let sortBy = route || 'on_the_air';
        this.props.dispatch(getTV(sortBy, this.props.tv.getIn([sortBy, 'lastUpdated'])));
        this.props.dispatch(routeActions.push("/tv?sortBy=" + route));
    }

    render() {
        console.log("tv.props", this.props.tv.toJS(), this.props.location.query.sortBy);
        let leftNavItems = [
            //{label: "Latest", value: "latest"},
            {label: "On the air", value: "on_the_air"},
            {label: "Airing today", value: "airing_today"},
            {label: "Top Rated", value: "top_rated"},
            {label: "Popular", value: "popular"}
        ];

        return <div className="two-column-wrapper">
            <LeftNav className="left-nav"
                     items={leftNavItems}
                     onItemClick={this.loadPage}
                     selectedItem={this.props.location.query.sortBy}/>
            {this.props.tv.getIn(['state', 'isLoading']) ? <Loader/> : ''}
            <ItemsGrid className="items-grid"
                       items={this.props.tv.get(this.props.location.query.sortBy)||this.props.tv.get('on_the_air')}>
            </ItemsGrid>
        </div>
    }
}

function mapDispatchToProps(dispatch) {
    return {dispatch: dispatch}
}

function mapStateToProps(state) {
    console.log("tv mapStateToProps", state.data.toJS());
    return {tv: state.data.get('tv'), location: state.routing.location};
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(TV);