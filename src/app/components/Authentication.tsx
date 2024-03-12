"use client"
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext"; // Update the import path as per your directory structure
import Modal from "react-modal";
import Login from "./Login";
import Register from "./Register";
// import { useRouter } from "next/router";

export default function Authentication() {
  const { user, logout, loading, modalIsOpen, openModal, closeModal, isLoginModal } = useAuth();
  // Add this inside your Authentication component to check if it changes.

  const [error, setError] = useState<string>("");
  // const router = useRouter();

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  const redirectToLogin = () => {
    window.location.href = '/login'; // Redirect to /login route
  };

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '500px',
    },
  };
  return (
    <div className="flex w-full justify-end px-4 py-2">
      {user ? (
        <>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
          {error && <div className="text-red-500">{error}</div>}
        </>
      ) : (
        <>
          <button
            onClick={redirectToLogin} 
            // onClick={() => openModal()}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Authentication Modal"
      >
        
        <button onClick={closeModal} className="close-modal">Close</button>
        {isLoginModal ? (
          <div>
            <h2>Login</h2>
            <Login />
            <button onClick={() => closeModal()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        ) : (
          <div>
            <h2>Register</h2>
            <Register />
            <button onClick={() => closeModal()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        )}
      </Modal>
    
    </div>
    
  );
}
