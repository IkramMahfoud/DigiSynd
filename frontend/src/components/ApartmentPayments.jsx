import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ApartmentPayments = () =>
{
  const { apartmentId } = useParams();
  const [fetchedPayments, setFetchedPayments] = useState([]);

  const getApartmentPayments = async () =>
  {
    try {
      if (localStorage.getItem("accessToken")) {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };

        const result = await axios.get(`http://localhost:5000/api/payment/getbyapartement/${apartmentId}`, config);

        setFetchedPayments(result.data);
        console.log(fetchedPayments);
      }

    } catch (error) {
      // Handle error
      console.error('Error fetching apartment payments:', error);
    }
  };

  useEffect(() =>
  {
    getApartmentPayments();
  }, []);


  // payment**
  const pay = async (month) =>
  {
    try {
      if (localStorage.getItem("accessToken")) {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };

        const properties = {
          apartement: apartmentId,
          month: month
        }
        const result = await axios.post(`http://localhost:5000/api/payment/add`, properties, config)
        console.log(result.data)
        getApartmentPayments()
      }
    } catch (error) {
      console.error('Error adding apartment payments:', error);
    }

  }

  const cancel = async (id) =>
  {
    try {
      if (localStorage.getItem("accessToken")) {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };

        const result = await axios.delete(`http://localhost:5000/api/payment/delete/${id}`, config)
        console.log(result.data)
        getApartmentPayments()
      }
    } catch (error) {
      console.error('Error cancling apartment payments:', error);
    }
  }


  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Months 1-12

  return (
    <div className="payments-page">
      <h3>{`Apartment Payments`}</h3>
      <div className="payment-list">
        {months.map((month) =>
        {
          // element
          const hasPayment = fetchedPayments.some(payment => payment.month === month);

          return (
            <div
              key={month}
            // className={`payment-item ${hasPayment ? 'paid' : 'not-paid'}`}
            >
              <span>{`Month : ${month}`}</span>
              <span>{hasPayment ? 'Paid' : 'Not Paid'}</span>

              {hasPayment === false ? (
                <button onClick={() => pay(month)}>Pay Now</button>
              ) : (
                <button onClick={() =>
                {
                  const foundPayment = fetchedPayments.find(payment => payment.month === month);
                  cancel(foundPayment._id);
                }}>Cancel</button>
              )}


            </div>
          );
        })}
      </div>
    </div>
  );

};

export default ApartmentPayments;