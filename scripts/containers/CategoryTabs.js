import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Slider from 'material-ui/lib/slider';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

function handleActive(tab) {
    alert(`A tab with this route property ${tab.props.route} was activated.`);
}

export default class CategoryTabs extends React.Component {
    render() {
        let categories = ["Movies", "TV"];

        let styles = {
            tabs: {
                width: '100%'
            }
        };

        return <Tabs style={styles.tabs} >

            {categories.map(tab => {
                return <Tab label={tab}>
                </Tab>
            })}

        </Tabs>;
    }
}


/*
 <Tab
 label="onActive"
 route="/home"
 onActive={handleActive}/>*/
