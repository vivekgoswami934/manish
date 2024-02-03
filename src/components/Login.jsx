import React, { useState } from "react";
import styled from "styled-components";
import Pin from "./Genric/Pin";
const url = "";

const Login = () => {
  const [number, setNumber] = useState("");
  const [loginUi, setLoginUi] = useState(true);
  const [pinInput, setPinInput] = useState("");

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSetPin = (value) => {
    setPinInput(value);
  };

  const handleFetch = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("phone", "9818979450");
    urlencoded.append("otp", "123456");
    urlencoded.append("dial_code", "+91");

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://staging.fastor.in/v1/pwa/user/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const token = result.data.token;
        localStorage.setItem("manish-authToken", token);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Wrapper>
      {loginUi && <H2>Enter Your Mobile Number</H2>}
      {!loginUi && <H2>OTP Verification</H2>}
      {loginUi && <P>We will send you 4 digit verification code</P>}
      {!loginUi && <P>We will send you 4 digit verification code</P>}
      {loginUi && <Input type="number" onChange={handleChange} />}

      {!loginUi && (
        <PinWrapper>
          <Pin length={6} perInputBox={1} setPinFn={handleSetPin} />
        </PinWrapper>
      )}
      {loginUi && (
        <Button onClick={() => setLoginUi((p) => !p)}>Send Code</Button>
      )}
      {!loginUi && <Button onClick={handleFetch}>Verify</Button>}
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  border: 2px solid black;
  padding: 0.5rem;
`;
const Input = styled.input`
  width: 100%;
`;
const H2 = styled.h3`
  display: block;
  text-align: left;
  border: 2px solid black;
`;

const P = styled.p`
  width: 100%;
  margin: 1rem;
  display: block;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: orange;
  color: white;
  width: 100%;
  margin: 1rem;
`;

const PinWrapper = styled.div`
  display: flex;

  .input-div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  .input-pin {
    width: 2rem;
    height: 2rem;
    text-align: center;
  }
`;
