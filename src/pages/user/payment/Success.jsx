import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // ⬅️ to read user from Redux

function Success() {
  const hasSaved = useRef(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  const sessionId = location?.state?.paymentDetails?.sessionId;
  
  console.log("User from Redux:", user);
  console.log("Session ID:", sessionId);
  console.log("User ID:", userId);

  useEffect(() => {
    const carId = localStorage.getItem("carId");

    const updateAvailability = async () => {
      try {
        await axios.patch(`${baseUrl}/cars/${carId}/unavailable`, null, {
          withCredentials: true,
        });
        console.log("Car availability set to false");
      } catch (err) {
        console.error("Failed to update availability", err);
      }
    };

    if (carId) {
      updateAvailability();
    }
  }, []);

  useEffect(() => {
    if (hasSaved.current) return;   // skip on second mount
    hasSaved.current = true;

    const carId = localStorage.getItem("carId");
    const days = Number(localStorage.getItem("days") || 1);
    const car = JSON.parse(localStorage.getItem("carData") || "{}");

    // Now we include userId and model
    const body = {
      userId,
      carId,
      model: car.model,
      days,
      totalAmount: car.pricePerDay * days,
      paymentStatus: "completed",
      sessionId,
    };

    console.log("Booking payload being sent:", {
      userId,
      carId,
      model: car.model,
      days,
      totalAmount: car.pricePerDay * days,
      sessionId,
    });

    axios
      .post(`${baseUrl}/booking/create`, body, { withCredentials: true })
      .then(() => console.log("Booking saved"))
      .catch((err) =>
        console.error("Failed to save booking:", err.response?.data || err.message)
      );
  }, [userId, sessionId]);

  return (
    <div style={{ textAlign: "center", marginTop: "6rem" }}>
      <h2>Payment successful 🎉</h2>
      <p>Your booking has been processed.</p>
      <button onClick={() => navigate("/userdashboard/homepage")}>Go to Dashboard</button>
    </div>
  );
}

export default Success;
