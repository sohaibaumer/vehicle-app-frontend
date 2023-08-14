import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import logo from "../assets/logo.png";
const SignIn = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{12,})/,
        "Password must be at least 12 characters long and contain at least one uppercase letter, one lowercase letter, and one special character"
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    // You can handle form submission here

    await Axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/auth`,
      {
        values,
      },
      { withCredentials: true }
    );
    setSubmitting(false);
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-red-300 to-red-600">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <img src={logo} className="m-auto w-80 mt-4" />
        <div className=" p-6 rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-red-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-red-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="w-full bg-red-500 text-white p-2 rounded-md font-semibold transition duration-300 hover:bg-red-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Log In"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link className="text-red-500" to="/sign-up">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
