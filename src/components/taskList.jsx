import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Task from './task';

const TaskList = () => {
    const tasks = useStoreState(state => state.tasks);
    const fetchTasks = useStoreActions(actions => actions.fetchTasks);

    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line
    }, []);

    return (
        <ul>
            {tasks.map(({checked, id, tabID, value}) => 
                <Task 
                    checked={checked}
                    key={id}
                    id={id}
                    tabID={tabID}
                    value={value}
                />
            )}
        </ul>
    );
}

export default TaskList
