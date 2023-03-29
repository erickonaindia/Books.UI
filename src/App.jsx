import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const URL_ENDPOINT_BOOKS = 'https://localhost:7053/api/Books'

function App() {

  const [books, setBooks] = useState([])
  const [searchTerm, setsearchTerm] = useState("")

  let searchCriteria = {
    SelectBox:"", 
    Word:""
  };

  const handleClick = (e) => {

    setsearchTerm(searchCriteria)
    console.log(searchTerm)

  };

  useEffect(() => {
    fetch(URL_ENDPOINT_BOOKS)
        .then(response => response.json())
        .then(data => {
          //console.log(data)
          setBooks(data)
        });
  }, []);


  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex-recordsPerPage;
  const records = books.slice(firstIndex, lastIndex);
  const npage = Math.ceil(books.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div className="App">
<h3>Royal Library</h3>
      <div id='searchBox' className='card'>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="searchBy">
            <Form.Label column sm="2">
              Search Value:
            </Form.Label>
            <Col sm="4">
              <Form.Select onChange={(e)=>{
                searchCriteria.SelectBox = e.target.value;
              }} >
                <option>Select</option>
                <option value="title">Book Title</option>
                <option value="title">Publisher</option>
                <option value="3">Authors</option>
                <option value="type">Type</option>
                <option value="isbn">ISBN</option>
                <option value="category">Category</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formSearchValue">
            <Form.Label column sm="2">
              Search By:
            </Form.Label>
            <Col sm="5">
              <Form.Control type='textbox'  onChange={(e)=>{
                searchCriteria.Word = e.target.value;
              }} 
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formBtnSearch">
            <Col sm="5">
            <Button variant="outline-secondary" onClick={handleClick}>Search</Button>{' '}
            </Col>
          </Form.Group>
        </Form>
      </div>
      <br></br>
      <div id='searchResults' className='card'>
      <table className='table table-bordered'>
      <caption >Search Results:</caption>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Publisher</th>
            <th>Authors</th>
            <th>Type</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Available Copies</th>
          </tr>
        </thead>
        <tbody>
          {records.filter(val => {
            switch (searchTerm.SelectBox) {
              case 'title':
                return val.title.toLowerCase().includes(searchTerm.Word.toLowerCase())
              case 'type':
                return val.type.toLowerCase().includes(searchTerm.Word.toLowerCase())
              case 'isbn':
                return val.isbn.toLowerCase().includes(searchTerm.Word.toLowerCase());
              case 'category':
                return val.category.toLowerCase().includes(searchTerm.Word.toLowerCase())
              default:
                return val;
            }

          }).map((d,i)=>(
            <tr key={i}>
              <td>{d.title}</td>
              <td>{d.title}</td>
              <td>{d.firstName} {d.lastName}</td>
              <td>{d.type}</td>
              <td>{d.isbn}</td>
              <td>{d.category}</td>
              <td>{d.copiesInUse}/{d.totalCopies}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
      <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <a href='#' className='page-link' onClick={prePage}>Prev</a>
          </li>
            {
              numbers.map((n,i) => (
                <li className={`page-item ${currentPage === n ? 'active': ''}`} key={i}>
                  <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                  </li>
              ))
            }
            <li className='page-item'>
              <a href='#' className='page-link' onClick={nextPage}>Next</a>
            </li>
        </ul> 
      </nav>
      </div>
    </div>
  )

  function prePage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage-1)
    }
  }
  function nextPage(){
    if(currentPage !== npage){
      setCurrentPage(currentPage + 1)
    }

  }
  function changeCPage(id){
    setCurrentPage(id)
  }
}

export default App
