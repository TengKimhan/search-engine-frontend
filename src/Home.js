import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [solr, setSolr] = useState([])
  const doSearch = (params) => {
    if (params === '') {
      fetch("http://localhost:8983/solr/searchengine/select?q=*:*", {
      method: 'GET'
      })
        .then((response) => response.json())
        .then(item => item.response)
        .then(data => {
          setSolr(data.docs)
      })
    } else {
      fetch(`http://localhost:8983/solr/searchengine/select?q=${params}`, {
      method: 'GET'
      })
        .then((response) => response.json())
        .then(item => item.response)
        .then(data => {
          setSolr(data.docs)
        })
    }   
  }

  const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        doSearch(event.target.value);
      }
    };
  
  return (
    <div>
      <Container>
        <h1 className="text-center mt-4">Documents Search</h1>
        <Form>
          <InputGroup className="my-3">
            {/* onChange for search */}
            <Form.Control 
            placeholder="Search documents"
            onKeyDown={keyDownHandler} />
          </InputGroup>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">File Name</th>
              <th className="text-center">File Type</th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody>
            {solr
              .map((item, index) => (
                <tr key={item.id}>
                  <td>{item.fileName}</td>
                  <td className="text-center">{item.fileType}</td>
                  <td className="text-center">
                    <a href={`http://127.0.0.1:5000/download/${item.id}`} target="_blank" rel="noreferrer">
                      Download
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Home;