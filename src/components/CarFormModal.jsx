import React, { useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";

Modal.setAppElement("#root");

const CarFormModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const initialValues = {
    category: "",
    name: "",
    modelYear: "",
    color: "",
    licensePlate: "",
    cc: "",
    picture: "", // Base64 encoded image string
    company: "",
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Car category is required"),
    name: Yup.string().required("Car name is required"),
    modelYear: Yup.number().required("Model modelYear is required"),
    color: Yup.string().required("Car color is required"),
    licensePlate: Yup.string().required("License licensePlate is required"),
    cc: Yup.number().required("Engine CC is required"),
    picture: Yup.string().required("Picture is required"),
    company: Yup.string().required("Car Company is required"),
  });

  const [errors, setErrors] = useState({});

  const validateForm = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (values) => {
    const isFormValid = await validateForm(values);
    if (isFormValid) {
      onSubmit(values);
      onRequestClose();
    }
  };

  const Dropzone = ({ setFieldValue }) => {
    const handleFileUpload = (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFieldValue("picture", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: "image/*",
      onDrop: handleFileUpload,
    });

    return (
      <div className="flex flex-col justify-center items-center">
        <div
          {...getRootProps()}
          className={`w-64 h-64 border border-dashed border-gray-300 ${
            isDragActive ? "border-red-500" : ""
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-500 mt-auto text-center">
              Drop the image here...
            </p>
          ) : (
            <p className="text-gray-500 text-center">Add Image</p>
          )}
        </div>
      </div>
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          maxWidth: "800px", // Increased width to accommodate both columns
          minWidth: "800px",
          display: "flex", // Display the columns side by side
          alignItems: "flex-start", // Align items to the top of each column
          padding: "0",
        },
        overlay: {
          zIndex: 999,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="w-full h-4/5  bg-red-100">
        <div className=" p-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-center font-bold text-4xl text-gray-800 mb-6">
            Add Car
          </h1>
          <div className="p-2 rounded-lg">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form className="space-y-4">
                  <div className="w-full flex justify-evenly items-center">
                    <div>
                      {" "}
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-800 mb-1"
                        >
                          Car Category
                        </label>
                        <Field
                          type="text"
                          id="category"
                          name="category"
                          className={`w-80 px-3 py-2 rounded-md border focus:outline-none ${
                            errors.category ? "border-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="category"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-800 mb-1"
                        >
                          Company
                        </label>
                        <Field
                          type="text"
                          id="company"
                          name="company"
                          className={`w-80 px-3 py-2 rounded-md border focus:outline-none ${
                            errors.company ? "border-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="company"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-800 mb-1"
                        >
                          Car Name
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className={`w-full px-3 py-2 rounded-md border focus:outline-none ${
                            errors.name ? "border-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="modelYear"
                          className="block text-sm font-medium text-gray-800 mb-1"
                        >
                          Model Year
                        </label>
                        <Field
                          type="text"
                          id="modelYear"
                          name="modelYear"
                          className={`w-full px-3 py-2 rounded-md border focus:outline-none ${
                            errors.modelYear ? "border-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="modelYear"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="color"
                          className="block text-sm font-medium text-gray-800 mb-1"
                        >
                          Car Color
                        </label>
                        <Field
                          type="text"
                          id="color"
                          name="color"
                          className={`w-full px-3 py-2 rounded-md border focus:outline-none ${
                            errors.color ? "border-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="color"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="licensePlate"
                          className="block text-sm font-medium text-gray-800 mb-1"
                        >
                          License Plate
                        </label>
                        <Field
                          type="text"
                          id="licensePlate"
                          name="licensePlate"
                          className={`w-full px-3 py-2 rounded-md border focus:outline-none ${
                            errors.licensePlate ? "border-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="licensePlate"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cc"
                          className="block text-sm font-medium text-gray-800 mb-1"
                        >
                          Engine CC
                        </label>
                        <Field
                          type="text"
                          id="cc"
                          name="cc"
                          className={`w-full px-3 py-2 rounded-md border focus:outline-none ${
                            errors.cc ? "border-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="cc"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex justify-between mt-4">
                        <button
                          type="button"
                          className="w-full bg-red-500 text-white p-2 rounded-md font-semibold transition duration-300 hover:bg-red-600"
                          onClick={onRequestClose}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="w-full bg-red-500 text-white p-2 rounded-md font-semibold transition duration-300 hover:bg-red-600 ml-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Adding..." : "Add Car"}
                        </button>
                      </div>
                    </div>

                    <div>
                      {values.picture ? (
                        <div className="relative">
                          <img
                            className="w-80 rounded-md shadow-md"
                            src={values.picture}
                            alt="Uploaded"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 px-2.5 opacity-50 rounded-full hover:opacity-100"
                            onClick={() => setFieldValue("picture", "")}
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <div>
                          <label
                            htmlFor="picture"
                            className="block text-sm font-medium text-gray-800 mb-1 text-center"
                          >
                            Drag and Drop Image
                          </label>
                          <Dropzone setFieldValue={setFieldValue} />
                        </div>
                      )}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CarFormModal;
