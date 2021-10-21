const Task = ({checked, handleTaskCheckbox, handleDelete, value}) => {
    const taskTextStyle = {
        textDecoration: checked ? "line-through" : ""
    };
    return (
        <div>
            <input 
                className="task-checkbox"
                type="checkbox"
                checked={checked}
                onChange={handleTaskCheckbox}
            />
            <button
                className="badge badge-danger badge-pill mr-2"
                hidden={!checked}
                onClick={handleDelete}
            >
                Delete
            </button>
            <span style={taskTextStyle}>
                {value}
            </span>
        </div>
    )
}
 
export default Task;
