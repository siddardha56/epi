import * as React from 'react';
import './header.scss';

interface NavProps {

}

interface NavState{

}

export default class Nav extends React.Component<NavProps, NavState> {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <header>
            <div className="inner">
                <nav>
                    <a href="#" className="logo">Epi</a>
                    <input type="checkbox" id="nav" />
                    <label htmlFor="nav"></label>
                    <ul>
                        <li><a href="/movies?sortBy=popular">Movies</a></li>
                        <li>
                            <a href="/tv?sortBy=popular">TV</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
            ;
    }
}

