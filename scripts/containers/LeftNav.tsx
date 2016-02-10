import * as React from 'react';
import './left-nav.scss';

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

        //TODO selected item highlight
        return <div className="left-nav">
            <ul>
                {this.props.items.map(item => {
                    return <li key={item.value} onClick={()=>(this.props.onItemClick(item.value))}>{item.label}</li>
                })}
            </ul>
        </div>;
    }

}