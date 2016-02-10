import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/themoviedb.ts';

import * as Immutable from 'immutable';

import { routeActions } from 'react-router-redux';
import Header from '../components/header/Header.tsx';


//CSS
import "../../styles/app.scss";

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onTitleTouchTap = this.onTitleTouchTap.bind(this);
        this.onAppBarRightIconClick = this.onAppBarRightIconClick.bind(this);

        //console.log("App constructor", this, props, context);
        this.state = {leftNavOpen: false};
    }

    onTitleTouchTap() {
        this.props.push("/movies");
    }

    getPageData(route, index) {
        console.log("getPageData", this.props, route);
        return this.props.data.movies;

    }

    onAppBarRightIconClick() {
        console.log("asd")
    }

    render() {
        console.log("App render", this);

        let thisComponent = this;

        const styles = {
            appBar: {
                flexWrap: 'wrap',
            }
        };

        return <div>

            {/*<AppBar
             title="Epi"
             zDepth={0}
             showMenuIconButton={false}
             onTitleTouchTap={this.onTitleTouchTap}
             style={styles.appBar}
             iconElementRight={
             <a href="http://www.github.com/arjunu/epi">
             <IconButton
             iconClassName="mdi mdi-github-circle"
             tooltip="View source"
             onTouchTap={this.onAppBarRightIconClick}
             tooltipPosition="bottom-left">
             </IconButton></a>}>

             <CategoryTabs/>
             </AppBar>*/}
            <Header></Header>
            <div className="content-wrapper">
                {this.props.children}
            </div>
        </div>
    }
}


App.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
};

//function mapStateToProps(state) {
//    console.log("mapStateToProps", state.data.toJS());
//    return {movies: state.data.get('movies')};
//}

export default connect(
    null,
    (dispatch) => {
        return {push: routeActions.push, dispatch: dispatch}
    }
)(App);

