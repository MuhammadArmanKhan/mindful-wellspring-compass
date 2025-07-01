
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, ArrowLeft, Phone, MessageSquare, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Emergency = () => {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const { toast } = useToast();

  const handleEmergencyAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate emergency alert API call
    setTimeout(() => {
      console.log("Emergency alert triggered:", {
        reason,
        timestamp: new Date().toISOString(),
        userId: localStorage.getItem("userEmail"),
        location: "Unknown" // In real app, would request location permission
      });

      setAlertSent(true);
      setIsSubmitting(false);

      toast({
        title: "Emergency Alert Sent",
        description: "Your support team has been notified and will reach out soon. You're not alone.",
      });
    }, 2000);
  };

  if (alertSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm border-red-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-20 h-20 flex items-center justify-center">
              <Heart className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Help is On the Way</CardTitle>
            <CardDescription className="text-green-700">
              Your emergency alert has been sent successfully. A support team member will contact you shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-4">What happens next:</h3>
              <ul className="space-y-2 text-green-800">
                <li>• A qualified support staff member will call or message you within 15 minutes</li>
                <li>• If needed, emergency services may be contacted</li>
                <li>• Your safety plan will be reviewed and updated if necessary</li>
                <li>• Follow-up support will be scheduled</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-4">While you wait:</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Stay in a safe location</li>
                <li>• Keep your phone nearby</li>
                <li>• Try some deep breathing exercises</li>
                <li>• Remember: This feeling will pass, and help is coming</li>
              </ul>
            </div>

            <div className="flex flex-col space-y-4">
              <Link to="/dashboard">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Return to Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => setAlertSent(false)}
                className="w-full"
              >
                Send Another Alert
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-red-200">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link to="/dashboard" className="mr-4">
            <Button variant="outline" size="sm" className="bg-white/50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-red-900">Emergency Support</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Immediate Crisis Resources */}
        <Card className="mb-6 bg-red-100/80 backdrop-blur-sm border-red-300">
          <CardHeader>
            <CardTitle className="text-red-900 text-center">Need Help Right Now?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="tel:988" className="block">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6">
                  <Phone className="h-5 w-5 mr-2" />
                  Call 988
                  <span className="block text-sm">Suicide & Crisis Lifeline</span>
                </Button>
              </a>
              <a href="sms:741741" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Text HOME to 741741
                  <span className="block text-sm">Crisis Text Line</span>
                </Button>
              </a>
            </div>
            <p className="text-center text-red-800 mt-4 text-sm">
              If you're in immediate danger, call 911 or go to your nearest emergency room.
            </p>
          </CardContent>
        </Card>

        {/* Support Team Alert */}
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-900">Alert Your Support Team</CardTitle>
            <CardDescription className="text-orange-800">
              Send an immediate notification to your assigned support staff. They will reach out to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmergencyAlert} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="reason" className="text-lg font-semibold text-orange-900">
                  What's happening? (Optional but helpful)
                </label>
                <Textarea
                  id="reason"
                  placeholder="You can share what's going on if you feel comfortable. This helps your support team provide the best help for your situation."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="bg-white/70 border-orange-200 focus:border-red-500 min-h-[120px]"
                  maxLength={300}
                />
                <p className="text-sm text-orange-700">{reason.length}/300 characters</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">When you send this alert:</h4>
                <ul className="text-orange-800 space-y-1">
                  <li>• Your support team will be immediately notified</li>
                  <li>• Someone will contact you within 15 minutes</li>
                  <li>• Your safety and wellbeing are the top priority</li>
                  <li>• You're taking a brave step by asking for help</li>
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xl py-8"
                disabled={isSubmitting}
              >
                <AlertTriangle className="h-6 w-6 mr-3" />
                {isSubmitting ? "Sending Alert..." : "Send Emergency Alert"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Coping Strategies */}
        <Card className="mt-6 bg-blue-50/80 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">While You Wait</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-blue-800">
              <div>
                <h4 className="font-semibold mb-2">Grounding Technique (5-4-3-2-1):</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Name 5 things you can see</li>
                  <li>• Name 4 things you can touch</li>
                  <li>• Name 3 things you can hear</li>
                  <li>• Name 2 things you can smell</li>
                  <li>• Name 1 thing you can taste</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Box Breathing:</h4>
                <p className="text-sm">Breathe in for 4, hold for 4, breathe out for 4, hold for 4. Repeat.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Remember:</h4>
                <p className="text-sm">These feelings are temporary. You've gotten through difficult times before, and you can get through this too. Help is on the way.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;
