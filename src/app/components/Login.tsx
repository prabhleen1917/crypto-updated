"use client"
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login, closeModal } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) {
      return;
    }

    try {
      setError('');
      setLoading(true);

      await login(emailRef.current.value, passwordRef.current.value);
      window.location.href = '/';
      // To log all cookies
console.log(Cookies.get());

// To log a specific cookie
console.log(Cookies.get('cookie_name'));
     // closeModal();
    } catch (err) {
      if (err instanceof Error) {
        setLoading(false);
        setError(err.message);
      }
    }
  };

  const redirectToRegister = () => {
    // Prefer using useRouter for internal navigation
    window.location.href = '/register';
  };

  const guestLogin = async () => {
    try {
      console.log('inside guest');
      setError('');

       await login('guest@email.com', 'guest123');
      //await axios.post('http://localhost:5000/users/signin', { email: 'guest@email.com' , password: 'guest123' }, { withCredentials: true });
      console.log('Guest login successful');
      window.location.href = '/';
      // closeModal();
    } catch (err) {
      if (err instanceof Error) {
        setLoading(false);
        setError(err.message);
      }
    }
  };

//   const guestLogin = async () => {
//     try {
//       console.log('inside guest');
//       setError('');

      
//       await (async () => {
//         await login('guest@email.com', 'guest123');
//       })();
//       // closeModal();
//     } catch (err) {
//       console.log('Error during guest login:', err);
//       if (err instanceof Error) {
//         // setLoading(false);
//         setError(err.message);
//       } else {
//         // Handle cases where the error might not be an instance of Error
//         setLoading(false);
//         setError('An unexpected error occurred');
//       }
//     }
// };


  console.log('Modal is Open');
  
  return (
    // The outermost div is a flex container centered both horizontally and vertically
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-wrap justify-center bg-black md:justify-between items-center max-w-4xl mx-auto p-4 rounded-lg shadow-xl">
        {/* Left side (form) */}
        <div className="w-full md:w-1/2 px-6 py-8">
          <h2 className="text-2xl uppercase font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-2">Email</label>
              <input
                className="text-indigo-500 px-4 py-2 rounded-md w-full border"
                type="text"
                id="email"
                ref={emailRef}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block font-bold mb-2">Password</label>
              <input
                className="text-indigo-500 px-4 py-2 rounded-md w-full border"
                type="password"
                id="password"
                ref={passwordRef}
                required
              />
            </div>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <button
              className="px-4 py-2 bg-indigo-500 rounded-md font-bold text-white hover:bg-indigo-600 transition-all w-full mb-4"
              disabled={loading}
              type="submit"
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-gray-500 rounded-md font-bold text-white hover:bg-gray-600 transition-all w-full"
              disabled={loading}
              onClick={guestLogin}
              type="button"
            >
              Guest Login
            </button>
          </form>
          <div className="text-center mt-4">
            Need an account?{' '}
            <a
              className="cursor-pointer text-indigo-500 underline"
              onClick={redirectToRegister}
            >
              Register
            </a>
          </div>
        </div>
        {/* Right side (image) */}
        <div className="w-full md:w-1/2 hidden md:block">
          <Image src="/login-illustration.svg" alt="Login Illustration" width={400} height={400} />
        </div>
      </div>
    </div>
  );
};

export default Login;
