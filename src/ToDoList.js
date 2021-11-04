import "./ToDoList.css";
import model from './model';
import TaskInput from './components/taskInput';
import Tabs from './components/tabs';
import { StoreProvider, createStore } from 'easy-peasy';
import _ from 'lodash';

const store = createStore(model);
const ToDoList = () => {
    return (
        <StoreProvider store={store}>
            <div className="container">
                <TaskInput/>
                <Tabs/>
            </div>
        </StoreProvider>
    )
}
 
export default ToDoList;
