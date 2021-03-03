import React, { Component } from 'react';
import Task from './task';

class DoneList extends Component {
    render() { 
        return (  
            <div>
                {this.props.finishedTasks.map(task => 
                    <Task
                        checked={true}
                        key={task.id}
                        value={task.value}
                        handleTaskCheckbox={this.props.handleTaskCheckbox.bind(this, task.id)}
                        handleDelete={this.props.handleDelete.bind(this, task.id)}
                    />
                )}
            </div>
        );
    }
}
 
export default DoneList;
