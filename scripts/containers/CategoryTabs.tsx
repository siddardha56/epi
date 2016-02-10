import * as React from 'react';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';

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
        let categories = [{label: "Movies", route: "movies?sortBy=now_playing"}, {label: "TV", route: "tv?sortBy=on_the_air"}];

        let styles = {
            tabs: {
                width: '100%'
            }
        };

        return <Tabs style={styles.tabs}>

            {categories.map(category => {
                return <Tab label={category.label}
                            onActive={()=>(this.handleActive(category.route))}
                            key={category.route}>
                </Tab>
            })}

        </Tabs>;
    }
}

export default connect(
    null,
    {push: routeActions.push}
)(CategoryTabs);
