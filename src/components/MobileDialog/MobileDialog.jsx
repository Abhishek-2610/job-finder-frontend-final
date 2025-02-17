import React from 'react';

const MobileDialog = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md text-center">
        <p className="text-gray-800 text-lg mb-4">
          Please access this website from a laptop or a larger screen for a better experience.
        </p>
      </div>
    </div>
  );
};

export default MobileDialog;
