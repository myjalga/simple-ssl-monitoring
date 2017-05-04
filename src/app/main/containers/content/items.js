
"use strict"

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Table from 'react-toolbox/lib/table';

import { 
    actionHandlePaginationChange,
    actionHandleSelectedItem 
} from '../../actions/action_manager';

const Pagination = require('react-bootstrap/lib/Pagination');
const ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
const DropdownButton = require('react-bootstrap/lib/DropdownButton');
const MenuItem = require('react-bootstrap/lib/MenuItem');

const UserModel = {
    host: {type: String},
    start: {type: String},
    end:   {type: String},
    expires: {type: String},
    status: {type: String}
};

let _src = [];
// for (let i = 0; i < 10; i++) {
//     _src = _src.concat({host: String(i), from: String(i), to: String(i), days: String(i)});
// }

class Items extends React.Component {
    state = { 
        selected: [],
        activePage: 1
    };

    handleChange = (row, key, value) => {
        // const source = this.state._src;
        // source[row][key] = value;
        // this.setState({source});
    };

    handleSelectPage(e) {
        let { actionHandlePaginationChange } = this.props;
        actionHandlePaginationChange(e)
    }

    handleSelect = (selected) => {
        let { actionHandleSelectedItem } = this.props;
        actionHandleSelectedItem(selected)
    };

    render () {
        return (
            <div class="col-lg-8 col-md-8 col-sm-8 col-lg-offset-2 col-md-offset-2 col-sm-offset-2" style={{padding: 0}}>
                <div style={{padding: '10px 0px 5px 0px', borderBottom: '1px solid #d3d3d3'}}>
                    <ButtonToolbar>
                        <DropdownButton bsSize="small" title="Action" id="dropdown-size-large">
                            <MenuItem eventKey="1">Add</MenuItem>
                            <MenuItem eventKey="2">Edit</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="4">Delete</MenuItem>
                        </DropdownButton>
                    </ButtonToolbar>
                </div>
                <div>
                    <Table
                        model={UserModel}
                        onChange={this.handleChange.bind(this)}
                        onSelect={this.handleSelect.bind(this)}
                        selectable
                        selected={this.props.manager.selected}
                        source={this.props.manager.source}
                    />
                </div>
                <div>
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={20}
                        maxButtons={5}
                        style={{float: 'right'}}
                        activePage={this.props.manager.activePage}
                        onSelect={this.handleSelectPage.bind(this)} />
                </div>
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
        actionHandlePaginationChange: actionHandlePaginationChange,
        actionHandleSelectedItem: actionHandleSelectedItem
    }, dispatch);
}

export default connect(mapStore, mapAction)(Items);