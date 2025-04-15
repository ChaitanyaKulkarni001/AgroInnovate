const Profile = ({ user }) => {
    return (
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.profilePhoto || "https://via.placeholder.com/80"}
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    );
  };
  
  export default Profile;
  