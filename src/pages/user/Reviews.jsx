import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Reviews = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    const carId = id;

    const [formData, setFormData] = useState({
        comments: '',
    });

    const [cars, setCars] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const viewReview = async () => {
            try {
                const res = await axios.get(`${baseUrl}/cars/getcars/${id}`, {
                    withCredentials: true,
                });
                setCars(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        viewReview();
    }, [id, baseUrl]);

    useEffect(() => {
        fetchReviews();
    }, [id, baseUrl]);

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`${baseUrl}/review/listreviews/${id}`, {
                withCredentials: true,
            });
            setReviews(res.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleCommentChange = (e) => {
        setFormData({ ...formData, comments: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${baseUrl}/review/create`,
                {
                    comments: formData.comments,
                    carId: carId,
                },
                {
                    withCredentials: true,
                }
            );

            console.log('Response:', res.data);
            toast.success("your comment added", {
                position: "top-center",
            })

            // Clear the form and refetch reviews
            setFormData({ comments: '' });
            fetchReviews();
        } catch (error) {
            console.error('Error uploading review:', error);
        }
    };

    return (
        <div>
            {/* Car Image and Existing Reviews */}
            <form className="container mt-4">
                <div className="row g-3 align-items-start">
                    {/* Car Image */}
                    <div className="col-md-6">
                        <img src={cars.image} alt="Car" style={{ width: '100%', maxWidth: '300px' }} />
                    </div>

                    {/* Reviews */}
                    <div className="col-md-6">
                        <h5>User Reviews</h5>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <textarea
                                    key={index}
                                    className="form-control mb-2"
                                    rows="4"
                                    value={review.comments || 'no comments'}
                                    readOnly
                                ></textarea>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                </div>
            </form>

            {/* Add New Review Form */}
            <form onSubmit={handleSubmit} className="container mt-4">
                <div className="row g-3 align-items-start">
                    <div className="col-md-6">
                        <label htmlFor="comment" className="form-label">
                            Your Review
                        </label>
                        <textarea
                            className="form-control"
                            id="comment"
                            rows="4"
                            value={formData.comments}
                            onChange={handleCommentChange}
                            placeholder="Write your review here..."
                        ></textarea>
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                        <button type="submit" className="btn btn-primary">
                            Submit Review
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default Reviews;
