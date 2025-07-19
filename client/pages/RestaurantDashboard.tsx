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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Phone,
  Mail,
  Camera,
  Star,
} from "lucide-react";

interface FoodDonation {
  id: string;
  name: string;
  type: string;
  quantity: string;
  peopleFed: number;
  numberOfMeals: number;
  description: string;
  expirationTime: string;
  pickupWindow: string;
  location: string;
  contactPerson: string;
  contactPhone: string;
  specialInstructions?: string;
  images: string[];
  status: "active" | "reserved" | "completed" | "expired";
  reservedBy?: string;
  postedAt: string;
  rating?: number;
  feedback?: string;
}

export default function RestaurantDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<FoodDonation | null>(
    null,
  );

  const [donations] = useState<FoodDonation[]>([
    {
      id: "1",
      name: "Fresh Bread Loaves",
      type: "Fresh Bread & Baked Goods",
      quantity: "25 loaves",
      peopleFed: 50,
      numberOfMeals: 50,
      description:
        "Freshly baked sourdough and whole wheat loaves. Perfect for sandwiches or meals. Baked this morning with organic ingredients.",
      expirationTime: "2024-01-15 18:00",
      pickupWindow: "Today 14:00 - 17:00",
      location: "Downtown Kitchen, 123 Main St, Loading Dock",
      contactPerson: "Chef Maria",
      contactPhone: "(555) 123-4567",
      specialInstructions:
        "Please bring insulated bags. Ring bell at loading dock.",
      images: [
        "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop&q=80",
        "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop&q=80",
      ],
      status: "reserved",
      reservedBy: "City Food Bank",
      postedAt: "2024-01-15 10:30",
    },
    {
      id: "2",
      name: "Prepared Sandwiches",
      type: "Prepared Sandwiches",
      quantity: "40 sandwiches",
      peopleFed: 40,
      numberOfMeals: 40,
      description:
        "Turkey, ham, and vegetarian sandwiches with fresh vegetables. Made with whole grain bread and individually wrapped.",
      expirationTime: "2024-01-15 20:00",
      pickupWindow: "Today 16:00 - 19:00",
      location: "Downtown Kitchen, 123 Main St, Loading Dock",
      contactPerson: "Chef Maria",
      contactPhone: "(555) 123-4567",
      images: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80",
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&q=80",
      ],
      status: "active",
      postedAt: "2024-01-15 12:15",
    },
    {
      id: "3",
      name: "Vegetable Soup",
      type: "Soup & Stews",
      quantity: "8 gallons",
      peopleFed: 64,
      numberOfMeals: 64,
      description:
        "Hearty vegetable soup with carrots, celery, onions, and tomatoes. Made with vegetable broth and seasoned with herbs.",
      expirationTime: "2024-01-14 19:00",
      pickupWindow: "Yesterday 15:00 - 18:00",
      location: "Downtown Kitchen, 123 Main St, Loading Dock",
      contactPerson: "Chef Maria",
      contactPhone: "(555) 123-4567",
      images: [
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop&q=80",
      ],
      status: "completed",
      reservedBy: "Hope Community Center",
      postedAt: "2024-01-14 11:00",
      rating: 5,
      feedback: "Amazing soup! Our community loved it. Thank you so much!",
    },
    {
      id: "4",
      name: "Fresh Salad Mix",
      type: "Fresh Produce",
      quantity: "20 lbs",
      peopleFed: 30,
      numberOfMeals: 30,
      description:
        "Mixed greens, tomatoes, cucumbers, and carrots. Perfect for fresh salads. All organic and locally sourced.",
      expirationTime: "2024-01-16 12:00",
      pickupWindow: "Tomorrow 09:00 - 11:00",
      location: "Downtown Kitchen, 123 Main St, Loading Dock",
      contactPerson: "Chef Maria",
      contactPhone: "(555) 123-4567",
      images: [
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80",
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&q=80",
      ],
      status: "active",
      postedAt: "2024-01-15 14:30",
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
  const totalPeopleImpacted = donations
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + d.peopleFed, 0);

  const DonationDetailsDialog = ({ donation }: { donation: FoodDonation }) => (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl">{donation.name}</DialogTitle>
        <DialogDescription>
          Posted on {new Date(donation.postedAt).toLocaleDateString()}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Images */}
        {donation.images.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Photos</h4>
            <div className="grid grid-cols-2 gap-3">
              {donation.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${donation.name} ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-600">Type:</span>
            <p className="text-gray-900">{donation.type}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Quantity:</span>
            <p className="text-gray-900">{donation.quantity}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">
              People Fed:
            </span>
            <p className="text-gray-900">{donation.peopleFed}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Meals:</span>
            <p className="text-gray-900">{donation.numberOfMeals}</p>
          </div>
        </div>

        {/* Description */}
        {donation.description && (
          <div>
            <span className="text-sm font-medium text-gray-600">
              Description:
            </span>
            <p className="text-gray-900 mt-1">{donation.description}</p>
          </div>
        )}

        {/* Timing */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">Timing</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>Pickup:</strong> {donation.pickupWindow}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>Expires:</strong>{" "}
                {new Date(donation.expirationTime).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Location & Contact */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">Pickup Details</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
              <span className="text-sm">{donation.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>Contact:</strong> {donation.contactPerson}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{donation.contactPhone}</span>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {donation.specialInstructions && (
          <div>
            <span className="text-sm font-medium text-gray-600">
              Special Instructions:
            </span>
            <p className="text-gray-900 mt-1">{donation.specialInstructions}</p>
          </div>
        )}

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Status:</span>
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

        {/* Reserved by */}
        {donation.reservedBy && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-amber-800 text-sm">
              <strong>Reserved by:</strong> {donation.reservedBy}
            </p>
          </div>
        )}

        {/* Feedback */}
        {donation.feedback && donation.rating && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-green-800">
                Feedback from {donation.reservedBy}:
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < donation.rating!
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-green-700 text-sm">{donation.feedback}</p>
          </div>
        )}

        {/* Actions */}
        {donation.status === "reserved" && (
          <div className="flex gap-2">
            <Button className="bg-brand-green hover:bg-brand-green/90">
              Confirm Pickup Completed
            </Button>
            <Button variant="outline">Message Charity</Button>
          </div>
        )}
      </div>
    </DialogContent>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ff3e86ddc232c48b08028cac70a1690ce%2F2d8650f58195441d972e3a5eabd229f1?format=webp&width=800"
                  alt="ResQBites Logo"
                  className="w-8 h-8 object-contain"
                />
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
                  <p className="text-2xl font-bold text-gray-900">
                    {totalPeopleImpacted}
                  </p>
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
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="lg:w-32 lg:h-32 w-full h-48 flex-shrink-0">
                    {donation.images.length > 0 ? (
                      <div className="relative">
                        <img
                          src={donation.images[0]}
                          alt={donation.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {donation.images.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            +{donation.images.length - 1} more
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
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
                        <span>{donation.location.split(",")[0]}</span>
                      </div>
                    </div>

                    {donation.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {donation.description}
                      </p>
                    )}

                    {donation.reservedBy && (
                      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-800">
                          <strong>Reserved by:</strong> {donation.reservedBy}
                        </p>
                      </div>
                    )}

                    {donation.feedback && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-green-800">
                            Feedback:
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < donation.rating!
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-green-700">
                          {donation.feedback}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 lg:flex-col">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDonation(donation)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      {selectedDonation && (
                        <DonationDetailsDialog donation={selectedDonation} />
                      )}
                    </Dialog>
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
