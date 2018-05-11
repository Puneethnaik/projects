
import React, { Component } from 'react';
 
import ReactDOM from 'react-dom';

import {withTracker} from 'meteor/react-meteor-data'
import {Tasks} from '../api/tasks.js';

import Task from './Task.js';
import { ENGINE_METHOD_DIGESTS } from 'constants';
 
// App component - represents the whole app
 class App extends Component {
 
    handleSubmit(event){
        event.preventDefault();
        
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
            text, 
            createdAt: new Date(),
        })
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
 
  render() {
    return (
    <div className = "container">
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
      <div className = "container">
        <form className = "new_task" onSubmit = {this.handleSubmit.bind(this)}>
            <input type = "text" ref = "textInput" placeholder = "Add new item" />
            <input type = "submit" />
        </form>
      </div>
    </div>
    );
  }
}

export default withTracker(() => {
    return {
        tasks : Tasks.find({}, {sort: {createdAt : -1}}).fetch(),
    };
})(App);