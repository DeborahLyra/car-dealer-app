'use client';
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';


function Loading() {
  return <div className="text-center text-lg text-gray-600">Loading...</div>;
}

export function Vehicles() {
  const [vehicles, setVehicles] = useState([]); 
  const [selectedMake, setSelectedMake] = useState(""); 
  const [modelYears, setModelYears] = useState([]); 
  const [selectedYear, setSelectedYear] = useState(""); 

  const getData = async () => {
    const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json');
    const data = await response.json();
    setVehicles(data.Results);
  };

  const getModelYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2015; year <= currentYear; year++) {
      years.push(year); 
    }
    setModelYears(years);
  };

  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value); 
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value); 
  };

  useEffect(() => {
    getData(); 
    getModelYears(); 
  }, []);

  const isButtontEnabled = selectedMake && selectedYear;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">Vehicle Selection</h1>

      <div className="mb-4">
        <label htmlFor="vehicle-make" className="block text-slate-600 text-lg font-medium mb-2">Type of Vehicle:</label>
        <select
          id="vehicle-make"
          value={selectedMake}
          onChange={handleMakeChange}
          className="w-full p-3 border text-slate-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
        >
          <option value="">Select a make...</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.MakeName} value={vehicle.MakeName}>
              {vehicle.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="model-year" className="block text-slate-600 text-lg font-medium mb-2">Model Year:</label>
        <select
          id="model-year"
          value={selectedYear}
          onChange={handleYearChange}
          disabled={!selectedMake} 
          className="w-full p-3 border text-slate-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-600"
        >
          <option value="">Select a year...</option>
          {modelYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center">
        <Link href={`/results/${selectedMake}/${selectedYear}`} >
          <button
            className={`mt-4 px-6 py-3 text-white rounded-md transition duration-300 ease-in-out ${isButtontEnabled ? 'bg-fuchsia-800 hover:bg-fuchsia-600' : 'bg-gray-500 cursor-not-allowed'}`}
            disabled={!isButtontEnabled}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function VehiclesWithSuspense() {
  return (
    <Suspense fallback={<Loading />}>
      <Vehicles />
    </Suspense>
  );
}
