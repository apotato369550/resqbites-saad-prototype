import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Utensils,
  LogOut,
  User,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Upload,
  X,
  FileText,
  Building,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Bell,
  RefreshCw,
} from "lucide-react";

interface VerificationApplication {
  organizationName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  contactPersonName: string;
  contactPersonTitle: string;
  organizationType: string;
  taxId: string;
  websiteUrl: string;
  description: string;
  servicesProvided: string;
  targetPopulation: string;
  operatingHours: string;
  documents: File[];
}

export default function PendingCharityDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewDocuments, setPreviewDocuments] = useState<string[]>([]);

  // Mock verification status - in real app, this would come from API
  const [verificationStatus] = useState({
    status: "pending" as "pending" | "under_review" | "approved" | "rejected",
    submittedDate: "2024-01-10T10:30:00Z",
    lastUpdated: "2024-01-12T14:15:00Z",
    reviewerNotes: "",
    documentsRequired: [
      "SEC Certificate of Registration (Non-stock, Non-profit)",
      "DSWD Certificate of Accreditation",
      "BIR Certificate of Registration",
      "Barangay Clearance or Business Permit",
      "Articles of Incorporation",
      "Board Resolution authorizing food donation activities",
    ],
    documentsSubmitted: ["sec_certificate.pdf", "dswd_accreditation.pdf"],
  });

  const [applicationData, setApplicationData] =
    useState<VerificationApplication>({
      organizationName: user?.organizationName || "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: user?.email || "",
      contactPersonName: "",
      contactPersonTitle: "",
      organizationType: "",
      taxId: "",
      websiteUrl: "",
      description: "",
      servicesProvided: "",
      targetPopulation: "",
      operatingHours: "",
      documents: [],
    });

  const handleInputChange = (
    field: keyof VerificationApplication,
    value: string,
  ) => {
    setApplicationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + applicationData.documents.length > 10) {
      alert("Maximum 10 documents allowed");
      return;
    }

    // Create preview URLs for PDFs (mock)
    const newPreviews = files.map((file) => file.name);
    setPreviewDocuments((prev) => [...prev, ...newPreviews]);

    // Update form data
    setApplicationData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...files],
    }));
  };

  const removeDocument = (index: number) => {
    setPreviewDocuments((prev) => prev.filter((_, i) => i !== index));
    setApplicationData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("Verification application submitted:", applicationData);
    setIsSubmitting(false);
    setShowApplicationForm(false);
    // In real app, would show success message and update status
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "under_review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "under_review":
        return <RefreshCw className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "pending":
        return "Your verification application is pending review. Our team will review your documents and get back to you within 3-5 business days.";
      case "under_review":
        return "Your application is currently being reviewed by our verification team. We may contact you if additional information is needed.";
      case "approved":
        return "Congratulations! Your organization has been verified. You can now accept food donations from restaurants.";
      case "rejected":
        return "Your verification application has been rejected. Please review the feedback below and resubmit with the required corrections.";
      default:
        return "";
    }
  };

  const ApplicationForm = () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Charity Verification Application</DialogTitle>
        <DialogDescription>
          Please provide complete information about your organization to
          expedite the verification process.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmitApplication} className="space-y-6">
        {/* Organization Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Organization Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Organization Name *
                </label>
                <Input
                  value={applicationData.organizationName}
                  onChange={(e) =>
                    handleInputChange("organizationName", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Organization Type *
                </label>
                <Input
                  placeholder="e.g., Non-stock Non-profit Corporation, Foundation, NGO, Religious Organization"
                  value={applicationData.organizationType}
                  onChange={(e) =>
                    handleInputChange("organizationType", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Address *</label>
              <Input
                placeholder="Street address"
                value={applicationData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">City *</label>
                <Input
                  value={applicationData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">State *</label>
                <Input
                  value={applicationData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ZIP Code *</label>
                <Input
                  value={applicationData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  TIN (Tax Identification Number) *
                </label>
                <Input
                  placeholder="XXX-XXX-XXX-XXX"
                  value={applicationData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Website URL</label>
                <Input
                  placeholder="https://yourorganization.org"
                  value={applicationData.websiteUrl}
                  onChange={(e) =>
                    handleInputChange("websiteUrl", e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Primary Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Contact Person Name *
                </label>
                <Input
                  value={applicationData.contactPersonName}
                  onChange={(e) =>
                    handleInputChange("contactPersonName", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title/Position *</label>
                <Input
                  placeholder="e.g., Executive Director, Program Manager"
                  value={applicationData.contactPersonTitle}
                  onChange={(e) =>
                    handleInputChange("contactPersonTitle", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number *</label>
                <Input
                  type="tel"
                  value={applicationData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address *</label>
                <Input
                  type="email"
                  value={applicationData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Organization Details */}
        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Organization Description *
              </label>
              <Textarea
                placeholder="Describe your organization's mission and activities..."
                value={applicationData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Services Provided *</label>
              <Textarea
                placeholder="Describe the services your organization provides to the community..."
                value={applicationData.servicesProvided}
                onChange={(e) =>
                  handleInputChange("servicesProvided", e.target.value)
                }
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Target Population *</label>
              <Textarea
                placeholder="Who does your organization serve? (e.g., homeless individuals, low-income families, seniors)"
                value={applicationData.targetPopulation}
                onChange={(e) =>
                  handleInputChange("targetPopulation", e.target.value)
                }
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Operating Hours</label>
              <Input
                placeholder="e.g., Mon-Fri 9AM-5PM, Sat 10AM-2PM"
                value={applicationData.operatingHours}
                onChange={(e) =>
                  handleInputChange("operatingHours", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Required Documents
            </CardTitle>
            <CardDescription>
              Please upload the following documents to verify your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                Required Documents:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • SEC Certificate of Registration (Non-stock, Non-profit
                  corporation)
                </li>
                <li>
                  • DSWD Certificate of Accreditation as a Social Welfare Agency
                </li>
                <li>• BIR Certificate of Registration and TIN</li>
                <li>• Barangay Clearance or Mayor's Business Permit</li>
                <li>• Articles of Incorporation and By-laws</li>
                <li>• Board Resolution authorizing food donation activities</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF files up to 10MB each (max 10 files)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleDocumentUpload}
                    disabled={applicationData.documents.length >= 10}
                  />
                </label>
              </div>

              {previewDocuments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Uploaded Documents:</h4>
                  <div className="space-y-2">
                    {previewDocuments.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{doc}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
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
            onClick={() => setShowApplicationForm(false)}
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
                Submitting Application...
              </div>
            ) : (
              "Submit for Verification"
            )}
          </Button>
        </div>
      </form>
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
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-amber-100 rounded-full">
              <Shield className="w-12 h-12 text-amber-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verification Status
          </h1>
          <p className="text-gray-600">
            Track your organization's verification progress
          </p>
        </div>

        {/* Status Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Verification Status
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    verificationStatus.status,
                  )}`}
                >
                  <div className="flex items-center gap-1">
                    {getStatusIcon(verificationStatus.status)}
                    {verificationStatus.status === "under_review"
                      ? "Under Review"
                      : verificationStatus.status.charAt(0).toUpperCase() +
                        verificationStatus.status.slice(1)}
                  </div>
                </div>
              </CardTitle>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Status
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                {getStatusMessage(verificationStatus.status)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Application Timeline
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>
                      <strong>Submitted:</strong>{" "}
                      {new Date(
                        verificationStatus.submittedDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>
                      <strong>Last Updated:</strong>{" "}
                      {new Date(
                        verificationStatus.lastUpdated,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Documents Status
                </h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <strong>Submitted:</strong>{" "}
                    {verificationStatus.documentsSubmitted.length} of{" "}
                    {verificationStatus.documentsRequired.length} required
                    documents
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-brand-green h-2 rounded-full"
                      style={{
                        width: `${
                          (verificationStatus.documentsSubmitted.length /
                            verificationStatus.documentsRequired.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Checklist */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Required Documents
              </h4>
              <div className="space-y-2">
                {verificationStatus.documentsRequired.map((doc, index) => {
                  const isSubmitted =
                    verificationStatus.documentsSubmitted.some((submitted) =>
                      submitted
                        .toLowerCase()
                        .includes(doc.toLowerCase().split(" ")[0]),
                    );
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                    >
                      {isSubmitted ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-600" />
                      )}
                      <span
                        className={`text-sm ${isSubmitted ? "text-green-800" : "text-gray-700"}`}
                      >
                        {doc}
                      </span>
                      {isSubmitted && (
                        <span className="text-xs text-green-600 ml-auto">
                          Submitted
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              {verificationStatus.status === "pending" && (
                <Dialog
                  open={showApplicationForm}
                  onOpenChange={setShowApplicationForm}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-brand-green hover:bg-brand-green/90">
                      <FileText className="w-4 h-4 mr-2" />
                      Complete Application
                    </Button>
                  </DialogTrigger>
                  <ApplicationForm />
                </Dialog>
              )}

              {verificationStatus.status === "rejected" && (
                <Dialog
                  open={showApplicationForm}
                  onOpenChange={setShowApplicationForm}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-brand-green hover:bg-brand-green/90">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resubmit Application
                    </Button>
                  </DialogTrigger>
                  <ApplicationForm />
                </Dialog>
              )}

              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Verification Process
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • Submit complete application with required Philippine
                    documents
                  </li>
                  <li>
                    • Our team reviews your submission (3-5 business days)
                  </li>
                  <li>• We verify documents with SEC and DSWD if needed</li>
                  <li>• Once approved, you can start accepting donations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Common Issues
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Ensure all documents are clear and readable</li>
                  <li>• SEC registration must be current and valid</li>
                  <li>• DSWD accreditation should not be expired</li>
                  <li>• Contact information must match SEC records</li>
                  <li>
                    • Barangay clearance should be recent (within 6 months)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
