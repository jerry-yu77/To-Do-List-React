import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

const TaskInput = () => {
    const [hasError, setHasError] = useState(false);
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
        e.preventDefault();
        if (e.target[0].value) {
            handleSubmitTask({
                checked: false,
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
    )
}

export default TaskInput
