import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import ApartementCard from './ApartementCard'


const Appartement = () =>
{

  const [apartments, setApartements] = useState([])

  const getApartments = async () =>
  {
    await axios.get("http://localhost:5000/api/apartement/getAll")
      .then(res =>
      {
        setApartements(res.data|| []);
        console.log(res.data);

        console.log('res', res)
      }).catch(err => console.error(err))
  }

  //utilisation de (useEffect) dans ce component
  useEffect(() =>
  {
    getApartments()
  }, [])


  return (
    <>
      <Navbar />
      <div>

      </div>
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