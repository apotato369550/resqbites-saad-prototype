import { useState } from "react";
import { Link } from "react-router-dom";
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

type UserRole = "restaurant" | "charity" | "admin";
type AuthMode = "login" | "register";

export default function Auth() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [selectedRole, setSelectedRole] = useState<UserRole>("restaurant");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log("Auth submit:", { authMode, selectedRole, formData });
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
              >
                {authMode === "login" ? "Sign In" : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4" />
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
