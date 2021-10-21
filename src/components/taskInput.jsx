const TaskInput = (props) => {
    const submitTask = (e) => {
        if (e.key === "Enter") {
            props.onSubmitTask(e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div>
            <h1>To Do List:</h1>
            <input 
                placeholder="Enter task here:"
                onKeyPress={submitTask} 
            />
        </div>
    )
}

export default TaskInput
