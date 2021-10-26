const Task = ({checked, handleTaskCheckbox, handleDelete, value}) => {
    const taskTextStyle = {
        textDecoration: checked ? "line-through" : ""
    };
    return (
        <li>
            <input 
                className="task-checkbox"
                type="checkbox"
                checked={checked}
                onChange={handleTaskCheckbox}
            />
            <span style={taskTextStyle}>
                {value}
            </span>
            <button
                className="badge badge-danger badge-pill mr-2 right-button"
                hidden={!checked}
                onClick={handleDelete}
            >
                Delete
            </button>
        </li>
    )
}
 
export default Task;
