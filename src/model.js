import { action, thunk } from 'easy-peasy';
import _ from 'lodash';

const NOTES_RESOURCE_ROUTE = "http://localhost:5000/notes/";
const TASKS_RESOURCE_ROUTE = "http://localhost:5000/tasks/";
const HEADER = { "Content-type": "application/json" };

export default {
    activeTabID: 1,
    hasError: false,
    notes: [],
    tabs: [{
        active: true,
        id: 1,
        label: "Personal"
        
    }, {
        active: false,
        id: 2,
        label: "Work"
    }, {
        active: false,
        id: 3,
        label: "Notes"
    }],
    tasks: [],

    // Thunks

    // Task thunks
    fetchTasks: thunk(async (actions) => {
        // getting tasks from server
        const res = await fetch(TASKS_RESOURCE_ROUTE);
        let tasks = await res.json();
        
        // sorting incomplete tasks to be on top
        tasks = _.sortBy(tasks, ["checked"]);

        actions.setTasks(tasks);
    }),
    handleDelete: thunk(async (actions, id) => {
        // Deleting task on server
        await fetch(`${TASKS_RESOURCE_ROUTE}${id}`, {
            method: "DELETE"
        });
        actions.deleteTask(id);
    }),
    handleSubmitTask: thunk(async (actions, task) => {
        // Inserting new task to server
        const res = await fetch(TASKS_RESOURCE_ROUTE, {
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
        fetch(`${TASKS_RESOURCE_ROUTE}${id}`, {
            method: "PUT",
            headers: HEADER,
            body: JSON.stringify(targetTask)
        });
        actions.updateCheckedTask(id);
    }),
    
    // Notes thunks
    fetchNotes: thunk(async (actions) => {
        // getting notes from server
        const res = await fetch(NOTES_RESOURCE_ROUTE);
        let notes = await res.json();

        actions.updateNotes(notes);
    }),
    saveNotes: thunk(async (actions, notes) => {
        let res;
        // Saving notes to server
        // if id is passed, update existing notes, else create new notes for the first time
        if (notes.id) {
            res = await fetch(`${NOTES_RESOURCE_ROUTE}${notes.id}`, {
                method: "PUT",
                headers: HEADER,
                body: JSON.stringify(notes)
            });
        } else {
            res = await fetch(NOTES_RESOURCE_ROUTE, {
                method: "POST",
                headers: HEADER,
                body: JSON.stringify(notes)
            });
        }
        const newNotes = await res.json();
        actions.updateNotes(newNotes);
    }),

    // Actions

    // Tab actions
    tabChanged: action((state, tabID) => {
        state.tabs = state.tabs.map((tab) => { 
            return {...tab, active: tab.id === tabID};
        });
        state.activeTabID = tabID;
        state.hasError = false;
    }),
    
    // Task actions
    addTask: action((state, task) => {
        state.tasks = [...state.tasks, task];
    }),
    deleteTask: action((state, id) => {
        state.tasks = _.filter(state.tasks, (task) => task.id !== id);
    }),
    setTasks: action((state, tasks) => {
        state.tasks = tasks;
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

    // Error actions
    updateError: action((state, hasError) => {
        state.hasError = hasError;
    }),

    // Notes actions
    updateNotes: action((state, notes) => {
        state.notes = notes;
    })
}
