import { useStoreState, useStoreActions } from 'easy-peasy';
import Tab from './tab';
import TaskList from './taskList';

const Tabs = () => {
    const tabs = useStoreState(state => state.tabs);

    return (
        <div className="tabs">
            <ul className="tab-list">
                {tabs.map(({label, id}) => 
                    <Tab
                        label={label}
                        key={id}
                        id={id}
                    />
                )}
            </ul>
            <TaskList/>
        </div>
    );
}

export default Tabs
