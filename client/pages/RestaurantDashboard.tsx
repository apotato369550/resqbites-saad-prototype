import { useState } from "react";
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
  Plus,
  Clock,
  MapPin,
  Users,
  Package,
  CheckCircle,
  AlertCircle,
  User,
  LogOut,
  Bell,
  Search,
  Filter,
  Calendar,
  Eye,
} from "lucide-react";

interface FoodDonation {
  id: string;
  name: string;
  type: string;
  quantity: string;
  expirationTime: string;
  pickupWindow: string;
  location: string;
  status: "active" | "reserved" | "completed" | "expired";
  reservedBy?: string;
  postedAt: string;
}

export default function RestaurantDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [donations] = useState<FoodDonation[]>([
    {
      id: "1",
      name: "Fresh Bread Loaves",
      type: "Bakery",
      quantity: "25 loaves",
      expirationTime: "2024-01-15 18:00",
      pickupWindow: "Today 14:00 - 17:00",
      location: "Downtown Kitchen, 123 Main St",
      status: "reserved",
      reservedBy: "City Food Bank",
      postedAt: "2024-01-15 10:30",
    },
    {
      id: "2",
      name: "Prepared Sandwiches",
      type: "Ready-to-eat",
      quantity: "40 sandwiches",
      expirationTime: "2024-01-15 20:00",
      pickupWindow: "Today 16:00 - 19:00",
      location: "Downtown Kitchen, 123 Main St",
      status: "active",
      postedAt: "2024-01-15 12:15",
    },
    {
      id: "3",
      name: "Vegetable Soup",
      type: "Prepared meal",
      quantity: "8 gallons",
      expirationTime: "2024-01-14 19:00",
      pickupWindow: "Yesterday 15:00 - 18:00",
      location: "Downtown Kitchen, 123 Main St",
      status: "completed",
      reservedBy: "Hope Community Center",
      postedAt: "2024-01-14 11:00",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "reserved":
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "expired":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "reserved":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const activeCount = donations.filter((d) => d.status === "active").length;
  const reservedCount = donations.filter((d) => d.status === "reserved").length;
  const completedCount = donations.filter(
    (d) => d.status === "completed",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-brand-green rounded-lg">
                <Utensils className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ResQBites</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.organizationName || "Restaurant"}
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Restaurant Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your food donations and track their impact
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Donations
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activeCount}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reserved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reservedCount}
                  </p>
                </div>
                <div className="p-3 bg-amber-100 rounded-full">
                  <Package className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {completedCount}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Lives Impacted
                  </p>
                  <p className="text-2xl font-bold text-gray-900">147</p>
                </div>
                <div className="p-3 bg-brand-green-light rounded-full">
                  <Users className="w-6 h-6 text-brand-green" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <div className="flex gap-3">
            <Link to="/post-donation">
              <Button className="bg-brand-green hover:bg-brand-green/90">
                <Plus className="w-4 h-4 mr-2" />
                Post New Donation
              </Button>
            </Link>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search donations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Donations List */}
        <div className="space-y-4">
          {donations.map((donation) => (
            <Card
              key={donation.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {donation.name}
                      </h3>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          donation.status,
                        )}`}
                      >
                        <div className="flex items-center gap-1">
                          {getStatusIcon(donation.status)}
                          {donation.status.charAt(0).toUpperCase() +
                            donation.status.slice(1)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span>{donation.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{donation.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{donation.pickupWindow}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{donation.location}</span>
                      </div>
                    </div>

                    {donation.reservedBy && (
                      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-800">
                          <strong>Reserved by:</strong> {donation.reservedBy}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 lg:flex-col">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {donation.status === "reserved" && (
                      <Button
                        size="sm"
                        className="bg-brand-green hover:bg-brand-green/90"
                      >
                        Confirm Pickup
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {donations.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No donations yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start making a difference by posting your first food
                    donation.
                  </p>
                  <Link to="/post-donation">
                    <Button className="bg-brand-green hover:bg-brand-green/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Post Your First Donation
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
