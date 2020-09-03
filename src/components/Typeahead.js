import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: blue;
  color: white;
  text-decoration: none;
  border: none;
  padding: 5px 15px;
  border-radius: 2.5px;
  cursor: pointer;

  &:hover {
    border: 2px solid lightblue;
  }
`;

const Input = styled.input`
  border: 1.5px solid lightgrey;
  padding: 5px 15px;
  margin: 10px 10px 10px 0px;
  border-radius: 2.5px;
`;

const BookSection = styled.ul`
  padding: 5px;
  width: 30%;
  border-radius: 2.5px;
  box-shadow: 0px 0px 8px 2px rgba(199, 199, 199, 1);
`;
const BookList = styled.li`
  padding: 10px;
  cursor: pointer;
  /* &:hover {
    background-color: #fafabe;
  } */
  ${({ active }) =>
    active
      ? `
      background-color: #fafabe;
  `
      : `background-color: white`}
`;

const Prediction = styled.span`
  font-weight: bold;
`;

const Category = styled.span`
  font-style: italic;
  font-size: 15px;
`;

const Purple = styled.span`
  color: purple;
`;

const Typeahead = ({ categories, suggestions, handleSelect }) => {
  const [name, setName] = React.useState("");
  const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = React.useState(0);

  function bookSuggestions(inputValue) {
    const matchedSuggestions = suggestions.filter((suggestion) => {
      if (suggestion.title.toLowerCase().includes(inputValue)) {
        return true;
      }
    });
    if (matchedSuggestions.length === suggestions.length) {
      return false;
    } else {
      setFilteredSuggestions(matchedSuggestions);
    }
  }

  const isSelected = (index) => {
    return index === selectedSuggestion;
  };

  return (
    <div>
      <Input
        type="text"
        value={name}
        onChange={(ev) => {
          setName(ev.target.value);
          bookSuggestions(ev.target.value);
        }}
        onKeyDown={(ev) => {
          switch (ev.key) {
            case "Enter":
              {
                handleSelect(ev.target.value);
              }
              return;
            case "ArrowUp":
              {
                if (selectedSuggestion > 0)
                  setSelectedSuggestion(selectedSuggestion - 1);
              }
              return;
            case "ArrowDown":
              {
                if (selectedSuggestion < filteredSuggestions.length)
                  setSelectedSuggestion(selectedSuggestion + 1);
              }
              return;
          }
          return;
        }}
      />
      <Button
        onClick={() => {
          setName("");
          setFilteredSuggestions([]);
        }}
      >
        Clear
      </Button>
      {filteredSuggestions.length > 0 ? (
        <BookSection>
          {filteredSuggestions.map((suggestion, index) => {
            // let isSelected = false;

            const suggestionTitle = suggestion.title;
            const firstHalf = suggestionTitle.slice(
              0,
              suggestionTitle.toLowerCase().indexOf(name) + name.length
            );
            const secondHalf = suggestionTitle.slice(
              firstHalf.length,
              suggestionTitle.length
            );
            return (
              <BookList
                key={suggestion.id}
                onClick={() => handleSelect(suggestion.title)}
                active={isSelected(index)}
              >
                <span>
                  {firstHalf}
                  <Prediction>{secondHalf} </Prediction>
                  <Category>
                    in <Purple>{categories[suggestion.categoryId].name}</Purple>
                  </Category>
                </span>
                {/* {suggestion.title}{" "} */}
              </BookList>
            );
          })}
        </BookSection>
      ) : null}
    </div>
  );
};

export default Typeahead;
