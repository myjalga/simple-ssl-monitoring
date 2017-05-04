
"use strict"

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Empty from './empty';

import Items from './items'

class Content extends React.Component {

    render () {
        let {manager} = this.props
        return (
            <div class="row" style={{padding: '40px 0px 0px 0px', margin: 0}}>
                {(manager.source.length > 0) ? <Items /> : <Empty />}
            </div>
        );
    }
}

const mapStore = (store) => {
    return {
        manager: store.manager
    };
}

const mapAction = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStore, mapAction)(Content);
