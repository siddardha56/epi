import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import {connect} from 'react-redux';
import { routeActions } from 'redux-simple-router';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

class CategoryTabs extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleActive = this.handleActive.bind(this);
    }


    handleActive(tab) {
        this.props.push("/" + tab);
    }

    render() {
        let categories = [{label: "Movies", route: "movies"}, {label: "TV", route: "tv"}];

        let styles = {
            tabs: {
                width: '100%'
            }
        };

        return <Tabs style={styles.tabs}>

            {categories.map(category => {
                return <Tab label={category.label}
                               onActive={()=>(this.handleActive(category.route))}>
                </Tab>
            })}

        </Tabs>;
    }
}

export default connect(
    null,
    {push: routeActions.push}
)(CategoryTabs);
