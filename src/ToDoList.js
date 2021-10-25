import "./ToDoList.css";
import TaskInput from './components/taskInput';
import TaskList from './components/taskList';
import { useState, useEffect } from 'react';
import _ from 'lodash';

const RESOURCE_ROUTE = "http://localhost:5000/tasks/";
const HEADER = { "Content-type": "application/json" };

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        const getTasks = async () => {
            setTasks(await fetchTasks());
        };
        getTasks();
    }, []);
    const fetchTasks = async () => {
        const res = await fetch(RESOURCE_ROUTE);
        return res.json();
    };
    const handleSubmitTask = async (task) => {
        // Inserting new task to server
        const res = await fetch(RESOURCE_ROUTE, {
            method: "POST",
            headers: HEADER,
            body: JSON.stringify(task)
        });
        const newTask = await res.json();
        setTasks([...tasks, newTask]);
    };
    const handleTaskCheckbox = (id, e) => {
        const checked = e.target.checked;
        const targetTask = _.find(tasks, {id, id});
        const filteredTasks = _.filter(tasks, (task) => task.id !== id);

        targetTask.checked = checked;
        
        // Updating task on server
        fetch(`${RESOURCE_ROUTE}${id}`, {
            method: "PUT",
            headers: HEADER,
            body: JSON.stringify(targetTask)
        });
        
        if (checked) {
            setTasks([...filteredTasks, targetTask]);
        } else {
            setTasks([targetTask, ...filteredTasks]);
        }
    };
    const handleDelete = async (id) => {
        // Deleting task on server
        await fetch(`${RESOURCE_ROUTE}${id}`, {
            method: "DELETE"
        });
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
