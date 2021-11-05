import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';

const Task = ({checked, id, tabID, value}) => {
    const activeTabID = useStoreState(state => state.activeTabID);
    const tasks = useStoreState(state => state.tasks);
    const taskTextStyle = {
        textDecoration: checked ? "line-through" : ""
    };
    const handleTaskCheckbox = useStoreActions(actions => actions.handleTaskCheckbox);
    const handleDelete = useStoreActions(actions => actions.handleDelete);
    const onCheckboxChange = (e) => {
        const args = {
            e: e,
            id: id,
            tasks: tasks
        }
        handleTaskCheckbox(args);
    };
    
    return activeTabID === tabID ? (
        <li>
            <input 
                className="task-checkbox"
                type="checkbox"
                checked={checked}
                onChange={onCheckboxChange}
            />
            <span style={taskTextStyle}>
                {value}
            </span>
            <button
                className="badge badge-danger badge-pill mr-2 right-button"
                hidden={!checked}
                onClick={() => handleDelete(id)}
            >
                Delete
            </button>
        </li>
    ) : "";
}
 
export default Task;
