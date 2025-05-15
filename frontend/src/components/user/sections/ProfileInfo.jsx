import { useState } from "react";

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-300 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 text-sm font-medium"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="text-green-600 text-sm font-medium"
          >
            Save
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="block text-gray-700 text-sm mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border border-gray-300 rounded-sm p-2 focus:outline-none ${
                !isEditing ? "bg-gray-100 text-gray-600" : ""
              }`}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border border-gray-300 rounded-sm p-2 focus:outline-none ${
                !isEditing ? "bg-gray-100 text-gray-600" : ""
              }`}
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 text-sm mb-2">Your Gender</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={profile.gender === "male"}
                onChange={handleChange}
                disabled={!isEditing}
                className="accent-blue-600"
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={profile.gender === "female"}
                onChange={handleChange}
                disabled={!isEditing}
                className="accent-blue-600"
              />
              Female
            </label>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 text-sm mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border border-gray-300 rounded-sm p-2 focus:outline-none ${
              !isEditing ? "bg-gray-100 text-gray-600" : ""
            }`}
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-gray-700 text-sm mb-1">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border border-gray-300 rounded-sm p-2 focus:outline-none ${
              !isEditing ? "bg-gray-100 text-gray-600" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
