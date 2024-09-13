import React from "react";

const WelcomeSection: React.FC = () => {
  return (
    <div className="relative min-h-[400px] flex items-center justify-center bg-cover bg-center text-white">
      <div className="bg-black bg-opacity-60 p-8 rounded-md text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome</h1>
        <p className="text-xl">
          We are glad to have you back. Ready to manage your bookings and
          facilities?
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;
