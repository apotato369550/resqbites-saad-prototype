import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LogOut,
  User,
  ArrowLeft,
  Camera,
  Upload,
  X,
  Clock,
  Users,
  Package,
  MapPin,
  Calendar,
} from "lucide-react";

interface FoodDonationForm {
  foodName: string;
  foodType: string;
  description: string;
  quantity: string;
  peopleFed: string;
  numberOfMeals: string;
  expirationDate: string;
  expirationTime: string;
  pickupStartTime: string;
  pickupEndTime: string;
  specialInstructions: string;
  location: string;
  contactPerson: string;
  contactPhone: string;
  images: File[];
}

export default function PostDonation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [formData, setFormData] = useState<FoodDonationForm>({
    foodName: "",
    foodType: "",
    description: "",
    quantity: "",
    peopleFed: "",
    numberOfMeals: "",
    expirationDate: "",
    expirationTime: "",
    pickupStartTime: "",
    pickupEndTime: "",
    specialInstructions: "",
    location: "",
    contactPerson: "",
    contactPhone: "",
    images: [],
  });

  const foodTypes = [
    "Hot Meals",
    "Fresh Bread & Baked Goods",
    "Fresh Produce",
    "Prepared Sandwiches",
    "Soup & Stews",
    "Dairy Products",
    "Canned Goods",
    "Packaged Foods",
    "Beverages",
    "Desserts",
    "Other",
  ];

  const handleInputChange = (field: keyof FoodDonationForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);

    // Update form data
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index: number) => {
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewImages[index]);

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In real app, would upload images and save donation
    console.log("Donation posted:", formData);

    setIsSubmitting(false);
    navigate("/restaurant");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/restaurant"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff3e86ddc232c48b08028cac70a1690ce%2F2d8650f58195441d972e3a5eabd229f1?format=webp&width=800"
                    alt="ResQBites Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  ResQBites
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post New Food Donation
          </h1>
          <p className="text-gray-600">
            Share your surplus food with local charities in need
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-brand-green" />
                Food Information
              </CardTitle>
              <CardDescription>
                Tell us about the food you're donating
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Food Name *
                  </label>
                  <Input
                    placeholder="e.g., Fresh Bread Loaves, Vegetable Soup"
                    value={formData.foodName}
                    onChange={(e) =>
                      handleInputChange("foodName", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Food Type *
                  </label>
                  <Select
                    value={formData.foodType}
                    onValueChange={(value) =>
                      handleInputChange("foodType", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                    <SelectContent>
                      {foodTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  placeholder="Describe the food, ingredients, preparation method, etc."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Quantity *
                  </label>
                  <Input
                    placeholder="e.g., 25 loaves, 8 gallons"
                    value={formData.quantity}
                    onChange={(e) =>
                      handleInputChange("quantity", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    People Fed *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 50"
                    value={formData.peopleFed}
                    onChange={(e) =>
                      handleInputChange("peopleFed", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Number of Meals *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 100"
                    value={formData.numberOfMeals}
                    onChange={(e) =>
                      handleInputChange("numberOfMeals", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timing & Pickup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-orange" />
                Timing & Pickup
              </CardTitle>
              <CardDescription>
                When and where can charities pick up this donation?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Expiration Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.expirationDate}
                    onChange={(e) =>
                      handleInputChange("expirationDate", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Expiration Time *
                  </label>
                  <Input
                    type="time"
                    value={formData.expirationTime}
                    onChange={(e) =>
                      handleInputChange("expirationTime", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Pickup Start Time *
                  </label>
                  <Input
                    type="time"
                    value={formData.pickupStartTime}
                    onChange={(e) =>
                      handleInputChange("pickupStartTime", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Pickup End Time *
                  </label>
                  <Input
                    type="time"
                    value={formData.pickupEndTime}
                    onChange={(e) =>
                      handleInputChange("pickupEndTime", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Special Instructions
                </label>
                <Textarea
                  placeholder="Any special handling, storage, or pickup instructions..."
                  value={formData.specialInstructions}
                  onChange={(e) =>
                    handleInputChange("specialInstructions", e.target.value)
                  }
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact & Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-blue" />
                Contact & Location
              </CardTitle>
              <CardDescription>
                How can charities reach you and where to pick up?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Pickup Location *
                </label>
                <Input
                  placeholder="e.g., Downtown Kitchen, 123 Main St, Loading Dock"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Contact Person *
                  </label>
                  <Input
                    placeholder="Name of person to contact"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      handleInputChange("contactPerson", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Contact Phone *
                  </label>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      handleInputChange("contactPhone", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-600" />
                Food Photos
              </CardTitle>
              <CardDescription>
                Upload photos to help charities see what you're donating (max 5
                photos)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 10MB each
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={formData.images.length >= 5}
                    />
                  </label>
                </div>

                {previewImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/restaurant")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-brand-green hover:bg-brand-green/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Posting Donation...
                </div>
              ) : (
                "Post Donation"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
