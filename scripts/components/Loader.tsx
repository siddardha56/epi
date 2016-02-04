import React from 'react';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';

const style = {
    container: {
        position: 'relative',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

const Loader = () => (
    <div style={style.container}>
        <RefreshIndicator
            size={40}
            left={500}
            top={0}
            loadingColor={"#FF9800"}
            status="loading"
            style={style.refresh} />
    </div>
);

export default Loader;
