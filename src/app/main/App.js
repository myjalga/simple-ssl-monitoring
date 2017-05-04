

"use strict"

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from './containers/header/header';
import Content from './containers/content/content';
import Add from './containers/modal/add';

import { actionOnChangeItems } from './actions/action_manager';

const bodStyle = {
    height: '100%', 
    width: '100%', 
    position: 'absolute'
};

const contentStyle = {
    width: '100%',  
    padding: 0, 
    height: '100%',
    margin: '100px 0px 0px 0px'
};


/*class App extends React.Component {
    render () {
        return (
            <div style={bodStyle}>
                <div style={contentStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}*/


class App extends React.Component {
    
    itemOnChange() {
        $.ajax({
            type: 'GET',
            url: '/api/data',
            contentType: 'application/json',
            success: function (response) {
                console.log(`[ ${new Date()} ]`, response);
                this.props.actionOnChangeItems(response);
            }.bind(this)
        });
    }

    componentWillMount() {
        this.itemOnChange();
    }

    render () {

        return (
            <div style={{width: '100%', padding: 0, margin: 0}}>
                <Header />
                <Content onChange={()=>this.itemOnChange()}/>
                <Add onChange={()=>this.itemOnChange()}/>
            </div>
        );
    }
}

const mapStore = (store) => {
    return {
        manager: store.manager
    }
}

const mapAction = (dispatch) => {
    return bindActionCreators({
        actionOnChangeItems: actionOnChangeItems
    }, dispatch);
}


export default connect(mapStore, mapAction)(App);