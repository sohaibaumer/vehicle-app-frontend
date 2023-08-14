import React from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

Modal.setAppElement("#root");

const ChooseCarModal = ({ isOpen, onRequestClose, onSubmit, data }) => {
  const validationSchema = Yup.object().shape({
    carCategory: Yup.string().required("Car category is required"),
    company: Yup.string().required("Car company is required"),
    carName: Yup.string().required("Car name is required"),
    modelYear: Yup.number().required("Model year is required"),
    color: Yup.string().required("Car color is required"),
    engineCC: Yup.number().required("Engine CC is required"),
  });

  const handleSubmit = (values) => {
    onSubmit(values);
    onRequestClose();
  };

  return (
    data &&
    data[0] && (
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
        <div className="w-full h-4/5 bg-red-100">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-center font-bold text-4xl text-gray-800 mb-6">
              Choose Car
            </h1>
            <div className="p-2 rounded-lg">
              <Formik
                initialValues={{
                  carCategory: "",
                  company: "",
                  carName: "",
                  modelYear: "",
                  color: "",
                  engineCC: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    {Object.keys(data[0])
                      .slice(1)
                      .map((field, index) => {
                        let label = field;
                        switch (field) {
                          case "carCategory":
                            label = "Car Category";
                            break;
                          case "company":
                            label = "Company";
                            break;
                          case "carName":
                            label = "Car Name";
                            break;
                          case "modelYear":
                            label = "Model Year";
                            break;
                          case "color":
                            label = "Color";
                            break;
                          case "engineCC":
                            label = "Engine CC";
                            break;
                          default:
                            break;
                        }

                        return (
                          <div key={index}>
                            <label
                              htmlFor={field}
                              className="block text-sm font-medium text-gray-800 mb-1"
                            >
                              {label}
                            </label>
                            <Field
                              as="select"
                              id={field}
                              name={field}
                              className="w-80 px-3 py-2 rounded-md border focus:outline-none"
                            >
                              <option value="">Select an option</option>
                              {Array.isArray(data[0][field]) &&
                                data[0][field].map((value, valueIndex) => (
                                  <option key={valueIndex} value={value}>
                                    {value}
                                  </option>
                                ))}
                            </Field>
                            <ErrorMessage
                              name={field}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                        );
                      })}

                    <div className="flex justify-between mt-4">
                      <button
                        type="button"
                        className="w-full bg-red-500 text-white p-2 rounded-md font-semibold transition duration-300 hover:bg-red-600"
                        onClick={() => onRequestClose(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-full bg-red-500 text-white p-2 rounded-md font-semibold transition duration-300 hover:bg-red-600 ml-2"
                        disabled={isSubmitting}
                      >
                        Choose Car
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};

export default ChooseCarModal;
