import React from "react";

const ProfileSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-primary mb-6">Profile</h2>
      <div className="bg-white shadow rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-lg">
            <strong>Name:</strong>
          </p>
          <p className="text-lg">
            <strong>Email:</strong>
          </p>

          <p className="text-lg">
            <strong>Address:</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
