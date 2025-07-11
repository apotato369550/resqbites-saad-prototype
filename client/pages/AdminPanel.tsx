import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Shield, Construction, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-brand-green rounded-lg">
                <Utensils className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ResQBites</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.organizationName || "Admin"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  logout();
                  navigate("/auth");
                }}
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-brand-blue/10 rounded-full">
                <Construction className="w-8 h-8 text-brand-blue" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">
                  Admin Panel Coming Soon
                </CardTitle>
                <p className="text-gray-600 mb-4">
                  Approve charity registrations and manage platform operations.
                </p>
                <Button
                  className="bg-brand-blue hover:bg-brand-blue/90"
                  style={{ backgroundColor: "hsl(var(--brand-blue))" }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
