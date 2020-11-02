import React, {Component} from 'react'
// import ReactDOM from 'react-dom';

class Filters extends Component {

    render() {
        return (
            <div>
                <label htmlFor="max-results">Max Results: </label>
                <input 
                    name="max-results" 
                    id="max-results" 
                    type="text" 
                    value={this.props.that.value}
                    onChange={e => this.props.countChange(e.target.value)}
                />
                <label htmlFor="print-type">Print type: </label>
                <select 
                    name="print-type" 
                    id="print-type"
                    onChange={e => this.props.printChange(e.target.value)}
                >
                    <option value="books">Book</option>
                    <option value="magazines">Magazine</option>
                </select>
            </div>
        )
    }
}

export default Filters