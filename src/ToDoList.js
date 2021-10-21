import "./ToDoList.css";
import TaskInput from './components/taskInput';
import TaskList from './components/taskList';
import { useState } from 'react';
import _ from 'lodash';

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const handleSubmitTask = (task) => {
        let id = Math.floor(Math.random() * 999999);
        setTasks([...tasks, {checked: false, id: id, value: task}]);
    };
    const handleTaskCheckbox = (id, e) => {
        let checked = e.target.checked;
        let targetTask = _.find(tasks, {id, id});
        let filteredTasks = _.filter(tasks, (task) => task.id !== id);

        targetTask.checked = checked;
        if (checked) {
            setTasks([...filteredTasks, targetTask]);
        } else {
            setTasks([targetTask, ...filteredTasks]);
        }
    };
    const handleDelete = (id) => {
        setTasks(_.filter(tasks, (task) => task.id !== id));
    };

    return (
        <div>
            <TaskInput 
                onSubmitTask={handleSubmitTask}
            />
            <TaskList 
                tasks={tasks}
                handleDelete={handleDelete}
                handleTaskCheckbox={handleTaskCheckbox} 
            />
        </div>
    )
}
 
export default ToDoList;
