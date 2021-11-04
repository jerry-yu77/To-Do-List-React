import "./ToDoList.css";
import model from './model';
import TaskInput from './components/taskInput';
import TaskList from './components/taskList';
import { StoreProvider, createStore } from 'easy-peasy';
import _ from 'lodash';

const store = createStore(model);
const RESOURCE_ROUTE = "http://localhost:5000/tasks/";
const HEADER = { "Content-type": "application/json" };

const ToDoList = () => {
    return (
        <StoreProvider store={store}>
            <div className="container">
                <TaskInput/>
                <TaskList/>
            </div>
        </StoreProvider>
    )
}
 
export default ToDoList;
