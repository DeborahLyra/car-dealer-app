'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Result() {
  const router = useRouter();
  const { makeId, year } = router.query; 
  const [vehicleModels, setVehicleModels] = useState([]);

  const getVehicleModels = async () => {
    if (makeId && year) {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );
        const data = await response.json();
        setVehicleModels(data.Results);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (makeId && year) {
      getVehicleModels();
    }
  }, [makeId, year]);

  return (
    <div>
      <h1>Vehicles: {makeId} - {year}</h1>

      {<p className="text-red-500">{error}</p>}

      <div>
        {vehicleModels.length > 0 ? (
          <ul>
            {vehicleModels.map((model, index) => (
              <li key={index} className="py-2">
                {model.Model_Name}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
