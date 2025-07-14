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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Utensils,
  LogOut,
  User,
  Search,
  Filter,
  Eye,
  Heart,
  Clock,
  MapPin,
  Users,
  Package,
  Phone,
  Calendar,
  Camera,
  CheckCircle,
  HandHeart,
  AlertTriangle,
  Bell,
  Navigation,
} from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  totalDonations: number;
  rating: number;
}

interface AvailableDonation {
  id: string;
  restaurant: Restaurant;
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
  distance: string;
  postedAt: string;
  urgency: "high" | "medium" | "low";
}

export default function CharityDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedDonation, setSelectedDonation] =
    useState<AvailableDonation | null>(null);
  const [acceptingDonation, setAcceptingDonation] = useState<string | null>(
    null,
  );

  const [availableDonations] = useState<AvailableDonation[]>([
    {
      id: "2",
      restaurant: {
        id: "1",
        name: "Downtown Kitchen",
        address: "123 Main St, Downtown",
        phone: "(555) 123-4567",
        totalDonations: 45,
        rating: 4.8,
      },
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
      distance: "0.8 miles",
      postedAt: "2024-01-15 12:15",
      urgency: "high",
    },
    {
      id: "4",
      restaurant: {
        id: "1",
        name: "Downtown Kitchen",
        address: "123 Main St, Downtown",
        phone: "(555) 123-4567",
        totalDonations: 45,
        rating: 4.8,
      },
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
      distance: "0.8 miles",
      postedAt: "2024-01-15 14:30",
      urgency: "low",
    },
    {
      id: "5",
      restaurant: {
        id: "2",
        name: "Bella Vista Bistro",
        address: "456 Oak Avenue, Midtown",
        phone: "(555) 987-6543",
        totalDonations: 23,
        rating: 4.6,
      },
      name: "Fresh Pasta & Sauce",
      type: "Hot Meals",
      quantity: "15 servings",
      peopleFed: 15,
      numberOfMeals: 15,
      description:
        "Homemade fettuccine with marinara sauce. Made with organic ingredients and ready to heat.",
      expirationTime: "2024-01-15 22:00",
      pickupWindow: "Today 18:00 - 21:00",
      location: "Bella Vista Bistro, 456 Oak Avenue, Kitchen Exit",
      contactPerson: "Chef Antonio",
      contactPhone: "(555) 987-6543",
      specialInstructions: "Please bring refrigerated containers.",
      images: [
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&q=80",
      ],
      distance: "1.2 miles",
      postedAt: "2024-01-15 15:45",
      urgency: "medium",
    },
    {
      id: "6",
      restaurant: {
        id: "3",
        name: "Green Leaf Cafe",
        address: "789 Pine Street, Uptown",
        phone: "(555) 456-7890",
        totalDonations: 67,
        rating: 4.9,
      },
      name: "Assorted Baked Goods",
      type: "Fresh Bread & Baked Goods",
      quantity: "30 pastries & muffins",
      peopleFed: 30,
      numberOfMeals: 30,
      description:
        "Croissants, muffins, and Danish pastries. All made fresh this morning with organic flour.",
      expirationTime: "2024-01-16 08:00",
      pickupWindow: "Tomorrow 07:00 - 08:00",
      location: "Green Leaf Cafe, 789 Pine Street, Back Door",
      contactPerson: "Sarah",
      contactPhone: "(555) 456-7890",
      images: [
        "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop&q=80",
        "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop&q=80",
      ],
      distance: "2.1 miles",
      postedAt: "2024-01-15 16:20",
      urgency: "low",
    },
  ]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <AlertTriangle className="w-3 h-3" />;
      case "medium":
        return <Clock className="w-3 h-3" />;
      case "low":
        return <CheckCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const handleAcceptDonation = async (donationId: string) => {
    setAcceptingDonation(donationId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Accepted donation:", donationId);
    setAcceptingDonation(null);
    // In real app, would update the donation status and show success message
  };

  const filteredDonations = availableDonations.filter((donation) => {
    const matchesSearch =
      donation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.restaurant.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      donation.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      donation.type.toLowerCase().includes(filterType.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  const DonationDetailsDialog = ({
    donation,
  }: {
    donation: AvailableDonation;
  }) => (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl">{donation.name}</DialogTitle>
        <DialogDescription className="flex items-center gap-2">
          <span>From {donation.restaurant.name}</span>
          <span>•</span>
          <span>{donation.distance} away</span>
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

        {/* Urgency */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Urgency:</span>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(
              donation.urgency,
            )}`}
          >
            <div className="flex items-center gap-1">
              {getUrgencyIcon(donation.urgency)}
              {donation.urgency.charAt(0).toUpperCase() +
                donation.urgency.slice(1)}
            </div>
          </div>
        </div>

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

        {/* Restaurant Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Restaurant Info</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-blue-600" />
              <span className="text-sm">
                <strong>{donation.restaurant.name}</strong> •{" "}
                {donation.restaurant.totalDonations} total donations
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm">{donation.restaurant.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span className="text-sm">{donation.restaurant.phone}</span>
            </div>
          </div>
        </div>

        {/* Timing */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">Pickup Details</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>Available:</strong> {donation.pickupWindow}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>Expires:</strong>{" "}
                {new Date(donation.expirationTime).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>Location:</strong> {donation.location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>Distance:</strong> {donation.distance}
              </span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">Contact</h4>
          <div className="space-y-2">
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
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <h4 className="font-semibold text-amber-900 mb-2">
              Special Instructions
            </h4>
            <p className="text-amber-800 text-sm">
              {donation.specialInstructions}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-brand-green hover:bg-brand-green/90"
            onClick={() => handleAcceptDonation(donation.id)}
            disabled={acceptingDonation === donation.id}
          >
            {acceptingDonation === donation.id ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Accepting...
              </div>
            ) : (
              <>
                <HandHeart className="w-4 h-4 mr-2" />
                Accept Donation
              </>
            )}
          </Button>
          <Button variant="outline">
            <Phone className="w-4 h-4 mr-2" />
            Call Restaurant
          </Button>
        </div>
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
              <div className="flex items-center justify-center w-8 h-8 bg-brand-green rounded-lg">
                <Utensils className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ResQBites</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.organizationName || "Charity"}
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
            Available Food Donations
          </h1>
          <p className="text-gray-600">
            Find and reserve food donations from local restaurants
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Available Now
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {availableDonations.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    People Can Feed
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {availableDonations.reduce(
                      (sum, d) => sum + d.peopleFed,
                      0,
                    )}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Urgent Pickups
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      availableDonations.filter((d) => d.urgency === "high")
                        .length
                    }
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Partner Restaurants
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      new Set(availableDonations.map((d) => d.restaurant.id))
                        .size
                    }
                  </p>
                </div>
                <div className="p-3 bg-brand-orange/20 rounded-full">
                  <Utensils className="w-6 h-6 text-brand-orange" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <div className="flex gap-3">
            <Link to="/manage-claimed">
              <Button
                variant="outline"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
              >
                <Package className="w-4 h-4 mr-2" />
                Manage Claimed Food
              </Button>
            </Link>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search donations or restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hot meals">Hot Meals</SelectItem>
                <SelectItem value="bread">Bread & Baked Goods</SelectItem>
                <SelectItem value="produce">Fresh Produce</SelectItem>
                <SelectItem value="sandwiches">Prepared Sandwiches</SelectItem>
                <SelectItem value="soup">Soup & Stews</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Donations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDonations.map((donation) => (
            <Card
              key={donation.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    {donation.images.length > 0 ? (
                      <div className="relative">
                        <img
                          src={donation.images[0]}
                          alt={donation.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {donation.images.length > 1 && (
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded text-[10px]">
                            +{donation.images.length - 1}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                        <Camera className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {donation.name}
                      </h3>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium border ml-2 ${getUrgencyColor(
                          donation.urgency,
                        )}`}
                      >
                        <div className="flex items-center gap-1">
                          {getUrgencyIcon(donation.urgency)}
                          {donation.urgency}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      from <strong>{donation.restaurant.name}</strong>
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        <span>{donation.quantity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>Feeds {donation.peopleFed}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{donation.pickupWindow}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        <span>{donation.distance}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {donation.description}
                    </p>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedDonation(donation)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Details
                          </Button>
                        </DialogTrigger>
                        {selectedDonation && (
                          <DonationDetailsDialog donation={selectedDonation} />
                        )}
                      </Dialog>
                      <Button
                        size="sm"
                        className="bg-brand-green hover:bg-brand-green/90"
                        onClick={() => handleAcceptDonation(donation.id)}
                        disabled={acceptingDonation === donation.id}
                      >
                        {acceptingDonation === donation.id ? (
                          <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                        ) : (
                          <HandHeart className="w-3 h-3 mr-1" />
                        )}
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDonations.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Heart className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No donations available
                  </h3>
                  <p className="text-gray-600">
                    {searchQuery || filterType !== "all"
                      ? "Try adjusting your search or filters"
                      : "Check back later for new food donations from local restaurants"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
