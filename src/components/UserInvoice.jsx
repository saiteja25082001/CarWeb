"use client";

import DBConnection from "@/app/utils/config/db";
import React, { useEffect, useState } from "react";
import { BiBold } from "react-icons/bi";

const UserInvoice = ({ userId }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvoice = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`);
      const data = await response.json();
    //  await DBConnection();

      if (response.ok) {
        setInvoice(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch invoice data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [userId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!invoice || !invoice.bookings || invoice.bookings.length === 0) {
    return <div className="no-bookings">No bookings available</div>;
  }

  return (
    <div className="invoice-container">
      <h1 className="invoice-header"><span style={{ color: "black", fontSize: "24px", fontWeight: "bold" }}>Username:</span> {invoice.username}</h1>
         {/* <h1 style={{color:"green",fontWeight:}}>Orders</h1> */}
         <h2 className="invoice-email" style={{ color: "green", fontSize: "24px", fontWeight: "bold" }}>Orders</h2>


      <div className="bookings-container">
        {invoice.bookings.map((item) => (
          <div key={item._id} className="booking-card">
            <img src={item.image} alt={item.title} className="booking-image" />
            <div className="booking-details">
              <h3 className="booking-title">{item.title}</h3>
              <p className="booking-dates">
                Booking dates: {item.startDate} to {item.endDate}
              </p>
              <p className="booking-price">Price per day: ₹{item.price}</p>
              <p className="booking-offer">Offer: {item.offer || "N/A"}%</p>
              {/* <p className="booking-description">
                <strong>Description:</strong>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.description || "No description available",
                  }}
                />
              </p> */}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* Invoice Container Styles */
        .invoice-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          background-color: #f9f9f9;
        }

        .invoice-header,
        .invoice-email {
          text-align: center;
          color: #333;
        }

        .bookings-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        /* Booking Card Styles */
        .booking-card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }

        .booking-card:hover {
          transform: translateY(-5px);
        }

        .booking-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .booking-details {
          padding: 15px;
        }

        .booking-title {
          font-size: 1.2em;
          font-weight: bold;
          color: #333;
        }

        .booking-dates,
        .booking-price,
        .booking-offer,
        .booking-description {
          margin-top: 10px;
          font-size: 1em;
          color: #666;
        }

        .booking-description {
          font-size: 0.9em;
          color: #444;
        }

        .loading,
        .error,
        .no-bookings {
          text-align: center;
          font-size: 1.5em;
          color: #555;
        }

        /* Optional: Styling for the "Offer" text */
        .booking-offer {
          font-weight: bold;
          color: #e74c3c;
        }
      `}</style>
    </div>
  );
};

export default UserInvoice;
