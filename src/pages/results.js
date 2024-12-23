'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function Loading() {
  return <div className="text-center text-lg text-gray-600">Loading...</div>;
}

export default function Result() {
  const router = useRouter();
  const { makeId, year } = router.query; 
  const [vehicleModels, setVehicleModels] = useState([]);
  const [error, setError] = useState(null);

  const getVehicleModels = async () => {
    if (makeId && year) {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );
        const data = await response.json();
        setVehicleModels(data.Results);
      } catch (err) {
        setError('Failed to load vehicle models. Please try again.');
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">
        Vehicles: {makeId} - {year}
      </h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div>
        {vehicleModels.length > 0 ? (
          <ul className="space-y-4">
            {vehicleModels.map((model, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="text-xl text-slate-800">{model.Model_Name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-slate-600">Loading...</p>
        )}
      </div>
    </div>
  );

  
}
