import React, { Component } from "react"
import styled from "styled-components"

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            inputFields: {
                task: "",
                from: ""
            }
        }
    }


    componentDidMount() {
        // todos is the data we get back
        // setting the state to newly aquired data
        fetch("/api/todos")
            .then(res => res.json())
            .then(todos => this.setState({ todos }, () => console.log("Todos fetched...", todos)))
            .catch(err => console.log(err))

    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const data = this.state;
        fetch("/api/todos", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
    }

    handleDelete = (e) => {
        e.preventDefault();
        let uniqueId = e.target.getAttribute("id")
        fetch(`/api/todos/${uniqueId}`, {
            method: "delete",
            headers: { 'Content-Type': 'application/json' }
        })
    }


    // Capture the form's submit event and prevent the default submission
    // Convert the form's child elements to JSON
    // Check to make sure only form field elements are added to the object.
    // Add safeguard to only store checkable fields if the checked attribute is set
    render() {
        return (
            <div>
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

            </div>
        )
    }
}

export default TodoList;

const Ul = styled.ul`
    list-style: none;
    width: 50%;
    align-self: center;
    justify-content: center;
`
const Li = styled.li`
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #777;
`

const Form = styled.form`

`
const Input = styled.input`
    margin-right: 1rem;
`

const DeleteBtn = styled.button`
    background-color: red;
    margin-left: 1rem
`

const Button = styled.button`

`