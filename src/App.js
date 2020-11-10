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
    }
}

generateContent() {
  console.log("HERE", this.state.dataArray[0].items)
  return(
    this.state.dataArray[0].items
      .map((book, idx) => {
        <div key={idx}>
          <h3>{book.title}</h3>
          <h4>{book.authors}</h4>
        </div>
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
  const {title, count, print} = this.state;
  const bookmark = {title, count, print};
  const p = this.state.title
  const p1 = `intitle=${this.state.title}&`
  const p2 = `maxResults=${this.state.count}&`
  const p3 = `printType=${this.state.print}`
  const url = `https://cors-anywhere.herokuapp.com/https://www.googleapis.com/books/v1/volumes?q=${p}+${p1}${p2}${p3}`;
  const options = {
    method: 'GET',
    headers: new Headers({
      "key": "AIzaSyC7g7e-ge6K9BZUzxhkPxE9boDCPEG5Plg",

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
      console.log(this.state.dataArray[0])
      
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
          {this.state.dataArray === [] ? <h3>hi</h3> : 'hdy'}
        </div>
      </div>
    );
  }
}

export default App;
