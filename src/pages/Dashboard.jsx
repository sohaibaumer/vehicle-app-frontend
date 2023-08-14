import React, { useState, useEffect } from "react";
import CarTable from "../components/CarTable";
import debounce from "lodash.debounce";
import CarFormModal from "../components/CarFormModal";
import ChooseCarModal from "../components/ChooseCarModal";
import logo from "../assets/logo.png";
import Axios from "axios";
import { useCookies } from 'react-cookie';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChooseModalOpen, setChooseIsModalOpen] = useState(false);
  const [sampleData, setSampleData] = useState([]); // Store fetched data here
  const [originalData, setOriginalData] = useState([]); // Store original data copy
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
const [seed, setSeed]=useState(null)
const [cookies, setCookie, removeCookie] = useCookies([]);
const [update,setUpdate]=useState(false)
    // Fetch data from the API endpoint
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/vehicles`,
          { withCredentials: true }
        );
        setSampleData(response.data); // Update the state with fetched data
        setOriginalData(response.data); // Store a copy of the original data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await Axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/profile`,
          { withCredentials: true }
        );
        setUser(response.data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchSeedData = async () => {
      try {
        const response = await Axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/seed/`,
          { withCredentials: true }
        );
        setSeed(response.data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  useEffect(() => {


    fetchData(); // Call the fetch function
    fetchUserData();
    fetchSeedData();
  }, [update]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCar = async (carData) => {
    await Axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/vehicles`,
      {
        carData,
      },
      { withCredentials: true }
    );
  
    setUpdate(prev => !prev)
  };

  const handleSearch = debounce((value) => {
    const filtered = originalData.filter(
      (car) =>
        car.carCategory.toLowerCase().includes(value.toLowerCase()) ||
        car.carName.toLowerCase().includes(value.toLowerCase()) ||
        car.licensePlate.toLowerCase().includes(value.toLowerCase())
    );
    setSampleData(filtered);
  }, 300);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  

  return (
    <div className="min-h-screen w-screen p-4 md:p-8 lg:p-12 bg-red-200">
      <img src={logo} className="w-40 mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-medium mb-2">Search Cars</h2>
          <input
            type="text"
            placeholder="Search by category, name, or plate..."
            className="w-full p-2 border rounded-md focus:outline-red-300"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>

        <div className="bg-white p-6 rounded-md shadow-md space-x-2 flex items-center justify-between">
          <div className="space-x-2"><button
            className="modal-button bg-red-400 text-white"
            onClick={handleOpenModal}
          >
            Add Car
          </button>
          
          <button
            className="modal-button bg-red-400 text-white"
            onClick={()=>setChooseIsModalOpen(true)}
          >
            Choose Car
          </button>
          </div>
          <div className="shadow-lg p-6 font-bold">Registered Cars: {sampleData.length}</div>
          {user && user.user && (
            <div className="shadow-lg bg-white-100 p-4 rounded-md flex space-x-4">
              <div className="p-5 rounded-full bg-red-300 w-16 h-16 text-center">
                {user.user.firstName.charAt(0)} {user.user.lastName.charAt(0)}
              </div>
              <div className="flex flex-col justify-center items-start">
                <p>
                  {user.user.firstName} {user.user.lastName}
                </p>
                <p>{user.user.email}</p>
              </div>
              <button
            className="modal-button bg-red-400 text-white"
            onClick={()=> removeCookie('token')}
          >
            Log Out
          </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-md shadow-2xl">
        <h2 className="text-lg font-medium mb-2">Table of Cars</h2>
        <CarTable data={sampleData} update={update} onUpdate={setUpdate}/>
      </div>

      <CarFormModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onSubmit={handleAddCar}
      />

      <ChooseCarModal isOpen={isChooseModalOpen} onRequestClose={setChooseIsModalOpen} onSubmit={handleAddCar} data={seed}/>
    </div>
  );
};

export default Dashboard;
