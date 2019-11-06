import React from 'react'
import './SearchLanguages.css'

class SearchLanguages extends React.Component {
  state = {
    suggestions: [],
    text: '',
    cardsLanguages: []
  }

  handleChange = (event) => {
    const { languages } = this.props
    const value = event.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = languages.sort().filter(v => regex.test(v))
    }
    this.setState(() => ({suggestions, text: value }))
  }

  renderSuggestions = () => {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul className="suggestionsList">
        {suggestions.map(item => <li onClick={() => this.suggestionsSelected(item)}>{item}</li>)}
      </ul>
    )
  }

  suggestionsSelected = (value) => {
    this.setState(() => ({
      text: value,
      suggestions: [],
    }))
  }


  render() {
    const { text } = this.state
    return (
      <div className="containerSearchLanguages">
        <input
          type='text'
          value={text}
          className="inputSearchLanguages"
          onChange={(this.handleChange)}
        />
        {this.renderSuggestions()}
      </div>
    )
  }
}



export default SearchLanguages