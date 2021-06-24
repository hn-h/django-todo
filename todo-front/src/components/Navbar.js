import React from 'react';

import {Nav, Navbar} from 'react-bootstrap'


const navbar = (props) => {
  return(
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link onClick={props.finishedClicked}>Finished</Nav.Link>
        <Nav.Link onClick={props.unfinishedClicked}>Unfinished</Nav.Link>
        <Nav.Link onClick={props.createTaskForm}>Create</Nav.Link>
      </Nav>
    </Navbar>
  );
}
export default navbar;
