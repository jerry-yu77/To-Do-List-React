import Task from './task';

const TaskList = ({tasks, handleDelete, handleTaskCheckbox}) => {
    return (
        <ul>
            {tasks.map(({checked, id, value}) => 
                <Task 
                    checked={checked}
                    key={id} 
                    value={value}
                    handleTaskCheckbox={(e) => handleTaskCheckbox(id, e)}
                    handleDelete={() => handleDelete(id)}
                />
            )}
        </ul>
    )
}

export default TaskList
