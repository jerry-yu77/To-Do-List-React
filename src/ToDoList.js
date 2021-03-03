import "./ToDoList.css";
import React, { Component } from 'react';
import TaskInput from './components/taskInput';
import TaskList from './components/taskList';
import DoneList from './components/doneList';

class ToDoList extends Component {
    state = {
        tasks: [],
        taskIndex: 1,
        finishedTasks: [],
    }
    render() { 
        return (
            <React.Fragment>
                <TaskInput 
                    onSubmitTask={this.handleSubmitTask}
                />
                <TaskList 
                    tasks={this.state.tasks}
                    handleTaskCheckbox={this.handleTaskCheckbox} 
                />
                <DoneList 
                    finishedTasks={this.state.finishedTasks} 
                    handleTaskCheckbox={this.handleTaskCheckbox} 
                    handleDelete={this.handleDelete}
                />
            </React.Fragment>
         );
    }

    handleSubmitTask = (task) => {
        let tasks = this.state.tasks;
        
        tasks.push({id: this.state.taskIndex++, value: task});
        this.setState(this.state);
    }

    handleTaskCheckbox = (id, e) => {
        this.moveTask(e.target.checked, id);
        this.setState(this.state);
    }

    moveTask = (checked, id) => {
        let sourceTasks = checked ? this.state.tasks : this.state.finishedTasks;
        let targetTasks = checked ? this.state.finishedTasks : this.state.tasks;
        let i;
        
        for (i = 0; i <= sourceTasks.length; i++) {
            if (sourceTasks[i].id === id) {
                targetTasks.push(sourceTasks[i]);
                sourceTasks.splice(i, 1);
                break;
            }
        }
    }

    handleDelete = (id) => {
        let finishedTasks = this.state.finishedTasks;
        let index = finishedTasks.findIndex((task) => task.id === id);

        finishedTasks.splice(index, 1);
        this.setState(this.state);
    }
}
 
export default ToDoList;
