import React from 'react';
import ItemsGrid from '../ItemsGrid.tsx';
import LeftNav from '../LeftNav.tsx';
import { connect, dispatch } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Loader from '../../components/Loader.tsx';
import {getTV} from '../../actions/themoviedb.ts';


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

        let selectedItem = 'on_the_air';
        if (this.props.location && this.props.location.query)
            selectedItem = this.props.location.query.sortBy;

        return <div className="two-column-wrapper">
            <LeftNav className="left-nav"
                     items={leftNavItems}
                     onItemClick={this.loadPage}
                     selectedItem={selectedItem}/>
            {this.props.tv.getIn(['state', 'isLoading']) ? <Loader/> : ''}
            <ItemsGrid className="items-grid"
                       items={this.props.tv.get(selectedItem)}>
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