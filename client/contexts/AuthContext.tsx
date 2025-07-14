import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "restaurant" | "charity" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  organizationName: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    role: UserRole,
    organizationName: string,
  ) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users for demo purposes
  const mockUsers: User[] = [
    {
      id: "1",
      email: "restaurant@demo.com",
      role: "restaurant",
      organizationName: "Downtown Kitchen",
      isVerified: true,
    },
    {
      id: "2",
      email: "charity@demo.com",
      role: "charity",
      organizationName: "City Food Bank",
      isVerified: true,
    },
    {
      id: "3",
      email: "admin@demo.com",
      role: "admin",
      organizationName: "ResQBites Admin",
      isVerified: true,
    },
    {
      id: "4",
      email: "pending@demo.com",
      role: "charity",
      organizationName: "Hope Community Center",
      isVerified: false,
    },
  ];

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("resqbites_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("resqbites_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find mock user by email only (role is determined by the user's actual role)
    const foundUser = mockUsers.find((u) => u.email === email);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("resqbites_user", JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (
    email: string,
    password: string,
    role: UserRole,
    organizationName: string,
  ): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      role,
      organizationName,
      isVerified: role === "restaurant", // Restaurants are auto-verified, charities need approval
    };

    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem("resqbites_user", JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("resqbites_user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
