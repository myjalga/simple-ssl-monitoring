

"use strict"

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showModalAddForm } from '../../actions/action_manager';

let style = {
    padding: '30px 10px',
    textAlign: 'center'
}

class Empty extends React.Component {
    render () {
        let { showModalAddForm } = this.props;
        return (
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={style}>
                <h3><strong>No Results Found</strong></h3>
                <p>Please click the button below to add SSL to monitor.</p>
                <div style={{marginTop: '20px'}}>
                    <button 
                        onClick={()=>showModalAddForm(true)}
                        class="btn btn-success">
                        Add SSL
                    </button>
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

export default connect(mapStore, mapAction)(Empty);