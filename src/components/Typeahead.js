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
  margin: 10px;
  border-radius: 2.5px;
`;

const Typeahead = ({ suggestions, handleSelect }) => {
  const [name, setName] = React.useState("");

  return (
    <div>
      <Input
        type="text"
        value={name}
        onChange={(ev) => {
          setName(ev.target.value);
        }}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            handleSelect(ev.target.value);
          }
        }}
      />
      <Button onClick={() => setName("")}>Clear</Button>
    </div>
  );
};

export default Typeahead;
