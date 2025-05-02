import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Allusers() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [users, setusers] = useState([])

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/admin/allusers`)
        console.log(res.data)
        setusers(res.data.users)
        console.log(res.data.users)
        
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    }
    fetchAllUsers()
  }, [])


  const handleDelete = async (id) => {
try {
  const res=await axios.delete(`${baseUrl}/admin/deleteuser/${id}`)
console.log("deleted") 
toast("Deleted",{
  position: "top-center"
})
setusers(prevUsers => prevUsers.filter(user => user._id !== id));

} catch (error) {
  console.log(error)
}

  }
 
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3 text-primary">User List</h2>
      <div className="row">
        {users.length > 0 ? (
          users.map((user) => (
            <div className="col-12 col-md-6 col-lg-4 mb-3" key={user._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{user.role}</h6>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                    <br />
                    <strong>Contact Number:</strong> {user.contactNumber}
                    <br />

                  </p>
                  {/* <button className="btn btn-primary">View</button> */}
                  <button className="btn btn-danger ml-2" onClick={() => handleDelete(user._id)}>Delete</button>
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

export default Allusers