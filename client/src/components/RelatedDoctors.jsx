import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const filtered = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(filtered);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 px-120">
        Related Doctors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relDoc.map((doc) => (
          <div
            key={doc._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-20 h-20 rounded-full object-cover mb-3"
            />
            <p className="font-medium text-gray-800">{doc.name}</p>
            <p className="text-gray-500 text-sm">{doc.speciality}</p>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
