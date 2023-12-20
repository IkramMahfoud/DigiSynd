import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


const UpdateAppartement = () =>
{
  const {apartmentId, etage, number, owner } = useParams();
  const [currentetage, setEtage] = useState(etage);
  const [currentnumber, setNumber] = useState(number);
  const [selectedOwner, setSelectedOwner] = useState(owner);

  const owners = useSelector((state) => state.owners.ownersList);

  const handleFormSubmit = async (e) =>
  {
    e.preventDefault();
    try {
      if (localStorage.getItem("accessToken")) {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };

        // req.body
        const updatedApartment = {
          etage: parseInt(currentetage) || 0,
          number: parseInt(currentnumber) || 0,
          owner: selectedOwner, // Use the selected owner ID
        };
        const res = await axios.put(`http://localhost:5000/api/apartement/update/${apartmentId}`, updatedApartment, config);

        console.log('Apartment updated:', res.data);
        // Handle success, show success message.
      }
    } catch (error){
      console.error('Error updating apartment:', error);
      // Handle error, show error message to the user.
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Etage:</label>
        <input type="number" value={currentetage} onChange={(e) => setEtage(e.target.value)} required />
      </div>
      <div>
        <label>Number:</label>
        <input type="number" value={currentnumber} onChange={(e) => setNumber(e.target.value)} required />
      </div>
      <div>
        <label>Owner : </label>
        <select
          value={selectedOwner}
          onChange={(e) => setSelectedOwner(e.target.value)}
          required >
          {owners.map((owner) => (
            <option key={owner._id} value={owner._id} selected={owner._id === selectedOwner}>
              {owner.fullName}
            </option>
          ))}
        </select>

      </div>
      <button type="submit">Update Apartment</button>
    </form>
  );
};

export default UpdateAppartement;
