import "./ToDoList.css";
import TaskInput from './components/taskInput';
import TaskList from './components/taskList';
import DoneList from './components/doneList';
import { useState } from 'react';
import _ from 'lodash';

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [finishedTasks, setFinishedTasks] = useState([]);
    const handleSubmitTask = (task) => {
        let id = Math.floor(Math.random() * 999999);

        setTasks([...tasks, {id: id, value: task}]);
    };
    const handleTaskCheckbox = (id, e) => {
        let checked = e.target.checked;
        let sourceTasks = checked ? tasks : finishedTasks;
        let index = _.findIndex(sourceTasks, {id, id});

        if (checked) {
            setTasks(_.filter(tasks, (task) => task.id !== id));
            setFinishedTasks([...finishedTasks, sourceTasks[index]]);
        } else {
            setTasks([...tasks, sourceTasks[index]]);
            setFinishedTasks(_.filter(finishedTasks, (task) => task.id !== id));
        }           
    };
    const handleDelete = (id) => {
        setFinishedTasks(_.filter(finishedTasks, (task) => task.id !== id));
    };

    return (
        <div>
            <TaskInput 
                onSubmitTask={handleSubmitTask}
            />
            <TaskList 
                tasks={tasks}
                handleTaskCheckbox={handleTaskCheckbox} 
            />
            <DoneList 
                finishedTasks={finishedTasks}
                handleDelete={handleDelete}
                handleTaskCheckbox={handleTaskCheckbox} 
            />
        </div>
    )
}
 
export default ToDoList;
