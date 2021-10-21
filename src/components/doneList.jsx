import Task from './task';

const DoneList = ({finishedTasks, handleDelete, handleTaskCheckbox}) => {
    return (
        <div>
            {finishedTasks.map(task => 
                <Task
                    checked={true}
                    key={task.id}
                    value={task.value}
                    handleTaskCheckbox={(e) => handleTaskCheckbox(task.id, e)}
                    handleDelete={() => handleDelete(task.id)}
                />
            )}
        </div>
    )
}

export default DoneList
