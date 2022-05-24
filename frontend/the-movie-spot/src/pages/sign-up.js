import { useRef, useState, useEffect } from "react";
import validator from "../components/form-validators/form-validator";
import { Link, useNavigate } from "react-router-dom";
import Input_field from "../components/input-field";
import axios from "axios";
import Spinner from "../components/Spinner/index";
import Swal from "sweetalert2";

function Sign_up() {
  const navigate = useNavigate();
  const [loading, loaded] = useState(false);
  const inputValidator = new validator();
  const fullName = useRef();
  const email = useRef();
  const pwd = useRef();
  const confirmPwd = useRef();

  useEffect(() => {
    loaded(false);
  }, []);

  const subFormData = (event) => {
    event.preventDefault();

    const fullNameInput = fullName.current.value;
    const emailInput = email.current.value;
    const pwdInput = pwd.current.value;
    const confirmPwdInput = confirmPwd.current.value;
    const checkEmpty =
      !inputValidator.checkEmpty(confirmPwdInput) ||
      !inputValidator.checkEmpty(fullNameInput) ||
      !inputValidator.checkEmpty(emailInput) ||
      !inputValidator.checkEmpty(pwdInput);

    if (checkEmpty) {
      alert("All fields must be filled");
    } else if (!inputValidator.mailValidator(emailInput)) {
      alert("Email is invalid");
    } else if (!inputValidator.pwdValidator(pwdInput)) {
      alert("Password needs to be more than 8 characters");
    } else if (!inputValidator.pwdMatchValidator(pwdInput, confirmPwdInput)) {
      alert("Passwords are not matching");
    } else {
      loaded(true);
      const formData = {
        email_address: inputValidator.checkEmpty(emailInput),
        full_names: inputValidator.checkEmpty(fullNameInput),
        password: inputValidator.checkEmpty(pwdInput),
      };

      axios
        .post(
          "https://movie-server-deploy.herokuapp.com/users/register",
          formData
        )
        .then((res) => {
          const resStatus = res.status;

          if (resStatus === 201) {
            navigate("/dashboard", { replace: true });
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
              title: "Registered successfully",
            });
          }
        })
        .catch((err) => {
          loaded(false);
          const resStatus = err.response.status;
          console.error(err);
          if (resStatus === 401) {
            //alert(`An account with this email address has already been registered. Please Login or Reset your Password`);
            Swal.fire({
              title:
                "An account registered with this email address is found. Please login or reset your password if forgotten.",
              icon: "warning",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
          } else if (resStatus === 503) {
            alert(`The server is down.`);
          }
        });
    }
  };

  return (
    <div>
      {loading ? <Spinner /> : null}

      <div className="container-sm shadow rounded p-3 mt-3 w-75">
        <div className="mb-4">
          <h2>Create account</h2>
        </div>
        <form className="container-fluid-sm" onSubmit={subFormData}>
          <Input_field
            label="Full Name"
            inputType="text"
            value={fullName}
            placeholder="Enter your full name"
          />
          <Input_field
            label="Email"
            inputType="email"
            value={email}
            placeholder="Enter your email"
          />
          <Input_field
            label="Password(7 characters minimum)"
            value={pwd}
            inputType="password"
            placeholder="Enter your password"
          />
          <Input_field
            label="Confirm Password"
            inputType="password"
            value={confirmPwd}
            placeholder="Re-enter your password"
          />

          <div className="btn-cont w-100">
            <button className="btn btn-dark w-100">
              Create your movie spot account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Sign_up;
