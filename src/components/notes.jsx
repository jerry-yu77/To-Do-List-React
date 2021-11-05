import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';

const Notes = () => {
    const fetchNotes = useStoreActions(actions => actions.fetchNotes);
    const saveNotes = useStoreActions(actions => actions.saveNotes);
    const onSubmit = (e) => {
        let newNotes = {
            value: e.target[0].value
        };
        e.preventDefault();

        // if there are existing notes, pass in existing notes id of '1' to update existing notes
        if (notes.length > 0) {
            _.extend(newNotes, {id: 1});
        }
        saveNotes(newNotes);
    };
    const notes = useStoreState(state => state.notes);
    const notesValue = notes.length > 0 ? notes[0].value : "";
    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line
    }, []);
    
    return (
        <form onSubmit={onSubmit}>
            <div>
                <textarea
                    className="notes-field"
                    placeholder="Enter notes here:"
                    defaultValue={notesValue}
                >
                </textarea>
            </div>
            <button
                className="badge badge-primary badge-pill mr-2 right-button"
            >
                Save
            </button>
        </form>
    )
}

export default Notes
