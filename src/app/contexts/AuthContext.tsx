"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define user and watchlist item types
interface User {
  email: string;
  id: string;
}

interface WatchListItem {
  uuid: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  error: string | null;
  loading: boolean;
  modalIsOpen: boolean;
  isLoginModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  watchlist: WatchListItem[];
  getUserwatchlist: () => Promise<void>;
  toggleLoginModal: (value: boolean) => void;
  addtoWatchList: (itemId: string) => Promise<void>;
  removeFromWatchList: (itemId: string) => Promise<void>;
}

const initialAuthState: AuthContextType = {
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  error: null,
  loading: false,
  modalIsOpen: false,
  isLoginModal: true,
  openModal: () => {},
  closeModal: () => {},
  watchlist: [],
  getUserwatchlist: async () => {},
  toggleLoginModal: () => {},
  addtoWatchList: async () => {},
  removeFromWatchList: async () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthState);

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isLoginModal, setIsLoginModal] = useState<boolean>(true);
  const [watchlist, setWatchlist] = useState<WatchListItem[]>([]);

  const fetchUser = async () => {
    console.log("i am inside fetch")
    setLoading(true);
    try {
      const response = await axios.get('https://puce-betta-cape.cyclic.app/users/user', { withCredentials: true });
      setUser(response.data.user);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch user data');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // const login = async (email: string, password: string) => {
  //   setLoading(true);
  //   try {
  //     await axios.post('http://localhost:5000/users/signin', { email, password }, { withCredentials: true });
  //     await fetchUser();
  //     setError(null);
  //   } catch (error) {
  //     setError('Failed to login');
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

 const login = async (email: string, password: string) => {
    console.log('Attempting to login with', email); 
    try {
      await axios.post('https://puce-betta-cape.cyclic.app/users/signin', { email, password }, { withCredentials: true });
      await fetchUser();
      setError(null);
    } catch (error) {
      setError('Failed to login');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  const logout = async () => {
    try {
      await axios.post('https://puce-betta-cape.cyclic.app/users/logout', {}, { withCredentials: true });
      setUser(null);
      setError(null);
    } catch (error) {
      setError('Failed to logout');
      console.error(error);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    console.log('Attempting to login with', email); 
    setLoading(true);
    try {
      await axios.post('https://puce-betta-cape.cyclic.app/users/signup', { username, email, password }, { withCredentials: true });
      await fetchUser();
      setError(null);
    } catch (error) {
      setError('Failed to register');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const openModal = () => {
    setModalIsOpen(true);
    console.log("Modal should be open now");
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    setIsLoginModal(false); // Consider resetting this too, based on your modal logic.
    console.log("Modal should be closed now");
  };
  
  const toggleLoginModal = (value: boolean) => {
    setIsLoginModal(value);
    setModalIsOpen(true); // Ensure this is here to open the modal whenever toggling.
    console.log("Toggling login modal to:", value);
  };
  
  

  const getUserwatchlist = async () => {
    if (user) {
      try {
        const response = await axios.get('/api/watchlist', { withCredentials: true });
        setWatchlist(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addtoWatchList = async (itemId: string) => {
    if (user) {
      try {
        await axios.post('/api/watchlist/add', { itemId }, { withCredentials: true });
        await getUserwatchlist();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeFromWatchList = async (itemId: string) => {
    if (user) {
      try {
        await axios.post('/api/watchlist/remove', { itemId }, { withCredentials: true });
        await getUserwatchlist();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    error,
    loading,
    modalIsOpen,
    isLoginModal,
    openModal,
    closeModal,
    watchlist,
    getUserwatchlist,
    toggleLoginModal,
    addtoWatchList,
    removeFromWatchList,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
