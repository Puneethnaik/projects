import React, {Component} from 'react'

import { Tasks } from '../api/tasks.js';

export default class Task extends Component{
    render(){   
        const liName = this.props.task.checked ? 'checked' : '';
        return (
            <li className = {liName}>
                <button onClick = {this.deleteEntry.bind(this)}> &times; </button>
                <input type = "checkbox" readOnly checked = {this.props.task.checked} />
                <span> {this.props.task.text}</span>
            </li>
        );                                                                                                  
    }
}