import React from 'react';
import ReactDOM from 'react-dom';
import * as R from 'ramda';

const state = {
    todoItems: [
        {
            id: 1,
            name: 'task a',
            completed: false
        },
        {
            id: 2,
            name: 'task b',
            completed: true
        },
        {
            id: 3,
            name: 'task c',
            completed: false
        },
    ]
};

const stringify = (value) => {
    const type = typeof value;
    if (type === "object") {
        return JSON.stringify({keys: Object.keys(value), value});
    } else {
        return JSON.stringify(value)
    }
};

const TodoInput = (props) => {
    return (<div>
        <span>{stringify(props)}</span>
        <input autoFocus={true}
               placeholder={'task name'}
        /></div>)
};

const TodoItem = (props) => {
    const {
        id,
        name,
        completed
    } = props;
    const className = completed ? "completed" : "not-completed";
    return (<li className={className}>item {stringify(props)}</li>);
};

const TodoList = (props) => {
    const {todoItems} = props;
    const createElement = (todoItem) => {
        return (<TodoItem key={todoItem.id}{...todoItem}/>)
    };
    const elements = R.map(createElement, todoItems);
    return (<div>
        <span>{stringify(props)}</span>
        <ul>{elements}</ul>
    </div>)

};

const TodoClearCompleted = (props) => {
    return (<div>
        <span>{stringify(props)}</span>
        <button>Clear</button>
    </div>)
};

const Index = (props) => {
    return (
        <div>
            <TodoInput/>
            <TodoList todoItems={state.todoItems}/>
            <TodoClearCompleted/>
        </div>
    );
};

ReactDOM.render(<Index/>, document.querySelector('#main'));
