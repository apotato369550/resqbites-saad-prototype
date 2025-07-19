import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  LogOut,
  User,
  Search,
  Filter,
  Eye,
  Shield,
  Users,
  Heart,
  Package,
  TrendingUp,
  MapPin,
  Phone,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  Calendar,
  BarChart3,
  Building,
  Bell,
} from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  joinedDate: string;
  totalDonations: number;
  livesImpacted: number;
  mealsProvided: number;
  rating: number;
  status: "active" | "inactive";
  lastDonation: string;
}

interface Charity {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  registrationDate: string;
  status: "verified" | "pending" | "rejected";
  donationsReceived: number;
  livesImpacted: number;
  mealsDistributed: number;
  lastActivity: string;
  verificationDocuments?: string[];
}

interface DonationRecord {
  id: string;
  restaurantName: string;
  charityName: string;
  foodName: string;
  quantity: string;
  peopleFed: number;
  mealsProvided: number;
  donatedDate: string;
  completedDate: string;
  status: "completed" | "in_progress" | "cancelled";
  rating?: number;
}

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "overview" | "restaurants" | "charities" | "donations"
  >("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharity, setSelectedCharity] = useState<Charity | null>(null);
  const [approvingCharity, setApprovingCharity] = useState<string | null>(null);

  const [restaurants] = useState<Restaurant[]>([
    {
      id: "1",
      name: "Downtown Kitchen",
      address: "123 Main St, Downtown",
      phone: "(555) 123-4567",
      email: "maria@downtownkitchen.com",
      joinedDate: "2023-08-15",
      totalDonations: 45,
      livesImpacted: 892,
      mealsProvided: 1156,
      rating: 4.8,
      status: "active",
      lastDonation: "2024-01-15",
    },
    {
      id: "2",
      name: "Bella Vista Bistro",
      address: "456 Oak Avenue, Midtown",
      phone: "(555) 987-6543",
      email: "antonio@bellavista.com",
      joinedDate: "2023-09-22",
      totalDonations: 23,
      livesImpacted: 456,
      mealsProvided: 578,
      rating: 4.6,
      status: "active",
      lastDonation: "2024-01-14",
    },
    {
      id: "3",
      name: "Green Leaf Cafe",
      address: "789 Pine Street, Uptown",
      phone: "(555) 456-7890",
      email: "sarah@greenleaf.com",
      joinedDate: "2023-07-10",
      totalDonations: 67,
      livesImpacted: 1234,
      mealsProvided: 1567,
      rating: 4.9,
      status: "active",
      lastDonation: "2024-01-13",
    },
  ]);

  const [charities] = useState<Charity[]>([
    {
      id: "1",
      name: "City Food Bank",
      address: "100 Community Ave, Downtown",
      phone: "(555) 111-2222",
      email: "director@cityfoodbank.org",
      registrationDate: "2023-08-20",
      status: "verified",
      donationsReceived: 28,
      livesImpacted: 1892,
      mealsDistributed: 2145,
      lastActivity: "2024-01-15",
    },
    {
      id: "2",
      name: "Hope Community Center",
      address: "250 Hope Street, Eastside",
      phone: "(555) 333-4444",
      email: "coordinator@hopecenter.org",
      registrationDate: "2024-01-10",
      status: "pending",
      donationsReceived: 0,
      livesImpacted: 0,
      mealsDistributed: 0,
      lastActivity: "2024-01-10",
      verificationDocuments: ["business_certificate.pdf", "tax_exemption.pdf"],
    },
    {
      id: "3",
      name: "Neighborhood Relief",
      address: "75 Relief Road, Westside",
      phone: "(555) 555-6666",
      email: "info@neighborhoodrelief.org",
      registrationDate: "2023-11-05",
      status: "verified",
      donationsReceived: 15,
      livesImpacted: 675,
      mealsDistributed: 823,
      lastActivity: "2024-01-12",
    },
    {
      id: "4",
      name: "New Hope Shelter",
      address: "300 Shelter Lane, Southside",
      phone: "(555) 777-8888",
      email: "director@newhopeshelter.org",
      registrationDate: "2024-01-08",
      status: "rejected",
      donationsReceived: 0,
      livesImpacted: 0,
      mealsDistributed: 0,
      lastActivity: "2024-01-08",
    },
  ]);

  const [donationRecords] = useState<DonationRecord[]>([
    {
      id: "1",
      restaurantName: "Downtown Kitchen",
      charityName: "City Food Bank",
      foodName: "Vegetable Soup",
      quantity: "8 gallons",
      peopleFed: 64,
      mealsProvided: 64,
      donatedDate: "2024-01-14",
      completedDate: "2024-01-14",
      status: "completed",
      rating: 5,
    },
    {
      id: "2",
      restaurantName: "Green Leaf Cafe",
      charityName: "Neighborhood Relief",
      foodName: "Fresh Bread",
      quantity: "30 loaves",
      peopleFed: 60,
      mealsProvided: 60,
      donatedDate: "2024-01-13",
      completedDate: "2024-01-13",
      status: "completed",
      rating: 4,
    },
    {
      id: "3",
      restaurantName: "Bella Vista Bistro",
      charityName: "City Food Bank",
      foodName: "Pasta Meals",
      quantity: "25 servings",
      peopleFed: 25,
      mealsProvided: 25,
      donatedDate: "2024-01-12",
      completedDate: "2024-01-12",
      status: "completed",
      rating: 5,
    },
    {
      id: "4",
      restaurantName: "Downtown Kitchen",
      charityName: "City Food Bank",
      foodName: "Prepared Sandwiches",
      quantity: "40 sandwiches",
      peopleFed: 40,
      mealsProvided: 40,
      donatedDate: "2024-01-15",
      completedDate: "",
      status: "in_progress",
    },
  ]);

  const handleApproveCharity = async (
    charityId: string,
    action: "approve" | "reject",
  ) => {
    setApprovingCharity(charityId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(`${action} charity:`, charityId);
    setApprovingCharity(null);
    setSelectedCharity(null);
    // In real app, would update charity status
  };

  const totalRestaurants = restaurants.length;
  const totalCharities = charities.filter(
    (c) => c.status === "verified",
  ).length;
  const pendingCharities = charities.filter(
    (c) => c.status === "pending",
  ).length;
  const totalLivesImpacted = restaurants.reduce(
    (sum, r) => sum + r.livesImpacted,
    0,
  );
  const totalMealsProvided = restaurants.reduce(
    (sum, r) => sum + r.mealsProvided,
    0,
  );
  const completedDonations = donationRecords.filter(
    (d) => d.status === "completed",
  ).length;

  const CharityDetailsDialog = ({ charity }: { charity: Charity }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-brand-green" />
          {charity.name}
        </DialogTitle>
        <DialogDescription>
          Registration submitted on{" "}
          {new Date(charity.registrationDate).toLocaleDateString()}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Status:</span>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              charity.status === "verified"
                ? "bg-green-100 text-green-800 border-green-200"
                : charity.status === "pending"
                  ? "bg-amber-100 text-amber-800 border-amber-200"
                  : "bg-red-100 text-red-800 border-red-200"
            }`}
          >
            {charity.status.charAt(0).toUpperCase() + charity.status.slice(1)}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-600">Contact:</span>
            <p className="text-gray-900">{charity.email}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Phone:</span>
            <p className="text-gray-900">{charity.phone}</p>
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-gray-600">Address:</span>
          <p className="text-gray-900">{charity.address}</p>
        </div>

        {/* Stats */}
        {charity.status === "verified" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-3">
              Impact Statistics
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-800">
                  {charity.donationsReceived}
                </p>
                <p className="text-sm text-green-600">Donations Received</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-800">
                  {charity.livesImpacted}
                </p>
                <p className="text-sm text-green-600">Lives Impacted</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-800">
                  {charity.mealsDistributed}
                </p>
                <p className="text-sm text-green-600">Meals Distributed</p>
              </div>
            </div>
          </div>
        )}

        {/* Verification Documents */}
        {charity.verificationDocuments &&
          charity.verificationDocuments.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Verification Documents
              </h4>
              <div className="space-y-2">
                {charity.verificationDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                  >
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{doc}</span>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Actions */}
        {charity.status === "pending" && (
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-brand-green hover:bg-brand-green/90"
              onClick={() => handleApproveCharity(charity.id, "approve")}
              disabled={approvingCharity === charity.id}
            >
              {approvingCharity === charity.id ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Approving...
                </div>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
              onClick={() => handleApproveCharity(charity.id, "reject")}
              disabled={approvingCharity === charity.id}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Reject
            </Button>
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
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ff3e86ddc232c48b08028cac70a1690ce%2F2d8650f58195441d972e3a5eabd229f1?format=webp&width=800"
                  alt="ResQBites Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">ResQBites</span>
              <span className="text-sm text-gray-500 ml-2">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Platform Administration
          </h1>
          <p className="text-gray-600">
            Manage restaurants, charities, and monitor platform activity
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "restaurants", label: "Restaurants", icon: Building2 },
                { id: "charities", label: "Charities", icon: Heart },
                { id: "donations", label: "Donation Records", icon: Package },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-brand-green text-brand-green"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Restaurants
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {totalRestaurants}
                      </p>
                    </div>
                    <div className="p-3 bg-brand-orange/20 rounded-full">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2Ff3e86ddc232c48b08028cac70a1690ce%2F2d8650f58195441d972e3a5eabd229f1?format=webp&width=800"
                        alt="ResQBites"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Verified Charities
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {totalCharities}
                      </p>
                      {pendingCharities > 0 && (
                        <p className="text-xs text-amber-600">
                          +{pendingCharities} pending
                        </p>
                      )}
                    </div>
                    <div className="p-3 bg-brand-green-light rounded-full">
                      <Heart className="w-6 h-6 text-brand-green" />
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
                        {totalLivesImpacted.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Meals
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {totalMealsProvided.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Package className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Restaurants by Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {restaurants
                      .sort((a, b) => b.livesImpacted - a.livesImpacted)
                      .slice(0, 3)
                      .map((restaurant, index) => (
                        <div
                          key={restaurant.id}
                          className="flex items-center gap-3"
                        >
                          <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{restaurant.name}</p>
                            <p className="text-sm text-gray-600">
                              {restaurant.livesImpacted} lives •{" "}
                              {restaurant.totalDonations} donations
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">
                              {restaurant.rating}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Charities by Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {charities
                      .filter((c) => c.status === "verified")
                      .sort((a, b) => b.donationsReceived - a.donationsReceived)
                      .slice(0, 3)
                      .map((charity, index) => (
                        <div
                          key={charity.id}
                          className="flex items-center gap-3"
                        >
                          <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{charity.name}</p>
                            <p className="text-sm text-gray-600">
                              {charity.donationsReceived} donations •{" "}
                              {charity.livesImpacted} lives
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Restaurants Tab */}
        {activeTab === "restaurants" && (
          <div className="space-y-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search restaurants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {restaurants.map((restaurant) => (
                <Card key={restaurant.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {restaurant.name}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {restaurant.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">
                          {restaurant.rating}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-900">
                          {restaurant.totalDonations}
                        </p>
                        <p className="text-xs text-gray-600">Donations</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-900">
                          {restaurant.livesImpacted}
                        </p>
                        <p className="text-xs text-gray-600">Lives Impacted</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-900">
                          {restaurant.mealsProvided}
                        </p>
                        <p className="text-xs text-gray-600">Meals</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        Joined:{" "}
                        {new Date(restaurant.joinedDate).toLocaleDateString()}
                      </span>
                      <span>
                        Last donation:{" "}
                        {new Date(restaurant.lastDonation).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Charities Tab */}
        {activeTab === "charities" && (
          <div className="space-y-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search charities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {charities.map((charity) => (
                <Card key={charity.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {charity.name}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {charity.address}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          charity.status === "verified"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : charity.status === "pending"
                              ? "bg-amber-100 text-amber-800 border-amber-200"
                              : "bg-red-100 text-red-800 border-red-200"
                        }`}
                      >
                        {charity.status.charAt(0).toUpperCase() +
                          charity.status.slice(1)}
                      </div>
                    </div>

                    {charity.status === "verified" && (
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-xl font-bold text-gray-900">
                            {charity.donationsReceived}
                          </p>
                          <p className="text-xs text-gray-600">Received</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-gray-900">
                            {charity.livesImpacted}
                          </p>
                          <p className="text-xs text-gray-600">
                            Lives Impacted
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-gray-900">
                            {charity.mealsDistributed}
                          </p>
                          <p className="text-xs text-gray-600">Distributed</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Registered:{" "}
                        {new Date(
                          charity.registrationDate,
                        ).toLocaleDateString()}
                      </span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedCharity(charity)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        {selectedCharity && (
                          <CharityDetailsDialog charity={selectedCharity} />
                        )}
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === "donations" && (
          <div className="space-y-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search donation records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Donation Records</CardTitle>
                <CardDescription>
                  Complete history of all food donations on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{record.foodName}</h4>
                        <p className="text-sm text-gray-600">
                          {record.restaurantName} → {record.charityName}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>{record.quantity}</span>
                          <span>Feeds {record.peopleFed} people</span>
                          <span>
                            {new Date(record.donatedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {record.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm">{record.rating}</span>
                          </div>
                        )}
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            record.status === "completed"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : record.status === "in_progress"
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-red-100 text-red-800 border-red-200"
                          }`}
                        >
                          {record.status === "in_progress"
                            ? "In Progress"
                            : record.status.charAt(0).toUpperCase() +
                              record.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
