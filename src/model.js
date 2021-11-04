import { action, thunk } from 'easy-peasy';
import _ from 'lodash';

const RESOURCE_ROUTE = "http://localhost:5000/tasks/";
const HEADER = { "Content-type": "application/json" };

export default {
    tasks: [],
    tabs: [{
        active: true,
        id: 1,
        label: "Personal"
        
    }, {
        active: false,
        id: 2,
        label: "Work"
    }],

    // Thunks
    fetchTasks: thunk(async (actions) => {
        // getting tasks from server
        const res = await fetch(RESOURCE_ROUTE);
        let tasks = await res.json();
        
        // sorting incomplete tasks to be on top
        tasks = _.sortBy(tasks, ["checked"]);

        actions.setTasks(tasks);
    }),
    handleSubmitTask: thunk(async (actions, task) => {
        // Inserting new task to server
        const res = await fetch(RESOURCE_ROUTE, {
            method: "POST",
            headers: HEADER,
            body: JSON.stringify(task)
        });
        const newTask = await res.json();
        actions.addTask(newTask);
    }),
    handleTaskCheckbox: thunk(async (actions, {e, id, tasks}) => {
        const checked = e.target.checked;
        const targetTask = _.find(tasks, {id, id});

        targetTask.checked = checked;
        // Updating task on server
        fetch(`${RESOURCE_ROUTE}${id}`, {
            method: "PUT",
            headers: HEADER,
            body: JSON.stringify(targetTask)
        });
        actions.updateCheckedTask(id);
    }),
    handleDelete: thunk(async (actions, id) => {
        // Deleting task on server
        await fetch(`${RESOURCE_ROUTE}${id}`, {
            method: "DELETE"
        });
        actions.deleteTask(id);
    }),

    // Actions
    tabChanged: action((state, tabID) => {
        state.tabs = state.tabs.map((tab) => { 
            return {...tab, active: tab.id === tabID};
        });
    }),
    setTasks: action((state, tasks) => {
        state.tasks = tasks;
    }),
    addTask: action((state, task) => {
        state.tasks = [...state.tasks, task];
    }),
    updateCheckedTask: action((state, id) => {
        const targetTask = _.find(state.tasks, {id, id});
        const filteredTasks = _.filter(state.tasks, (task) => task.id !== id);
        
        if (targetTask.checked) {
            state.tasks = [...filteredTasks, targetTask];
        } else {
            state.tasks = [targetTask, ...filteredTasks];
        }
    }),
    deleteTask: action((state, id) => {
        state.tasks = _.filter(state.tasks, (task) => task.id !== id);
    })
}
