import React, {Component} from 'react'

import { Tasks } from '../api/tasks.js';

export default class Task extends Component{
    toggleChecked(){
        Tasks.update(this.props.task._id, {$set : !this.props.task._id});
    }
    deleteThisTask(){
        Tasks.remove(this.props.task._id);
    }
    render(){
        const liName = this.props.task.checked ? 'checked' : '';
        return (
            <li className = {liName}> <button onClick = {this.deleteThisTask.bind(this)}>&times;</button> <input type = "checkbox" readOnly checked = {this.props.task.checked} onClick = {this.toggleChecked.bind(this)} /> <span>{this.props.task.text}</span></li>
        );
    }
}