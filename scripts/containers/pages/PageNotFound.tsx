import * as React from 'react';

interface PageNotFoundProps {}

interface PageNotFoundState {}

export default class PageNotFound extends React.Component<PageNotFoundProps, PageNotFoundState> {
    constructor(props, context) {
        super(props, context);
    }

    render () {
        return <div>
            Page Not Found
        </div>
    }
}