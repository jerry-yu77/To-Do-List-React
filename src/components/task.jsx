import React, { Component } from 'react';

class Task extends Component {
    render() {
        const taskTextStyle = {
            textDecoration: this.props.checked ? "line-through" : ""
        };

        return ( 
            <div>
                <input 
                    className="task-checkbox"
                    type="checkbox"
                    checked={this.props.checked}
                    onChange={this.props.handleTaskCheckbox}
                />
                <button
                    className="badge badge-danger badge-pill mr-2"
                    hidden={!this.props.checked}
                    onClick={this.props.handleDelete}
                >
                    Delete
                </button>
                <span style={taskTextStyle}>
                    {this.props.value}
                </span>
            </div>
        );
    }
}
 
export default Task;
