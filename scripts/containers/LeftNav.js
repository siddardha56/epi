import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
let SelectableList = SelectableContainerEnhance(List);
import Divider from 'material-ui/lib/divider';

export default class LeftNav extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleUpdateSelectedItem = this.handleUpdateSelectedItem.bind(this);
    }

    handleUpdateSelectedItem(event, value) {
        console.log("handleUpdateSelectedItem", value);
        //this.props.onListItemClick(value);
    }

    render() {
        console.log("LeftNav props", this.props);

        return <div style={{width: "20%", float: "left"}}>
            <SelectableList
                valueLink={{value: this.props.selectedItem, requestChange: this.handleUpdateSelectedItem}}>

                {this.props.items.map(item => {
                    return <ListItem primaryText={item.label}
                                     value={item.value}
                                     key={item.value}
                                     onTouchTap={()=>(this.props.onItemClick(item.value))}/>;
                })}
                <Divider/>
                <ListItem primaryText="Watchlist"
                          value="watchlist"/>
                <ListItem primaryText="Watched"
                          value="watched"/>

            </SelectableList>
        </div>;
    }

}