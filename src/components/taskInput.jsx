import React, { Component } from 'react';

class TaskInput extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>To Do List:</h1>
                <input 
                    placeholder="Enter task here:"
                    onKeyPress={this.submitTask.bind(this)} 
                />
            </React.Fragment>
        );
    }

    submitTask(e) {
        if (e.key === "Enter") {
            this.props.onSubmitTask(e.target.value);
            e.target.value = "";
        }
    }
}

export default TaskInput;
