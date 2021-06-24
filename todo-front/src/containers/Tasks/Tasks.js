import React, {Component} from 'react'
import Task from '../../components/Task'
import Navbar from '../../components/Navbar'
import axios from "axios";
import {Form, Button} from 'react-bootstrap'

const colors = [
  'Primary',
  'Secondary',
  'Danger',
  'Warning',
  'Light',
  'Dark',
]

class Tasks extends Component{
  state = {
    tasks: [],
    showFinished: false,
    showCreateForm: false,
    newTask: {title:'', description:'', finished:false}
  }

  componentDidMount() {
      this.getTasks();
    }

  getTasks = () => {
      axios
        .get("http://127.0.0.1:8000/api/")
        .then((res) => this.setState({ tasks: res.data }))
        .catch((err) => console.log(err));
    };

  createTaskForm = () => {
      this.setState({showCreateForm:true})
    };

  closeCreateTaskForm = () => {
      this.setState({showCreateForm:false})
    };

handleTitleChange = (e) => {
  let task=this.state.newTask
  task.title=e.target.value
  this.setState({newTask: task});
}

handleDescriptionChange = (e) => {
  let task=this.state.newTask
  task.description=e.target.value
  this.setState({newTask: task});
}

addTask = () => {
  this.closeCreateTaskForm()
  axios
    .post("http://127.0.0.1:8000/api/", this.state.newTask)
    .then((res) => this.getTasks());
};

deleteHandler = (id) => {
  let taskID = '' + id
  axios
      .delete('http://127.0.0.1:8000/api/' + taskID)
      .then((res) => this.getTasks());
};

showFinishedHandler = () => {
  this.setState({showFinished:true})
}

showUnfinishedHandler = () => {
  this.setState({showFinished:false})
}

clickedHandler = (key) =>{
  const containID = (task) => task.id === key;
  let tasks = [...this.state.tasks];
  let taskIndex = tasks.findIndex(containID)
  let task = {...tasks[taskIndex]};
  task.finished = true;
  tasks[taskIndex] = task;
  this.setState({tasks});
}

  render(){
    let TasksCard = this.state.tasks.map((task,i) => {
                      return <Task key={task.id}
                                   id={task.id}
                                   title={task.title}
                                   desc={task.description}
                                   done={task.finished}
                                   color={colors[i]}
                                   clicked={this.clickedHandler}
                                   showFinished={this.state.showFinished}
                                   deleteTask={this.deleteHandler}
                                   />
                    });
    let CreateForm = this.state.showCreateForm ?
            (<Form>
              <Form.Group controlId="formBasicText">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" onChange={this.handleTitleChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicText">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Add Description" onChange={this.handleDescriptionChange}/>
              </Form.Group>
              <Button variant="info" type='text' onClick={this.closeCreateTaskForm}>
                Cancel
              </Button>
              <Button variant="primary" type="text" onClick={this.addTask}>
                Add
              </Button>
            </Form>): null
    return(
      <div>
      <Navbar finishedClicked={this.showFinishedHandler}
              unfinishedClicked={this.showUnfinishedHandler}
              createTaskForm={this.createTaskForm}/>
      {CreateForm}
      {TasksCard}
      </div>
    )
  }
}

export default Tasks;
