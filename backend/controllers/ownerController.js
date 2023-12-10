const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');


const addOwner = async (req, res) => {
  try {
      const { fullName, email } = req.body;

      const data = {
        fullName,
        email
      };

      const owner = await Owner.create(data);
      res.status(201).json(owner);
  } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
  }
};



const getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the owner exists before attempting to delete
    const ownerToDelete = await Owner.findById(id);
    if (!ownerToDelete) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    // If the owner exists, proceed with deletion
    await Owner.findByIdAndDelete(id);
    res.status(200).json({ message: 'Owner deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};



module.exports = { addOwner, getAllOwners , deleteOwner};
