import React from "react";
import data from "../data";

import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Typeahead from "./Typeahead";

const Wrapper = styled.div`
  margin: 20px 30px;
`;

const App = (props) => {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Typeahead
          suggestions={data.books}
          handleSelect={(suggestion) => {
            window.alert(suggestion);
          }}
        />
      </Wrapper>
    </>
  );
};

export default App;
