import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import styled from "styled-components";

function App() {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  );
}

export default App;


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  /* padding: 1rem; */
`;