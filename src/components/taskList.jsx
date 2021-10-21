import Task from './task';

const TaskList = ({tasks, handleTaskCheckbox}) => {
    return (
        <div>
            {tasks.map(task => 
                <Task 
                    key={task.id} 
                    value={task.value} 
                    handleTaskCheckbox={(e) => handleTaskCheckbox(task.id, e)} 
                />
            )}
        </div>
    )
}

export default TaskList
