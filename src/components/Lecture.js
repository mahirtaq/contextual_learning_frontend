import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../App.css'

function Lecture({ lecture_id }) {
  //fetch list of keywords from api
  const [keywords, setKeywords] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showButtonIndex, setShowButtonIndex] = useState(null);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/api/v1/lectures/${lecture_id}/`, 
      { credentials: 'omit' }
    )
    .then((res) => res.json())
    .then((data) => setKeywords(data.keywords))
    .catch((err) => console.log(err));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setShowButton(true);
    setShowButtonIndex(Number(e.target.id));
  }

  const wordButtons = keywords.map((word, index) =>(
    <li style={{ marginTop: '1rem' }}>
      <Button 
        id={index}
        variant="primary"
        onClick={(e) => handleClick(e)}
      >
        {word.keyword}
      </Button>
      {showButton && (showButtonIndex === index) && <p>Start time: {word.start_time}</p>}
    </li>
  ));
  
  return (
    <Container style={{ alignItems: 'center' }}>
      <Row>
        
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
      <Card.Body>
        <Card.Title>Keywords</Card.Title>
        <Card.Text>
          <ul>
          {wordButtons}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
    
    </Row>
    </Container>
  );
}

export default Lecture;