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


    handleClick = (e) => {
        e.preventDefault();
        const data = this.state;    
        console.log(JSON.stringify(data, null, 2))
    }


    // Capture the form's submit event and prevent the default submission
    // Convert the form's child elements to JSON
    // Check to make sure only form field elements are added to the object.
    // Add safeguard to only store checkable fields if the checked attribute is set
    render() {
        const {from} = this.state;
        const {task} = this.state;
        return (
            <div>
                <h2>Todo List</h2>
            
                <Ul>
                    {this.state.todos.map(todo =>
                        <Li key={todo._id}> <strong>{todo.task}</strong><br/>{todo.from} </Li> )}
                </Ul>

                <p>{task} FROM {from}</p>
                <Form onSubmit={this.handleClick} id="myForm"> 
                    <Input type="text" id="taskInput" name="task" onChange={this.handleChange} placeholder="Your task..."/>
                    <Input type="text" id="fromInput" name="from" onChange={this.handleChange} placeholder="Your name..."/>
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
    border-bottom: 1px solid #777
`

const Form = styled.form`

`
const Input = styled.input`
    margin-right: 1rem;
`
const Button = styled.button`

`