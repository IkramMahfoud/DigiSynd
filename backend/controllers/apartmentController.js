// routes/apartmentRoutes.js
const express = require('express');
const router = express.Router();
const Apartment = require('../models/Apartment');


const addApartment = async (req, res) => {
    try {
        const { owner, etage, money } = req.body;
        // here
        const rentpaid = Boolean(money);

        const data = {
            owner,
            etage,
            rentpaid
        };

        const apartment = await Apartment.create(data);
        res.status(201).json(apartment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};


const getApartment = async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.status(200).json(apartments);
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
        const { owner, etage, money } = req.body;
        const rentpaid = Boolean(money);

        const data = {
            owner,
            etage,
            rentpaid
        };

        const updatedApartment = await Apartment.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json(updatedApartment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};


module.exports = { addApartment, getApartment, deleteApartment, updateApartment };
