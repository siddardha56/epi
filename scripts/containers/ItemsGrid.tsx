import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './pages/page.scss';
import './items-grid.scss';

interface ItemsGridProps {
    onItemClick: Function
}

interface ItemsGridState {
    onHoverItemId: number
}

export default class ItemsGrid extends React.Component<ItemsGridProps, ItemsGridState> {

    constructor(props, context) {
        super(props, context);

        this.onCardMouseEnter = this.onCardMouseEnter.bind(this);
        this.onCardMouseLeave = this.onCardMouseLeave.bind(this);
        this.state = {onHoverItemId: -1};
    }

    onCardMouseEnter(itemId) {
        this.setState({onHoverItemId: itemId});
    }

    onCardMouseLeave(itemId) {
        this.setState({onHoverItemId: -1});
    }

    render() {
        let items = this.props.items.get('results') || [];

        return <div className="right">
            <div className="row">
                {items.map(item => {
                    let posterURL = (item.get('poster_path') ? 'http://image.tmdb.org/t/p/w300' + item.get('poster_path') : '');

                    return <div className="col-1-4" key={item.get('id')}
                                onClick={()=>(this.props.onItemClick(item.get('id')))}>
                        <div>
                            <img className="grid-item-image" src={posterURL} style={{width: '187px', height: '280px'}}/>
                        </div>
                        <div className="grid-item-text">{item.get('title') || item.get('name')}</div>
                    </div>
                    })}
            </div>
        </div>;
    }
}
