const ProfileInfo = () => {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Personal Information</h2>
        <form className="space-y-4">
          <div className="flex gap-4">
            <input type="text" placeholder="First Name" className="w-1/2 input-style" />
            <input type="text" placeholder="Last Name" className="w-1/2 input-style" />
          </div>
  
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="male" /> Male
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="gender" value="female" /> Female
            </label>
          </div>
  
          <input type="email" placeholder="Email Address" className="input-style" />
          <input type="tel" placeholder="Mobile Number" className="input-style" />
  
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Save Changes
          </button>
        </form>
      </div>
    );
  };
  
  export default ProfileInfo;
  