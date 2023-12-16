const express = require('express');
const router = express.Router();
const Apartment = require('../models/Apartment');
const Owner = require('../models/Owner');



const addApartment = async (req, res) => {
    try {
      const { owner, etage, number } = req.body;

      let ownerId;

      // Check if the owner exists based on the provided name
      const existingOwner = await Owner.findOne({ fullName: owner });

      if (existingOwner) {
        ownerId = existingOwner._id; // Use the existing owner's ObjectId
      } else {
        // If the owner doesn't exist, create a new owner
        const newOwner = await Owner.create({ fullName: owner });
        ownerId = newOwner._id; // Use the newly created owner's ObjectId
      }

      const apartmentData = {
        owner: ownerId,
        etage,
        number,
      };

      const apartment = await Apartment.create(apartmentData);
      res.status(201).json(apartment);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  };


// populate
const getApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find().populate('owner', 'fullName');
    res.status(200).json(apartments);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};



const getApartment = async (req, res) => {
    try {
      const { id } = req.params;
      const apartment = await Apartment.findById(id);
      res.status(200).json(apartment);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
};



const deleteApartment = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedApartment = await Apartment.findByIdAndDelete(id);
      res.status(200).json(deletedApartment);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
};




const updateApartment = async (req, res) => {
    try {
      const { id } = req.params;
      const { owner, etage, number } = req.body;

      const existingOwner = await Owner.findById(owner); // Assuming owner is the ID of the Owner

      if (!existingOwner) {
        return res.status(400).json({ error: 'Owner not found' });
      }

      const apartmentData = {
        owner: existingOwner._id, // Use the owner's ID
        etage,
        number
      };

      const updatedApartment = await Apartment.findByIdAndUpdate(id, apartmentData, { new: true });
      res.status(200).json(updatedApartment);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
};


module.exports = { addApartment , getApartments, getApartment, deleteApartment, updateApartment };
