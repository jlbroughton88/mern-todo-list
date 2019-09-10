import React, { Component } from "react"
import styled from "styled-components"

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        }
    }


    componentDidMount() {
        this.getTodos();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getTodos = () => {        
        let todosTho = this.state.todos
        this.setState(todosTho)   
        // fetch todos, setState
        fetch("/api/todos")
            .then(res => res.json())
            .then(todos => this.setState({ todos }, () => console.log(this.state.todos)))
            .catch(err => console.log(err))
     
    };

    handleSubmit = (e) => {
        e.preventDefault()
        const data = this.state;
        fetch("/api/todos", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(this.getTodos())
    }

    handleDelete = (e) => {
        let uniqueId = e.target.getAttribute("id");
        fetch(`/api/todos/${uniqueId}`, {
            method: "delete",
            headers: { 'Content-Type': 'application/json' }
        })
        .then(this.getTodos())
    }

    // componentDidMount() {
    //     // todos is the data we get back
    //     // setting the state to newly aquired data
    // fetch("/api/todos")
    //     .then(res => res.json())
    //     .then(todos => this.setState({ todos }, () => console.log("Todos fetched...", todos)))
    //     .catch(err => console.log(err))

    // }



    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     const data = this.state;
    //     const currentTodos = [...this.state.todos]
    // fetch("/api/todos", {
    //     method: "post",
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // }).then(() => {
    //         currentTodos.push(data);
    //     })
    //     .then(fetch("/api/todos")
    //         .then(res => res.json())
    //         .then(todos => this.setState({ todos }, () => console.log("Todos fetched...", todos)))
    //         .catch(err => console.log(err)))
    // };

    // handleDelete = (e) => {
    //     e.preventDefault();
    //     let uniqueId = e.target.getAttribute("id")
    //     const currentTodos = [...this.state.todos]
    //     fetch(`/api/todos/${uniqueId}`, {
    //         method: "delete",
    //         headers: { 'Content-Type': 'application/json' }
    //     }).then(() => {
    //         let updatedTodos = currentTodos.filter(todo => todo._id !== uniqueId);
    //         this.setState({ todos: updatedTodos })
    //     }).then(console.log(this.state.todos))
    // }


    // Capture the form's submit event and prevent the default submission
    // Convert the form's child elements to JSON
    // Check to make sure only form field elements are added to the object.
    // Add safeguard to only store checkable fields if the checked attribute is set
    render() {
        return (
            <Div>
                <h2>Todo List</h2>

                <Ul>
                    {this.state.todos.map(todo =>
                        <Li key={todo._id}>
                            <strong>{todo.task}</strong>
                            <br />
                            {todo.from}
                            <DeleteBtn
                                id={todo._id}
                                onClick={this.handleDelete}
                            >X</DeleteBtn>
                        </Li>)}

                </Ul>
                <Form onSubmit={this.handleSubmit} id="myForm">
                    <Input type="text" id="taskInput" name="task" onChange={this.handleChange} placeholder="Your task..." />

                    <Input type="text" id="fromInput" name="from" onChange={this.handleChange} placeholder="Your name..." />
                    <Button type="submit">Add new Task!</Button>
                </Form>

            </Div>
        )
    }
}

export default TodoList;


const Div = styled.div`
    background-color: #9099a2;
    padding-bottom: 3rem;
    display: flex;
    justify-contents: center;
    align-contents: center;
`


const Ul = styled.ul`
    list-style: none;
    margin-left: none;
    margin: none;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
`
const Li = styled.li`
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #777;
    background-color: #6d7993
    padding: 0.5rem;
`

const Form = styled.form`
`
const Input = styled.input`
    background-color: #d5d5d5;
    border: none;
`

const DeleteBtn = styled.button`
    background-color: #96858f;
    margin-left: 1rem;
    border: none;
`

const Button = styled.button`
    background-color: #d5d5d5;
    border: none;
`