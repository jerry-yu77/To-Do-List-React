import { useStoreState } from 'easy-peasy';
import Notes from './notes';
import Tab from './tab';
import TaskList from './taskList';

const Tabs = () => {
    const tabs = useStoreState(state => state.tabs);
    const activeTabID = useStoreState(state => state.activeTabID);
    let tabPane = "";

    switch(activeTabID) {
        case 1:
        case 2: 
            tabPane = <TaskList/>;
            break;
        case 3:
            tabPane = <Notes/>;
            break;
    }

    return (
        <div className="tabs">
            <ul className="tab-list">
                {tabs.map((tab) => 
                    <Tab
                        key={tab.id}
                        {...tab}
                    />
                )}
            </ul>
            {tabPane}
        </div>
    );
}

export default Tabs
