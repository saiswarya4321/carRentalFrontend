import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Alldealers() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const [dealers,setDealers]=useState([])

    useEffect(()=>{
const fetchAllDealers= async ()=>{
    try {
        const res = await axios.get(`${baseUrl}/admin/alldealers`)
       console.log(res.data)
        setDealers(res.data.dealers)
        console.log(res.data.dealers)
    } catch (error) {
        console.error('Failed to fetch users', error);
    }
}

fetchAllDealers()
    },[])


const handleDelete = async (id) => {
try {
  const res=await axios.delete(`${baseUrl}/admin/deletedealer/${id}`)
console.log("deleted")
toast("Deleted",{
    position: "top-center"
})
setDealers(prevUsers => prevUsers.filter(dealer => dealer._id !== id));

} catch (error) {
  console.log(error)
}

  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-3">Dealer List</h2>
      <div className="row">
        {dealers.length > 0 ? (
          dealers.map((dealer) => (
            <div className="col-12 col-md-6 col-lg-4 mb-3" key={dealer._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{dealer.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{dealer.role}</h6>
                  <p className="card-text">
                    <strong>Email:</strong> {dealer.email}
                    <br />
                    <strong>Contact Number:</strong> {dealer.contactNumber}
                    <br />
                    
                  </p>
                  {/* <button className="btn btn-primary">View</button> */}
                  <button className="btn btn-danger ml-2" onClick={()=>{handleDelete(dealer._id)}}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  )
}

export default Alldealers