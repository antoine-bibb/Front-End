import React from "react";
import styled from "styled-components";


export default function SignInForm(props) {
  const { change, values, submit } = props;

  return (
    <SigninWrapper>
    <form className="container" onSubmit={submit}>
      <div className="inputs">

          <input
            value={values.username}
            placeholder="username"
            name="username"
            type="text"
            onChange={change}
          />

          <input
          style={{width: "10rem", height: "40px"}}
            value={values.password}
            placeholder={ <i className="fas fa-lock"></i> && "Password"}
            name="password"
            type="text"
            onChange={change}
          />

      </div>
      <div className="submit">
          <button>Sign In</button>
          <i className="fas fa-shield-check"></i>
      </div>
    </form>
    </SigninWrapper>
  );
}

const SigninWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;

   .inputs{
     display: flex;
     flex-direction: column;
     justify-content: space-between;
   }

   
`;
