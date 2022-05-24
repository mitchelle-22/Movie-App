import { useRef } from "react";
import Input_field from "../components/input-field";

function Pwd_Reset() {
  const email = useRef();

  const formDataSender = (event) => {
    event.preventDefault();

    const emailInput = email.current.value;

    const formData = {
      email: emailInput,
    };

    console.log(formData);
  };

  return (
    <div>
      <div className="container-sm shadow rounded p-3 mt-3 w-75">
        <div className="mb-4">
          <h2>Reset your password</h2>
        </div>
        <form className="container-fluid-sm" onSubmit={formDataSender}>
          <div className="mb-2">
            Enter your user account's verified email address and we will send
            you a password reset link.
          </div>

          <Input_field
            label="Email"
            value={email}
            inputType="email"
            placeholder="Enter your email"
          />

          <div className="btn-cont w-100">
            <button className="btn btn-dark w-100">
              Send Password Reset Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Pwd_Reset;
