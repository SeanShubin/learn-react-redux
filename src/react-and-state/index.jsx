import React from 'react';
import ReactDOM from 'react-dom';
import * as R from 'ramda';

const CREATE_ITEM = 'TODO/CREATE_ITEM';
const TOGGLE_ITEM = 'TODO/TOGGLE_ITEM';
const CLEAR_COMPLETED = 'TODO/CLEAR_COMPLETED';

const createItemEvent = (name) => {
    return {type: CREATE_ITEM, name};
};
const toggleItemEvent = (id) => {
    return {type: TOGGLE_ITEM, id};
};
const clearCompletedEvent = () => {
    return {type: CLEAR_COMPLETED};
};

const initialState = {
    nextId: 1,
    todoItems: []
};

const stringify = (value) => {
    const type = typeof value;
    if (type === "object") {
        return JSON.stringify({keys: Object.keys(value), value});
    } else {
        return JSON.stringify(value)
    }
};

const todoCreateItem = (state, name) => {
    const completed = false;
    const id = state.nextId;
    const todoItems = R.append({name, completed, id}, state.todoItems);
    const nextId = state.nextId + 1;
    return {nextId, todoItems};
};

const todoToggleItem = (state, id) => {
    const toggleItemIfIdMatches = (todoItem) => {
        if (id === todoItem.id) {
            const completed = !todoItem.completed;
            return R.mergeRight(todoItem, {completed});
        } else {
            return todoItem;
        }
    };
    const todoItems = R.map(toggleItemIfIdMatches, state.todoItems);
    return R.mergeRight(state, {todoItems});
};

const todoClearCompleted = (state) => {
    const isCompleted = (todoItem) => todoItem.completed;
    const todoItems = R.filter(R.compose(R.not, isCompleted), state.todoItems);
    return R.mergeRight(state, {todoItems});
};

const reducer = (state, event) => {
    const type = event.type;
    switch (type) {
        case CREATE_ITEM:
            return todoCreateItem(state, event.name);
        case TOGGLE_ITEM:
            return todoToggleItem(state, event.id);
        case CLEAR_COMPLETED:
            return todoClearCompleted(state);
        default:
            return state;
    }
};

const TodoInput = (props) => {
    let [name, setName] = React.useState('');
    const {todoItemCreateEvent} = props;
    const onChange = (event) => setName(event.target.value);
    const onKeyUp = event => {
        if (event.key === 'Enter') {
            todoItemCreateEvent({name});
            setName('');
        }
    };
    return (<div>
        <span>{stringify(props)}</span>
        <input autoFocus={true}
               placeholder={'task name'}
               value={name}
               onChange={onChange}
               onKeyUp={onKeyUp}
        /></div>)
};

const TodoItem = (props) => {
    const {
        id,
        name,
        completed,
        todoItemToggleEvent
    } = props;
    const onMouseDown = () => {
        todoItemToggleEvent({id});
    };
    const className = completed ? "completed" : "not-completed";
    return (<li className={className}
                onMouseDown={onMouseDown}>item {stringify(props)}</li>);
};

const TodoList = (props) => {
    const {todoItemToggleEvent, todoItems} = props;
    const createElement = (todoItem) => {
        const {id, name, completed} = todoItem;
        const elementProps = {
            id,
            name,
            completed,
            todoItemToggleEvent
        };
        return (<TodoItem key={id}{...elementProps}/>)
    };
    const elements = R.map(createElement, todoItems);
    return (<div>
        <span>{stringify(props)}</span>
        <ul>{elements}</ul>
    </div>)

};

const TodoClearCompleted = (props) => {
    const {todoClearEvent} = props;
    const onClick = () => todoClearEvent();
    return (<div>
        <span>{stringify(props)}</span>
        <button onClick={onClick}>Clear</button>
    </div>)
};

const Index = (props) => {
    let [state, setState] = React.useState(initialState);
    const handleEvent = (event) => {
        console.log('state (before)', state);
        console.log('event', event);
        setState(reducer(state, event));
        console.log('state (after)', state);
    };
    const todoItemCreateEvent = ({name}) => {
        handleEvent(createItemEvent(name));
    };
    const todoItemToggleEvent = ({id}) => {
        handleEvent(toggleItemEvent(id));
    };
    const todoClearEvent = () => {
        handleEvent(clearCompletedEvent());
    };
    return (
        <div>
            <TodoInput todoItemCreateEvent={todoItemCreateEvent}/>
            <TodoList
                todoItemToggleEvent={todoItemToggleEvent}
                todoItems={state.todoItems}
            />
            <TodoClearCompleted todoClearEvent={todoClearEvent}/>
        </div>
    );
};

ReactDOM.render(<Index/>, document.querySelector('#main'));
