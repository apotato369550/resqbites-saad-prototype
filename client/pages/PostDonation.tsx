import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Plus, Construction } from "lucide-react";

export default function PostDonation() {
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
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-brand-orange-light rounded-full">
                <Construction className="w-8 h-8 text-brand-orange" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">
                  Post Donation Form Coming Soon
                </CardTitle>
                <p className="text-gray-600 mb-4">
                  Create detailed food donation posts with pickup information
                  and availability.
                </p>
                <Button
                  className="bg-brand-orange hover:bg-brand-orange/90"
                  style={{ backgroundColor: "hsl(var(--brand-orange))" }}
                >
                  <Plus className="w-4 h-4 mr-2" />
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
