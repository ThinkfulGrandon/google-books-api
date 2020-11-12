import React, {Component} from 'react'
import './App.css';
import SearchField from './SearchField'
// import Filters from './Filters'

// const apiKey = "AIzaSyC7g7e-ge6K9BZUzxhkPxE9boDCPEG5Plg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      count: 0,
      print: "books",
      dataArray: [],
      currentTabIndex: null,
    }
}

renderContent = () => {
  let book = this.state.dataArray[0].items[this.state.currentTabIndex]
  return (
        
      <div>
          <p>Category: {book.volumeInfo.categories}</p>
          <p>Rating: {book.volumeInfo.averageRating}</p>
          <p>Description:{ book.volumeInfo.description}</p>
          <p>Published: {book.volumeInfo.publishedDate}</p>
          <img src={book.volumeInfo.imageLinks.smallThumbnail}/>

          
      </div>
/*
<p>Description: book.volumeInfo.description</p>
<p>Published: book.volumeInfo.publishedDate</p>
<img src=`${book.volumeInfo.imageLinks.smallThumbnail}`/>
*/
  )
}

handleTitleClick = (idx) => {
  this.setState({
    currentTabIndex: idx
  })
}


  generateContent() {
    return(
      this.state.dataArray[0].items
        .map((book, idx) => {
            return(
              <div key={idx}>
                <button 
                  key={idx}
                  onClick={() => this.handleTitleClick(idx)}
                >
                  <h3 key={idx}>{book.volumeInfo.title}</h3>
                </button>
                
                <h4>{book.volumeInfo.authors}</h4>
                {this.state.currentTabIndex === idx ? this.renderContent() : ""}
                <hr/>
              </div>
              
            )
      })
    )
  }



handleTitleChange(title) {
  this.setState({
    title
  })
}

handleCountChange(count) {
  this.setState({
    count
  })
}

handlePrintChange(print) {
  this.setState({
    print
  })
}


handleSubmit(e) {
  e.preventDefault();
  this.setState({
    dataArray: []
  })
  const p = this.state.title
  const p1 = `intitle=${this.state.title}&`
  const p2 = `maxResults=${this.state.count}&`
  const p3 = `printType=${this.state.print}`
  const url = `https://cors-anywhere.herokuapp.com/https://www.googleapis.com/books/v1/volumes?q=${p}+${p1}${p2}${p3}`;
  const options = {
    method: 'GET',
    headers: new Headers({
      "key": "AIzaSyC7g7e-ge6K9BZUzxhkPxE9boDCPEG5Plg",
      "Access-Control-Allow-Origin" : "*",
    })
  };

  fetch(url, options)

    .then(response => {
      if(!response.ok) {
        throw new Error('something went wrong, dude')
      }
      return response.json()
    })
    .then(data => {
      this.setState({
        dataArray: [...this.state.dataArray, data]
      })
      
    })
    .catch(err => {
      console.log(err)
    })
}


  render() {

    return (
      <div className="App">
        <header>
          <h1 className="title">Google Book Search</h1>
        </header>
        <form 
          className="search-bar-form"
          onSubmit={e => this.handleSubmit(e)}
        >
          <SearchField 
            titleChange={title => this.handleTitleChange(title)}
            that={this.state}
            countChange={count => this.handleCountChange(count)}
            printChange={print => this.handlePrintChange(print)}
          />
        </form>
        <div className="results">
          {this.state.dataArray.length === 0 
            ? "" 
            : this.generateContent()
          }
        </div>
      </div>
    );
  }
}

export default App;
