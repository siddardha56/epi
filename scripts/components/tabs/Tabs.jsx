import React from 'react';
import './tabs.scss';

export default class Tabs extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div className="tabs">
            <ul>
                <li className="tab-item">
                    <a href="#">Now playing</a>
                </li>
                <li className="tab-item">
                    <a href="#">Popular</a>
                </li>
                <li className="tab-item">
                    <a href="#">Upcoming</a>
                </li>
                <li className="tab-item">
                    <a href="#">Top Rated</a>
                </li>

            </ul>
        </div>;
    }
}

