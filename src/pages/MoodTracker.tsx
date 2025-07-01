
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const moods = [
    { value: 1, emoji: "😢", label: "Very Low", color: "bg-red-100 border-red-300 text-red-800" },
    { value: 2, emoji: "😟", label: "Low", color: "bg-orange-100 border-orange-300 text-orange-800" },
    { value: 3, emoji: "😐", label: "Neutral", color: "bg-yellow-100 border-yellow-300 text-yellow-800" },
    { value: 4, emoji: "😊", label: "Good", color: "bg-green-100 border-green-300 text-green-800" },
    { value: 5, emoji: "😄", label: "Great", color: "bg-blue-100 border-blue-300 text-blue-800" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedMood === null) {
      toast({
        title: "Please Select Your Mood",
        description: "Choose how you're feeling before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Mood submission:", {
        mood: selectedMood,
        note,
        timestamp: new Date().toISOString(),
        userId: localStorage.getItem("userEmail")
      });

      toast({
        title: "Mood Recorded Successfully",
        description: "Thank you for checking in. Your mood has been logged.",
      });

      // Reset form
      setSelectedMood(null);
      setNote("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link to="/dashboard" className="mr-4">
            <Button variant="outline" size="sm" className="bg-white/50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-blue-900">Mood Tracker</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 text-center">How Are You Feeling Today?</CardTitle>
            <CardDescription className="text-center text-blue-700">
              Take a moment to check in with yourself. Your feelings are valid and important.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mood Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-900">Select Your Current Mood</h3>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setSelectedMood(mood.value)}
                      className={`
                        p-4 rounded-lg border-2 transition-all hover:scale-105 text-center
                        ${selectedMood === mood.value 
                          ? mood.color + " ring-2 ring-blue-500" 
                          : "bg-white border-gray-200 hover:bg-gray-50"
                        }
                      `}
                    >
                      <div className="text-3xl mb-2">{mood.emoji}</div>
                      <div className="text-sm font-medium">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Note */}
              <div className="space-y-2">
                <label htmlFor="note" className="text-lg font-semibold text-blue-900">
                  What's on your mind? (Optional)
                </label>
                <Textarea
                  id="note"
                  placeholder="Share anything you'd like about how you're feeling today. This can help you and your support team understand your emotional patterns."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="bg-white/70 border-blue-200 focus:border-green-500 min-h-[120px]"
                  maxLength={500}
                />
                <p className="text-sm text-blue-600">{note.length}/500 characters</p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Recording Your Mood..." : "Record My Mood"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-6 bg-blue-50/80 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 Mood Tracking Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-blue-700">
            <p>• Try to track your mood at the same time each day</p>
            <p>• Be honest with yourself - there are no wrong answers</p>
            <p>• Notice patterns over time - this helps identify triggers and positive influences</p>
            <p>• Remember that mood fluctuations are normal and part of being human</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodTracker;
