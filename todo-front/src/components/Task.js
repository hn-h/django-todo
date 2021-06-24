import React from 'react';
import {Card, Button} from 'react-bootstrap'


const task = (props) => (
  <>
    <Card
      bg={props.color.toLowerCase()}
      text={props.color.toLowerCase() === 'light' ? 'dark' : 'white'}
      style={{ width: '18rem',display:props.showFinished===props.done ? 'block' : 'none'}}
      className="mb-2"
    >
      <Card.Header>{props.done ? 'Finished' : 'Unfinished'}</Card.Header>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.desc}
        </Card.Text>
      </Card.Body>
      <Button
       variant="danger"
       onClick={() => props.deleteTask(props.id)}
     > Delete </Button>

      <Button
       variant="success"
       onClick={() => props.clicked(props.id)}
     > Finished </Button>

    </Card>
  </>
);

export default task;
