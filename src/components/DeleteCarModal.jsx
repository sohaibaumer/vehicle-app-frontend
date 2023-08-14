import React from "react";
import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import Axios from 'axios'

Modal.setAppElement("#root");

const DeleteCarModal = ({ isOpen, onRequestClose, onDelete, initialCarId }) => {

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
          maxWidth: "800px",
          minWidth: "800px",
          display: "flex",
          alignItems: "flex-start",
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
            Delete Car
          </h1>
          <Formik
            initialValues={{ carId: initialCarId }} // Use the initial value here
            onSubmit={(values) => {
              onDelete(values.carId);
              onRequestClose();
            }}
          >
            <Form>
              <div className="p-2 rounded-lg">
                <p className="text-gray-800 mb-4">
                  Are you sure you want to delete the car with ID:{" "}
                  {initialCarId}?
                </p>
                <Field
                  type="text"
                  name="carId"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
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
                  >
                    Delete Car
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCarModal;
