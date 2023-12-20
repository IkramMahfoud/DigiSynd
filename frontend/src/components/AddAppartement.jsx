import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


const AddAppartement = () => {

  const [etage, setEtage] = useState('');
  const [number, setNumber] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('');
  const owners = useSelector((state) => state.owners.ownersList);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (localStorage.getItem("accessToken")) {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };

        const newApartment = {
          etage: parseInt(etage),
          number: parseInt(number),
          // Use the selected owner ID
          owner: selectedOwner,
        };

        // Make a POST request to add the apartment
        const res = await axios.post('http://localhost:5000/api/apartement/add', newApartment, config);

        console.log('Apartment added:', res.data);
        // handle success here
      }
    } catch (error) {
      console.error('Error adding apartment:', error);
      // Handle error, show error message.
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Etage:</label>
        <input type="number" value={etage} onChange={(e) => setEtage(e.target.value)} required />
      </div>
      <div>
        <label>Number:</label>
        <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
      </div>
      <div>
        <label>Owner:</label>
        <select value={selectedOwner} onChange={(e) => setSelectedOwner(e.target.value)} required>
          <option value="">Select Owner</option>
          {owners.map((owner) => (
            <option key={owner.id} value={owner.id}>
              {owner.fullName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Apartment</button>
    </form>
  );
};

export default AddAppartement;