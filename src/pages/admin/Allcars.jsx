import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Allcars() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const res = await axios.get(`${baseUrl}/admin/allcars`)
        console.log(res.data)
        setCars(res.data.cars)
        console.log(res.data.cars)
        
      } catch (error) {
        console.error('Failed to fetch cars', error);
      }
    }
    fetchAllCars()
  }, [])


  const handleDelete = async (id) => {
try {
  const res=await axios.delete(`${baseUrl}/admin/deletecars/${id}`)
console.log("deleted") 
toast("Deleted",{
  position: "top-center"
})
setCars(prevCars => prevCars.filter(car => car._id !== id));

} catch (error) {
  console.log(error)
}

  }
 
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3 text-primary">Car List</h2>
      <div className="row">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div className="col-12 col-md-6 col-lg-4 mb-3" key={car._id}>
              <div className="card">
              <img
    src={car.image }
    className="card-img-top"
    alt={car.model}
    style={{ height: '200px', objectFit: 'cover' }}
  />
                <div className="card-body">
                  <h5 className="card-title">{car.model}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{car.brand}</h6>
                  <p className="card-text">
                  <strong>Description:</strong> {car.description}
                  <br />
                    <strong>Registration Number:</strong> {car.registrationNumber}
                    <br />
                    <strong>Availability:</strong> {car.availability ? 'Available' : 'Not Available'}

                    <br />
                    <strong>Year:</strong> {car.year}
                    <br />
                    <strong>Location:</strong> {car.location}
                    <br />
                    
                    <strong>Vehicle Number:</strong> {car.vehicleNumber}

                  </p>
                  {/* <button className="btn btn-primary">View</button> */}
                  <button className="btn btn-danger ml-2" onClick={() => handleDelete(car._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  )
}

export default Allcars