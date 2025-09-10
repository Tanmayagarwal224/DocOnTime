import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const { backendUrl, adminToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { adminToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message)
      console.log(error)
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Doctor</h2>

      {/* Upload Section */}
      <div className="flex flex-col items-center">
        <label
          htmlFor="doc-img"
          className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 w-40 h-40 hover:border-blue-500"
        >
          <img
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
        </label>
        <input
          onChange={(e) => setDocImg(e.target.files[0])}
          type="file"
          id="doc-img"
          hidden
        />
        <p className="text-sm text-gray-500 mt-2">Upload doctor picture</p>
      </div>

      {/* Doctor Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Doctor Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Experience</label>
          <select
            onChange={(e) => setExperience(e.target.value)}
            value={experience}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={`${i + 1} year`}>
                {i + 1} Year
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Fees</label>
          <input
            onChange={(e) => setFees(e.target.value)}
            value={fees}
            type="number"
            placeholder="Fees"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Speciality</label>
          <select
            onChange={(e) => setSpeciality(e.target.value)}
            value={speciality}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option>General physician</option>
            <option>Gynecologist</option>
            <option>Dermatologist</option>
            <option>Pediatricians</option>
            <option>Neurologist</option>
            <option>Gastroenterologist</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Education</label>
          <input
            onChange={(e) => setDegree(e.target.value)}
            value={degree}
            type="text"
            placeholder="Education"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block font-medium mb-1">Address</label>
          <input
            onChange={(e) => setAddress1(e.target.value)}
            value={address1}
            type="text"
            placeholder="Address line 1"
            className="w-full border rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            onChange={(e) => setAddress2(e.target.value)}
            value={address2}
            type="text"
            placeholder="Address line 2"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
      </div>

      {/* About Doctor */}
      <div>
        <label className="block font-medium mb-1">About Doctor</label>
        <textarea
          onChange={(e) => setAbout(e.target.value)}
          value={about}
          placeholder="Write about doctor..."
          rows={5}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctor;
