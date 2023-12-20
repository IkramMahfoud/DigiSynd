import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import ApartementCard from './ApartementCard'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getOwnersData } from '../redux/actions/ownersAction'



const Appartement = () =>
{
  const [apartments, setApartements] = useState([])
  const history = useHistory();
  const dispatch = useDispatch();

  const getApartments = async () =>
  {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      };
      const res = await axios.get("http://localhost:5000/api/apartement/getAll", config);
      setApartements(res.data);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const getOwners = async () =>
  {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      };
      const res = await axios.get("http://localhost:5000/api/owner/getall", config);
      dispatch(getOwnersData(res.data));
      console.log('(res.data) :', (res.data));

      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };


  //utilisation de (useEffect) dans ce component
  useEffect(() =>
  {
    getApartments();
    getOwners()
  }, [])

  const handleAdd = () =>
  {
    history.push('/apartement/add');
  }


  return (
    <>
      <Navbar />

         <button class="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg text-purple-600 border-purple-600 m-8" onClick={handleAdd}>Add appartement</button>


      {apartments.length ? (
        apartments.map((apartment) => (
          <ApartementCard
            key={apartment._id}
            apartment={apartment}
          />
        ))
      ) : (
        <p>No apartments available</p>
      )}
    </>
  )
}

export default Appartement