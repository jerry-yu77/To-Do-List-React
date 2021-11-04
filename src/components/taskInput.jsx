import { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';

const TaskInput = () => {
    const [hasError, setHasError] = useState(false);
    const tabs = useStoreState(state => state.tabs);
    const handleSubmitTask = useStoreActions(actions => actions.handleSubmitTask);
    const display = {
        display: hasError ? "block" : "none"
    };
    const textChange = (e) => {
        if (hasError) {
            setHasError(false);
        }
    };
    const onSubmit = (e) => {
        const tabID = _.find(tabs, {active: true}).id;
        
        e.preventDefault();
        if (e.target[0].value) {
            handleSubmitTask({
                checked: false,
                tabID: tabID,
                value: e.target[0].value
            });
            e.target[0].value = "";
        } else {
            setHasError(true);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>To Do List:</h1>
            <div>
                <input 
                    placeholder="Enter task here:"
                    onKeyPress={textChange}
                />
                <button
                    className="badge badge-primary badge-pill mr-2 right-button"
                >
                    Add
                </button>
            </div>
            <div 
                className="error-msg"
                style={display}
            >
                Please enter a task.
            </div>
        </form>
    );
}

export default TaskInput
