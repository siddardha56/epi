import React from 'react';
import './header.scss';

export default class Nav extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <header>
            <div className="inner">
                <nav>
                    <a href="#" className="logo">Epi</a>
                    <input type="checkbox" id="nav" /><label for="nav"></label>
                    <ul>
                        <li><a href="#">Movies</a></li>
                        <li>
                            <a href="#">TV</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
            ;
    }
}

