import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Star,
  Phone,
  Calendar,
  Camera,
  Bell,
  Truck,
  MessageSquare,
  Edit,
} from "lucide-react";

interface ClaimedDonation {
  id: string;
  donationName: string;
  restaurantName: string;
  restaurantPhone: string;
  quantity: string;
  peopleFed: number;
  numberOfMeals: number;
  pickupWindow: string;
  location: string;
  contactPerson: string;
  images: string[];
  status: "reserved" | "picked_up" | "completed";
  claimedAt: string;
  pickedUpAt?: string;
  completedAt?: string;
  actualPeopleFed?: number;
  actualMealsServed?: number;
  notes?: string;
  rating?: number;
  feedback?: string;
}

export default function ManageClaimedFood() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedDonation, setSelectedDonation] =
    useState<ClaimedDonation | null>(null);
  const [isCompletingDonation, setIsCompletingDonation] = useState(false);
  const [completionData, setCompletionData] = useState({
    actualPeopleFed: "",
    actualMealsServed: "",
    notes: "",
    rating: 5,
    feedback: "",
  });

  const [claimedDonations] = useState<ClaimedDonation[]>([
    {
      id: "1",
      donationName: "Fresh Bread Loaves",
      restaurantName: "Downtown Kitchen",
      restaurantPhone: "(555) 123-4567",
      quantity: "25 loaves",
      peopleFed: 50,
      numberOfMeals: 50,
      pickupWindow: "Today 14:00 - 17:00",
      location: "Downtown Kitchen, 123 Main St, Loading Dock",
      contactPerson: "Chef Maria",
      images: [
        "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop&q=80",
        "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop&q=80",
      ],
      status: "picked_up",
      claimedAt: "2024-01-15 11:00",
      pickedUpAt: "2024-01-15 15:30",
    },
    {
      id: "2",
      donationName: "Prepared Sandwiches",
      restaurantName: "Downtown Kitchen",
      restaurantPhone: "(555) 123-4567",
      quantity: "40 sandwiches",
      peopleFed: 40,
      numberOfMeals: 40,
      pickupWindow: "Today 16:00 - 19:00",
      location: "Downtown Kitchen, 123 Main St, Loading Dock",
      contactPerson: "Chef Maria",
      images: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&q=80",
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&q=80",
      ],
      status: "reserved",
      claimedAt: "2024-01-15 12:30",
    },
    {
      id: "3",
      donationName: "Vegetable Soup",
      restaurantName: "Downtown Kitchen",
      restaurantPhone: "(555) 123-4567",
      quantity: "8 gallons",
      peopleFed: 64,
      numberOfMeals: 64,
      pickupWindow: "Yesterday 15:00 - 18:00",
      location: "Downtown Kitchen, 123 Main St, Loading Dock",
      contactPerson: "Chef Maria",
      images: [
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop&q=80",
      ],
      status: "completed",
      claimedAt: "2024-01-14 13:00",
      pickedUpAt: "2024-01-14 16:30",
      completedAt: "2024-01-14 19:45",
      actualPeopleFed: 68,
      actualMealsServed: 68,
      notes: "Soup was very well received. Served at evening meal program.",
      rating: 5,
      feedback: "Amazing soup! Our community loved it. Thank you so much!",
    },
    {
      id: "4",
      donationName: "Fresh Pasta & Sauce",
      restaurantName: "Bella Vista Bistro",
      restaurantPhone: "(555) 987-6543",
      quantity: "15 servings",
      peopleFed: 15,
      numberOfMeals: 15,
      pickupWindow: "Today 18:00 - 21:00",
      location: "Bella Vista Bistro, 456 Oak Avenue, Kitchen Exit",
      contactPerson: "Chef Antonio",
      images: [
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&q=80",
      ],
      status: "reserved",
      claimedAt: "2024-01-15 16:15",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reserved":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "picked_up":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "reserved":
        return <Clock className="w-4 h-4" />;
      case "picked_up":
        return <Truck className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleMarkPickedUp = async (donationId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Marked as picked up:", donationId);
    // In real app, would update the donation status
  };

  const handleCompleteDistribution = async (donationId: string) => {
    setIsCompletingDonation(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Completed distribution:", {
      donationId,
      ...completionData,
    });
    setIsCompletingDonation(false);
    setSelectedDonation(null);
    // Reset form
    setCompletionData({
      actualPeopleFed: "",
      actualMealsServed: "",
      notes: "",
      rating: 5,
      feedback: "",
    });
    // In real app, would update the donation status and show success message
  };

  const reservedCount = claimedDonations.filter(
    (d) => d.status === "reserved",
  ).length;
  const pickedUpCount = claimedDonations.filter(
    (d) => d.status === "picked_up",
  ).length;
  const completedCount = claimedDonations.filter(
    (d) => d.status === "completed",
  ).length;
  const totalPeopleImpacted = claimedDonations
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + (d.actualPeopleFed || d.peopleFed), 0);

  const CompletionDialog = ({ donation }: { donation: ClaimedDonation }) => (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Complete Distribution</DialogTitle>
        <DialogDescription>
          Record the actual impact of {donation.donationName}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">People Actually Fed</label>
            <Input
              type="number"
              placeholder={donation.peopleFed.toString()}
              value={completionData.actualPeopleFed}
              onChange={(e) =>
                setCompletionData((prev) => ({
                  ...prev,
                  actualPeopleFed: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Meals Served</label>
            <Input
              type="number"
              placeholder={donation.numberOfMeals.toString()}
              value={completionData.actualMealsServed}
              onChange={(e) =>
                setCompletionData((prev) => ({
                  ...prev,
                  actualMealsServed: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Distribution Notes</label>
          <Textarea
            placeholder="How was the food distributed? Any special notes..."
            value={completionData.notes}
            onChange={(e) =>
              setCompletionData((prev) => ({ ...prev, notes: e.target.value }))
            }
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Rate this donation</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() =>
                  setCompletionData((prev) => ({ ...prev, rating }))
                }
                className="p-1"
              >
                <Star
                  className={`w-6 h-6 ${
                    rating <= completionData.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Feedback for Restaurant (Optional)
          </label>
          <Textarea
            placeholder="Share your experience with the restaurant..."
            value={completionData.feedback}
            onChange={(e) =>
              setCompletionData((prev) => ({
                ...prev,
                feedback: e.target.value,
              }))
            }
            rows={2}
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setSelectedDonation(null)}>
            Cancel
          </Button>
          <Button
            className="flex-1 bg-brand-green hover:bg-brand-green/90"
            onClick={() => handleCompleteDistribution(donation.id)}
            disabled={isCompletingDonation}
          >
            {isCompletingDonation ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Completing...
              </div>
            ) : (
              "Complete Distribution"
            )}
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
            <div className="flex items-center gap-4">
              <Link
                to="/charity"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Available Donations</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-brand-green rounded-lg">
                  <Utensils className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  ResQBites
                </span>
              </div>
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
            Manage Claimed Food
          </h1>
          <p className="text-gray-600">
            Track your reserved donations and record distribution impact
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Picked Up</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pickedUpCount}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Truck className="w-6 h-6 text-blue-600" />
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
                    People Impacted
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

        {/* Donations List */}
        <div className="space-y-4">
          {claimedDonations.map((donation) => (
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
                          alt={donation.donationName}
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
                        {donation.donationName}
                      </h3>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          donation.status,
                        )}`}
                      >
                        <div className="flex items-center gap-1">
                          {getStatusIcon(donation.status)}
                          {donation.status === "picked_up"
                            ? "Picked Up"
                            : donation.status.charAt(0).toUpperCase() +
                              donation.status.slice(1)}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      from <strong>{donation.restaurantName}</strong> •{" "}
                      <span>
                        Claimed on{" "}
                        {new Date(donation.claimedAt).toLocaleString()}
                      </span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span>{donation.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Feeds {donation.peopleFed}</span>
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

                    {/* Status-specific info */}
                    {donation.pickedUpAt && (
                      <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Picked up:</strong>{" "}
                          {new Date(donation.pickedUpAt).toLocaleString()}
                        </p>
                      </div>
                    )}

                    {donation.status === "completed" && (
                      <div className="mb-3 space-y-2">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800 mb-2">
                            <strong>Distribution completed:</strong>{" "}
                            {new Date(donation.completedAt!).toLocaleString()}
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-green-700">
                                People Fed:
                              </span>{" "}
                              <strong>{donation.actualPeopleFed}</strong>
                            </div>
                            <div>
                              <span className="text-green-700">
                                Meals Served:
                              </span>{" "}
                              <strong>{donation.actualMealsServed}</strong>
                            </div>
                          </div>
                          {donation.notes && (
                            <p className="text-sm text-green-700 mt-2">
                              <strong>Notes:</strong> {donation.notes}
                            </p>
                          )}
                        </div>
                        {donation.rating && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Rating:</span>
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
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 lg:flex-col">
                    {donation.status === "reserved" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkPickedUp(donation.id)}
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Mark Picked Up
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Restaurant
                        </Button>
                      </>
                    )}
                    {donation.status === "picked_up" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-brand-green hover:bg-brand-green/90"
                            onClick={() => setSelectedDonation(donation)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Complete Distribution
                          </Button>
                        </DialogTrigger>
                        {selectedDonation && (
                          <CompletionDialog donation={selectedDonation} />
                        )}
                      </Dialog>
                    )}
                    {donation.status === "completed" && (
                      <Button size="sm" variant="outline" disabled>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {claimedDonations.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No claimed donations yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Reserve some food donations from restaurants to get started.
                  </p>
                  <Link to="/charity">
                    <Button className="bg-brand-green hover:bg-brand-green/90">
                      Browse Available Donations
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
