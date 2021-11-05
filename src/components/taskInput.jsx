import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';

const TaskInput = () => {
    const activeTabID = useStoreState(state => state.activeTabID);
    const handleSubmitTask = useStoreActions(actions => actions.handleSubmitTask);
    const hasError = useStoreState(state => state.hasError);
    const updateError = useStoreActions(actions => actions.updateError);
    const disableInputs = activeTabID === 3;
    const display = {
        display: hasError ? "block" : "none"
    };
    const textChange = (e) => {
        if (hasError) {
            updateError(false);
        }
    };
    const onSubmit = (e) => {      
        e.preventDefault();
        if (e.target[0].value) {
            handleSubmitTask({
                checked: false,
                tabID: activeTabID,
                value: e.target[0].value
            });
            e.target[0].value = "";
        } else {
            updateError(true);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>To Do List:</h1>
            <div>
                <input 
                    disabled={disableInputs}
                    placeholder="Enter task here:"
                    onKeyPress={textChange}
                />
                <button
                    className="badge badge-primary badge-pill mr-2 right-button"
                    disabled={disableInputs}
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
