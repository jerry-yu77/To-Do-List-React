import React, { Component } from 'react';
import Task from './task';

class TaskList extends Component {
    render() { 
        return (  
            <div>
                {this.props.tasks.map(task => 
                    <Task 
                        key={task.id} 
                        value={task.value} 
                        handleTaskCheckbox={this.props.handleTaskCheckbox.bind(this, task.id)} 
                    />
                )}
            </div>
        );
    }    
}
 
export default TaskList;
