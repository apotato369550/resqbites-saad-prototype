import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Utensils,
  Heart,
  Shield,
  ChefHat,
  HandHeart,
  ArrowRight,
  Mail,
  Lock,
  User,
} from "lucide-react";

import type { UserRole } from "@/contexts/AuthContext";
type AuthMode = "login" | "register";

export default function Auth() {
  const { login, register, isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [selectedRole, setSelectedRole] = useState<UserRole>("restaurant");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const roleOptions = [
    {
      value: "restaurant" as UserRole,
      label: "Restaurant",
      description: "Donate surplus food",
      icon: ChefHat,
      color: "bg-brand-orange text-white",
    },
    {
      value: "charity" as UserRole,
      label: "Charity",
      description: "Receive food donations",
      icon: HandHeart,
      color: "bg-brand-green text-white",
    },
  ];

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case "restaurant":
          navigate("/restaurant");
          break;
        case "charity":
          navigate("/charity");
          break;
        case "admin":
          navigate("/admin");
          break;
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (authMode === "register") {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (!formData.organizationName.trim()) {
        setError("Organization name is required");
        return;
      }
    }

    try {
      let success = false;

      if (authMode === "login") {
        success = await login(formData.email, formData.password);
        if (!success) {
          setError("Invalid email or password. Try demo accounts:");
        }
      } else {
        success = await register(
          formData.email,
          formData.password,
          selectedRole,
          formData.organizationName,
        );
        if (!success) {
          setError("Email already exists or registration failed");
        } else {
          setSuccess("Registration successful! You can now login.");
          setAuthMode("login");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-green-light via-white to-brand-orange-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-brand-green rounded-2xl">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ResQBites</span>
          </div>
          <p className="text-gray-600">
            Connecting surplus food with those in need
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl">
              {authMode === "login" ? "Welcome back" : "Join our mission"}
            </CardTitle>
            <CardDescription>
              {authMode === "login"
                ? "Sign in to your account to continue"
                : "Create an account to start making a difference"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Role Selection - Only show during registration */}
            {authMode === "register" && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  I am a:
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {roleOptions.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => setSelectedRole(role.value)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          selectedRole === role.value
                            ? "border-brand-green bg-brand-green-light"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${role.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {role.label}
                            </div>
                            <div className="text-sm text-gray-600">
                              {role.description}
                            </div>
                          </div>
                          {selectedRole === role.value && (
                            <div className="ml-auto text-brand-green">
                              <div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">{error}</p>
                {error.includes("Try demo accounts") && (
                  <div className="mt-2 text-xs text-red-700 space-y-1">
                    <p>
                      <strong>Restaurant:</strong> restaurant@demo.com (any
                      password)
                    </p>
                    <p>
                      <strong>Charity:</strong> charity@demo.com (any password)
                    </p>
                    <p>
                      <strong>Admin:</strong> admin@demo.com (any password)
                    </p>
                    <p>
                      <strong>Pending Charity:</strong> pending@demo.com (any
                      password)
                    </p>
                    <p className="text-red-600 mt-1">
                      Role selection is ignored for login
                    </p>
                  </div>
                )}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 text-sm">{success}</p>
              </div>
            )}

            {/* Demo Account Info */}
            {authMode === "login" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-sm font-medium mb-2">
                  Demo Accounts:
                </p>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>
                    <strong>Restaurant:</strong> restaurant@demo.com
                  </p>
                  <p>
                    <strong>Charity:</strong> charity@demo.com
                  </p>
                  <p>
                    <strong>Admin:</strong> admin@demo.com
                  </p>
                  <p>
                    <strong>Pending Charity:</strong> pending@demo.com
                  </p>
                  <p className="text-blue-600 mt-1">
                    Use any password (role selection is ignored for login)
                  </p>
                </div>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === "register" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {selectedRole === "restaurant"
                      ? "Restaurant Name"
                      : "Organization Name"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder={
                        selectedRole === "restaurant"
                          ? "Enter restaurant name"
                          : "Enter organization name"
                      }
                      value={formData.organizationName}
                      onChange={(e) =>
                        handleInputChange("organizationName", e.target.value)
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {authMode === "register" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {authMode === "login"
                      ? "Signing In..."
                      : "Creating Account..."}
                  </div>
                ) : (
                  <>
                    {authMode === "login" ? "Sign In" : "Create Account"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Auth Mode Toggle */}
            <div className="text-center">
              <button
                type="button"
                onClick={() =>
                  setAuthMode(authMode === "login" ? "register" : "login")
                }
                className="text-sm text-brand-green hover:text-brand-green/80 font-medium"
              >
                {authMode === "login"
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>

            {/* Legal Notice for Registration */}
            {authMode === "register" && (
              <div className="text-xs text-gray-600 text-center space-y-2">
                <p>
                  By creating an account, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
                {selectedRole === "charity" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-amber-800 text-xs">
                        Charity accounts require verification. You'll be able to
                        browse donations but not reserve them until your account
                        is approved by our team.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>&copy; 2024 ResQBites. Making food rescue simple.</p>
        </div>
      </div>
    </div>
  );
}
