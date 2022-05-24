import { useRef } from "react";
import Input_field from "../components/input-field";
import validator from "../components/form-validators/form-validator";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const inputValidator = new validator();
  const email = useRef();
  const pwd = useRef();
  const navigate = useNavigate();

  const formDataSender = (event) => {
    event.preventDefault();

    const emailInput = email.current.value;
    const pwdInput = pwd.current.value;

    const formData = {
      email_address: inputValidator.checkEmpty(emailInput),
      password: inputValidator.checkEmpty(pwdInput),
    };

    if (
      !inputValidator.checkEmpty(emailInput) ||
      !inputValidator.checkEmpty(pwdInput)
    ) {
      alert("All fields must be filled");
    } else {
      axios
        .post("https://movie-server-deploy.herokuapp.com/users/login", formData)
        .then((res) => {
          const status = res.status;

          if (res.status === 201) {
            //alert(`Welcome, ${inputValidator.checkEmpty(emailInput)}`)
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            });
            navigate("/dashboard", { replace: true });
          }
        })
        .catch((error) => {
          const status = error.response.status;

          if (status === 401) {
            //alert("Invalid login")
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Invalid login!",
            });
          }
        });
    }
  };

  return (
    <div>
      <div className="container-sm shadow rounded p-3 mt-3 w-75">
        <div className="mb-4">
          <h2>Login to your account</h2>
        </div>
        <form className="container-fluid-sm" onSubmit={formDataSender}>
          <Input_field
            label="Email"
            value={email}
            inputType="email"
            placeholder="Enter your email"
          />
          <Input_field
            label="Password"
            value={pwd}
            inputType="password"
            placeholder="Enter your password"
          />

          <div className="btn-cont w-100">
            <button className="btn btn-dark w-100">Login</button>
          </div>
        </form>
      </div>

      <div className="d-flex justify-content-center align-items-center container-sm shadow rounded p-3 mt-3 w-75">
        <div className="d-flex align-items-center">
          {" "}
          New to Movie Spot?{" "}
          <Link to="/sign-up" className="form-link text-primary nav-link">
            Create an account
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}

export default Login;
