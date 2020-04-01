# Learn React Redux Application

## How this project was created

- `npm init react-app my-app`
- `cd my-app`
- `printf "/node_modules/\n/.cache/\n/.idea/\n/dist/\n" > .gitignore`
- `git init`
- `git add --all`
- `git commit -m "created learn-react-redux"`
- `npm install parcel-bundler --save-dev`
- `npm install ramda`
- `npm install redux`
- `npm install react-redux`

## How to run
- react sample
    - `./run-react-example.sh`
- react and state example
    - `./run-react-and-state-example.sh`

## Understand the types of react components
- dimension 1
    - Controlled Component
    - Uncontrolled Component
- dimension 2
    - Class Component
    - Functional Component


## Javascript tips

### Stringify omits some values
When you stringify an object, entries the library can't stringify are omitted.
For debugging, stringify the keys as well, like so:

`const stringifyObject = (object) => JSON.stringify({keys:Object.keys(object), object});`


### Get used to javascript destructuring

Lets say we have the following value

`const todoItem = { id:1, name: 'do something', completed:false }`

We can pull out individual values like this

```javascript
const id = todoItem.id;
const name = todoItem.name;
const completed = todoItem.completed;  
```

Or we can do the same thing with destructuring

`const {id, name, completed} = todoItem`

If we are only interested in some of the values, we can omit the ones we don't need

`const {name} = todoItem`

We can destructure right from the parameter list, the following are identical
- `const myFunction = (props) => console.log(props.name);`
- `const myFunction = ({name}) => console.log(name);`

When creating an object, there is a shorthand for when the variable name and field name are the same.
For example, as an alternative to this:

```javascript
const todoId = 1;
const todoName = 'do something';
const todoCompleted = false;
return {
  id:todoId,
  name:todoName,
  completed:todoCompleted
}
```

We can instead do this

```javascript
const id = 1;
const name = 'do something';
const completed = false;
return { id, name, completed }
```

### Treat Ramda as if it were a standard library

Read the entire [documentation](https://ramdajs.com/docs/).
Don't worry about trying to memorize anything.
Just make sure you know about the capabilities of Ramda. 