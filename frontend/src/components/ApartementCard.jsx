import React from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';



const ApartementCard = ({ apartment }) =>
{

  const history = useHistory();


  // update**
  const handleUpdate = () =>
  {
    history.push(`/apartement/update/${apartment._id}/${apartment.etage}/${apartment.number}/${apartment.owner._id}`);
  };

  // payment**
  const hundlePayment = () =>
  {
    history.push(`/apartement/payments/${apartment._id}`);
  };

  // delete**
  const onDelete = async () =>
  {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      await axios.delete(`http://localhost:5000/api/apartement/delete/${apartment._id}`, config);
      console.log('Apartment deleted');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting apartment:', error);
    }
  };



  return (
    <>
        <div class="max-w-sm mx-auto ">
          <div class="relative group my-10">
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
              <div class="space-y-2">
                <p class="text-slate-800">Appartement n° : {apartment.number}</p>
                <p class="text-slate-800">Owner : {apartment.owner.fullName}</p>
                <p class="text-slate-800">Floor : {apartment.etage}</p>
                <p onClick={hundlePayment} class="block text-indigo-400 group:text-slate-800 transition duration-200" target="_blank">See Payment →</p>
              </div>

              <button className='' onClick={handleUpdate}>
                <svg fill='#fdc500' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path opacity="1" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg>
              </button>

              <button className='' onClick={() => onDelete(apartment._id)}>
                <svg fill='#d90816' xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path opacity="1" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
              </button>

            </div>
          </div>
        </div>

    </>
  )
}

export default ApartementCard