import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';
import * as R from 'ramda';

const initialState = {
    uri: '',
    result: undefined
};

const URI_CHANGED = 'URI_CHANGED';
const URI_KEY_UP = 'URI_KEY_UP';

const uriChanged = (state, uri) => {
    return R.mergeRight(state, {uri});
};

const uriKeyUp = (state, key) => {
    if (key === "Enter") {
        console.log('state.uri', state.uri);
    }
    return state;
};

const reducer = (state, event) => {
    const type = event.type;
    switch (type) {
        case URI_CHANGED:
            return uriChanged(state, event.uri);
        case URI_KEY_UP:
            return uriKeyUp(state, event.key);
        default:
            return state;
    }
};

function Browser() {
    let [state, dispatch] = useReducer(reducer, initialState);
    const {uri} = state;
    const loggingDispatch = (event) => {
        console.log('state (before)', state);
        console.log('event', event);
        dispatch(event);
        console.log('state (after)', state);
    };
    const onChange = (event) => loggingDispatch({type: URI_CHANGED, uri: event.target.value});
    const onKeyUp = (event) => {
        loggingDispatch({type: URI_KEY_UP, key: event.key});
    };
    return (
        <>
            <input autoFocus={true}
                   placeholder={'type uri here'}
                   value={uri}
                   onChange={onChange}
                   onKeyUp={onKeyUp}
            />
        </>
    );
}

ReactDOM.render(<Browser/>, document.querySelector('#main'));
