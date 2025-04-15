import React, { useEffect, useState } from 'react';
import Profile from '../../components/user/Profile'
import History from '../../components/user/History'
import { fetchUserData } from '../../services/api';

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData().then(data => {
      setUser(data);
    });
  }, []);

  if (!user) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <Profile user={user} />
      <History history={user.history} />
    </div>
  );
};

export default UserDashboard;
