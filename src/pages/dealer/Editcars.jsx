import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


function Editcars() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [cars, setCars] = useState({
    brand: '',
    model: '',
    pricePerDay: '',
    year: '',
    registrationNumber: '',
    location: '',
    description: '',
    availability: '',
    vehicleNumber: '',
    image: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`${baseUrl}/cars/listone/${id}`, {
          withCredentials: true,
        });
        setCars(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCar();
  }, []);

  const handleChange = (e) => {
    setCars({ ...cars, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();


formData.append('brand', cars.brand);
formData.append('model', cars.model);
formData.append('pricePerDay', cars.pricePerDay);
formData.append('year', cars.year);
formData.append('registrationNumber', cars.registrationNumber);
formData.append('location', cars.location);
formData.append('description', cars.description);
formData.append('availability', cars.availability);
formData.append('vehicleNumber', cars.vehicleNumber);

// Add image only if selected
if (imageFile) {
  formData.append('image', imageFile);
}



    try {
      await axios.put(`${baseUrl}/cars/update/${id}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Car updated successfully');
    } catch (error) {
      console.log(error);
      alert('Failed to update car');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Edit Car</h3>
      <form onSubmit={handleUpdate}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Brand</label>
            <input
              name="brand"
              type="text"
              className="form-control"
              value={cars.brand}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Model</label>
            <input
              name="model"
              type="text"
              className="form-control"
              value={cars.model}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Price Per Day</label>
            <input
              name="pricePerDay"
              type="number"
              className="form-control"
              value={cars.pricePerDay}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Year</label>
            <input
              name="year"
              type="number"
              className="form-control"
              value={cars.year}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Registration Number</label>
            <input
              name="registrationNumber"
              type="text"
              className="form-control"
              value={cars.registrationNumber}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
              name="location"
              type="text"
              className="form-control"
              value={cars.location}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Description</label>
            <input
              name="description"
              type="text"
              className="form-control"
              value={cars.description}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Availability</label>
            <input
              name="availability"
              type="text"
              className="form-control"
              value={cars.availability}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Vehicle Number</label>
            <input
              name="vehicleNumber"
              type="text"
              className="form-control"
              value={cars.vehicleNumber}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Upload New Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImage}
              accept="image/*"
            />
          </div>

          <div className="col-12">
            <label className="form-label">Image Preview</label>
            <div>
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : cars.image}
                alt="Preview"
                className="img-thumbnail"
                style={{ width: '200px' }}
              />
            </div>
          </div>

          <div className="col-12 text-end mt-3">
            <button type="submit" className="btn btn-success px-4">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Editcars;
