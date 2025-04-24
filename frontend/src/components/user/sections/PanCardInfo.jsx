import { useState } from "react";

const PanCardInfo = () => {
  const [panNumber, setPanNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [file, setFile] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleUpload = () => {
    if (panNumber && fullName && file && isChecked) {
      alert("PAN Card details submitted successfully.");
    } else {
      alert("Please fill all fields and accept the declaration.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">PAN Card Information</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PAN Card Number</label>
            <input
              type="text"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your PAN number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload PAN Card (JPEG only)</label>
            <input
              type="file"
              accept=".jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-2 cursor-pointer"
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="mt-1"
            />
            <p className="text-sm text-gray-600">
              I declare that the PAN furnished above is correct and belongs to me. I understand that I am solely responsible for any false declaration.
            </p>
          </div>

          <button
            onClick={handleUpload}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Upload
          </button>

          <a
            href="#"
            className="text-blue-600 text-sm underline hover:text-blue-800 block mt-2"
          >
            Read Terms & Conditions of PAN Card Information
          </a>
        </div>
      </div>
    </div>
  );
};

export default PanCardInfo;
