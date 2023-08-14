import React, { useState } from "react";
import DeleteCarModal from "./DeleteCarModal";
import UpdateCarModal from "./UpdateCarModal";
import Axios from "axios";
import moment from "moment";

const CarTable = ({ data, update, onUpdate }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [carId, setCarId] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteCar = async (carData) => {
    await Axios.delete(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/vehicles/${carData}`,
      { withCredentials: true }
    );
    onUpdate(!update);
  };

  const handleUpdateCar = async (carData) => {
    await Axios.put(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/vehicles/${
        carData._id
      }`,
      carData,
      { withCredentials: true }
    );
    onUpdate(!update);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  let sortedData = [...data];
  if (sortColumn) {
    sortedData.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });
  }

  const currentItems = sortedData.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-red-300">
            <tr>
              <th
                className="text-left py-2 pl-2.5 cursor-pointer"
                onClick={() => handleSort("picture")}
              >
                Picture
              </th>
              <th
                className="text-left py-2 cursor-pointer"
                onClick={() => handleSort("carCategory")}
              >
                Car Category{" "}
                {sortColumn === "carCategory" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                className="text-left py-2 cursor-pointer"
                onClick={() => handleSort("company")}
              >
                Company{" "}
                {sortColumn === "company" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                className="text-left py-2 cursor-pointer"
                onClick={() => handleSort("carName")}
              >
                Car Name{" "}
                {sortColumn === "carName" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                className="text-left py-2 cursor-pointer"
                onClick={() => handleSort("modelYear")}
              >
                Model Year{" "}
                {sortColumn === "modelYear" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                className="text-left py-2 cursor-pointer"
                onClick={() => handleSort("color")}
              >
                Color
                {sortColumn === "color" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                className="text-left py-2 cursor-pointer"
                onClick={() => handleSort("licensePlate")}
              >
                License Plate
                {sortColumn === "licensePlate" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                className="text-left py-2 cursor-pointer"
                onClick={() => handleSort("engineCC")}
              >
                Engine CC{" "}
                {sortColumn === "engineCC" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                className="text-left py-2 cursor-pointer"
                onClick={() => handleSort("registeredAt")}
              >
                Registered At{" "}
                {sortColumn === "registeredAt" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th className="text-left py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((car, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-red-100" : ""}>
                <td className="p-2">
                  <img
                    src={car.picture}
                    alt="Car"
                    className="h-16 w-16 object-cover rounded-full shadow-md"
                  />
                </td>
                <td className="py-2">{car.carCategory}</td>
                <td className="py-2">{car.company}</td>
                <td className="py-2">{car.carName}</td>
                <td className="py-2">{car.modelYear}</td>
                <td className="py-2">{car.color}</td>
                <td className="py-2">{car.licensePlate}</td>
                <td className="py-2">{car.engineCC}</td>
                <td className="py-2">
                  {moment(car.registeredAt).format("YYYY-MM-DD")}
                </td>
                <td className="py-2 space-x-2">
                  <button
                    className="modal-button bg-red-400 text-white"
                    onClick={() => {
                      setSelectedCar(car);
                      setIsUpdateModalOpen(true);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="modal-button bg-red-400 text-white"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setCarId(car._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <nav className="flex space-x-2">
          <button
            className="pagination-button bg-red-400 text-white"
            onClick={() =>
              handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
            }
          >
            Previous
          </button>
          <button
            className="pagination-button bg-red-400 text-white"
            onClick={() =>
              handlePageChange(
                currentPage < totalPages ? currentPage + 1 : currentPage
              )
            }
          >
            Next
          </button>
        </nav>
        <p className="text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
      </div>
      <DeleteCarModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteCar}
        initialCarId={carId}
      />
      <UpdateCarModal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateCar}
        initialValues={selectedCar}
      />
    </div>
  );
};

export default CarTable;
