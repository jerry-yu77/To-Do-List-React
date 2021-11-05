import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';

const Tab = ({label, id}) => {
    const tabChanged = useStoreActions(actions => actions.tabChanged);
    const activeTabID = useStoreState(state => state.activeTabID);
    let className = "tab"

    if (id === activeTabID) {
        className += " active-tab";
    } else {
        className += " inactive-tab";
    }
    return (
        <li className={className}
            onClick={() => tabChanged(id)}
        >
            {label}
        </li>
    );
}

export default Tab
