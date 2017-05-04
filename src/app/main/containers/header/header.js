

"use strict"

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showModalAddForm } from '../../actions/action_manager';

import _header from '../../scss/header/header.scss';

class Header extends React.Component {
    render () {
        return (
            <div class={`section ${_header.mainHeaderContainer}`}>
                <div class={`col-lg-6 col-md-6 col-sm-6 col-xs-6 ${_header.mainHeaderlayout}`} style={{paddingLeft: '10px'}}>
                    SSL Monitoring
                </div>
                <div class={`col-lg-6 col-md-6 col-sm-6 col-xs-6 ${_header.mainHeaderlayout}`}>
                    <ul class={_header.mainHeaderTools}>
                        <li>
                            <a onClick={()=>this.props.showModalAddForm(true)}>
                                Add SSL
                            </a>
                        </li>
                        <li>
                            <a href='/logout' style={{backgroundColor: 'red'}}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStore = (store) => {
    return {};
}

const mapAction = (dispatch) => {
    return bindActionCreators({
        showModalAddForm: showModalAddForm
    }, dispatch);
}

export default connect(mapStore, mapAction)(Header);