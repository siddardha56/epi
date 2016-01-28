import React from 'react';
import { connect, dispatch } from 'react-redux';
import Actions from '../actions/themoviedb';
import Theme from '../theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

//Components
import AppBar from 'material-ui/lib/app-bar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import ListItem from 'material-ui/lib/lists/list-item';

import * as Immutable from 'immutable';

import FontIcon from 'material-ui/lib/font-icon';

import { routeActions } from 'react-router-redux';
import CategoryTabs from './CategoryTabs.jsx';


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


    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(Theme)
        }
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

            <AppBar
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
            </AppBar>

            {this.props.children}
        </div>
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

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

