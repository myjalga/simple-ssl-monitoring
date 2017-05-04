

"use strict"

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showModalAddForm } from '../../actions/action_manager';

import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import Checkbox from 'react-toolbox/lib/checkbox';
import DatePicker from 'react-toolbox/lib/date_picker';

class Add extends React.Component {
    
    state = {
        host: '',
        email: '',
        phone: '',
        manual: false,
        start: '',
        end: ''
    }

    handleChange(name, value) {
        this.setState({...this.state, [name]: value});
    }

    handleSubmit = () => {
        $.ajax({
            type: 'POST',
            url: '/api/add',
            data: JSON.stringify(this.state),
            contentType: 'application/json',
            success: function (response) {
                this.props.onChange();
                this.props.showModalAddForm(false);
                this.setState({
                    host: '',
                    email: '',
                    phone: '',
                    manual: false,
                    start: '',
                    end: ''
                });
            }.bind(this)
        });
        
    }

    handleCancel = () => {
        this.props.showModalAddForm(false);
    }

    actions = [
        { label: "Cancel", onClick: this.handleCancel },
        { label: "Save", onClick: this.handleSubmit }
    ];

    
    manual () {
        return (
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding: 0, margin: 0}}>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <DatePicker label='Start Date' sundayFirstDayOfWeek onChange={this.handleChange.bind(this, 'start')} value={this.state.start} />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <DatePicker label='End Date' sundayFirstDayOfWeek onChange={this.handleChange.bind(this, 'end')} value={this.state.end} />
                </div>
            </div>
        );
    }

    render () {
        let {manager} = this.props;
        return (
            <Dialog
                actions={this.actions}
                active={manager.showAddForm}
                onEscKeyDown={this.handleToggle}
                onOverlayClick={this.handleToggle}
                title='Add SSL'>
                <Input type='text' label='Host Name' name='host' value={this.state.host} onChange={this.handleChange.bind(this, 'host')} />
                <Input type='text' label='E-mail' name='email' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
                <Input type='text' label='Phone Number' name='phone' value={this.state.phone} onChange={this.handleChange.bind(this, 'phone')} />
                <Checkbox
                    checked={this.state.manual}
                    label="Manual option"
                    onChange={this.handleChange.bind(this, 'manual')}
                    />
                {
                    this.state.manual ? this.manual() : null
                }
            </Dialog>
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
        showModalAddForm: showModalAddForm
    }, dispatch);
}

export default connect(mapStore, mapAction)(Add);