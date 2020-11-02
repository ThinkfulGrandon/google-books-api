
import React from 'react'
// import ReactDOM from 'react-dom';
import './SearchField.css'
import Filters from './Filters'


function SearchField(props) {
    
    return (
        <div>
            
                <label htmlFor="search-bar">Search: </label>
                <input
                    type="text" 
                    name="search-bar" 
                    id="search-bar"
                    placeholder="Book Title"
                    value={props.that.value}
                    onChange={ e => props.titleChange(e.target.value) }/>
                <button type="submit">Submit</button>
                <Filters 
                    countChange={props.countChange}
                    printChange={props.printChange}
                    that={props.that}
                />
          
        </div>
    )
}

export default SearchField;