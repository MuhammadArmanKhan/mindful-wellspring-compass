
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart3, ArrowLeft, Heart, TrendingUp, MessageSquare, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const WeeklySummary = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [satisfactionScore, setSatisfactionScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Mock data - in real app would come from API
  const weeklyData = {
    moodAverage: 3.4,
    moodTrend: "up",
    exercisesCompleted: 5,
    exercisesTarget: 7,
    journalEntries: 3,
    adminFeedback: "Great progress this week! Your consistent mood tracking shows you're becoming more aware of your emotional patterns. Keep up the excellent work with the breathing exercises - they seem to be helping you manage stress better."
  };

  const moodData = [
    { day: "Mon", mood: 3, emoji: "😐" },
    { day: "Tue", mood: 4, emoji: "😊" },
    { day: "Wed", mood: 2, emoji: "😟" },
    { day: "Thu", mood: 4, emoji: "😊" },
    { day: "Fri", mood: 5, emoji: "😄" },
    { day: "Sat", mood: 3, emoji: "😐" },
    { day: "Sun", mood: 4, emoji: "😊" }
  ];

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (satisfactionScore === null) {
      toast({
        title: "Please Rate Your Experience",
        description: "Your satisfaction rating helps us improve our support.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Weekly feedback submitted:", {
        feedbackText,
        satisfactionScore,
        timestamp: new Date().toISOString(),
        userId: localStorage.getItem("userEmail")
      });

      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! It helps us provide better support.",
      });

      setFeedbackText("");
      setSatisfactionScore(null);
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
            <BarChart3 className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-blue-900">Weekly Summary</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Your Week in Review</h2>
          <p className="text-blue-700">
            Week of {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {new Date().toLocaleDateString()}
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/60">
            <TabsTrigger value="overview" className="text-blue-900">Overview</TabsTrigger>
            <TabsTrigger value="progress" className="text-blue-900">Progress</TabsTrigger>
            <TabsTrigger value="feedback" className="text-blue-900">Feedback</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mood Summary */}
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-900">
                    <Heart className="h-6 w-6 mr-2 text-red-500" />
                    Mood Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Average Mood:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-900">{weeklyData.moodAverage}</span>
                        <TrendingUp className={`h-5 w-5 ${weeklyData.moodTrend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2">
                      {moodData.map((day) => (
                        <div key={day.day} className="text-center">
                          <div className="text-xs text-blue-600 mb-1">{day.day}</div>
                          <div className="text-2xl">{day.emoji}</div>
                          <div className="text-xs text-blue-800">{day.mood}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exercise Summary */}
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-900">
                    <Star className="h-6 w-6 mr-2 text-yellow-500" />
                    Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-blue-700 mb-2">
                        <span>Exercises Completed</span>
                        <span>{weeklyData.exercisesCompleted}/{weeklyData.exercisesTarget}</span>
                      </div>
                      <Progress value={(weeklyData.exercisesCompleted / weeklyData.exercisesTarget) * 100} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-green-800">{weeklyData.exercisesCompleted}</div>
                        <div className="text-sm text-green-600">Exercises</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-blue-800">{weeklyData.journalEntries}</div>
                        <div className="text-sm text-blue-600">Journal Entries</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Admin Feedback */}
            <Card className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-900">
                  <MessageSquare className="h-6 w-6 mr-2" />
                  Message from Your Support Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800 leading-relaxed italic">
                  "{weeklyData.adminFeedback}"
                </p>
                <div className="mt-4 text-sm text-purple-700">
                  - Your Support Specialist
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Weekly Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <div className="text-lg font-bold text-green-800">5 Days</div>
                      <div className="text-sm text-green-600">Mood Tracked</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-3xl mb-2">🫁</div>
                      <div className="text-lg font-bold text-blue-800">3 Sessions</div>
                      <div className="text-sm text-blue-600">Breathing Exercises</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-3xl mb-2">📝</div>
                      <div className="text-lg font-bold text-purple-800">2 Entries</div>
                      <div className="text-sm text-purple-600">Journal Reflections</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Insights & Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">✨ Positive Patterns:</h4>
                      <ul className="text-yellow-800 space-y-1">
                        <li>• Your mood tends to improve after doing breathing exercises</li>
                        <li>• You're most consistent with tracking on weekdays</li>
                        <li>• Weekend mood scores are generally higher</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">🎯 Areas for Growth:</h4>
                      <ul className="text-blue-800 space-y-1">
                        <li>• Consider adding evening mood check-ins</li>
                        <li>• Try journaling on days when mood dips</li>
                        <li>• Explore reflection exercises for deeper insights</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Share Your Experience</CardTitle>
                <CardDescription className="text-blue-700">
                  Your feedback helps us improve our support and better understand your needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-900">How satisfied are you with your support this week?</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => setSatisfactionScore(score)}
                          className={`
                            p-4 rounded-lg border-2 transition-all hover:scale-105 text-center
                            ${satisfactionScore === score 
                              ? "bg-blue-100 border-blue-500 ring-2 ring-blue-300" 
                              : "bg-white border-gray-200 hover:bg-gray-50"
                            }
                          `}
                        >
                          <div className="text-2xl mb-1">
                            {score === 1 && "😞"}
                            {score === 2 && "😐"}
                            {score === 3 && "🙂"}
                            {score === 4 && "😊"}
                            {score === 5 && "😄"}
                          </div>
                          <div className="text-sm font-medium">{score}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="feedback" className="text-lg font-semibold text-blue-900">
                      Additional Comments (Optional)
                    </label>
                    <Textarea
                      id="feedback"
                      placeholder="Share anything about your experience this week - what helped, what didn't, suggestions for improvement, or just how you're feeling about your progress."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="bg-white/70 border-blue-200 focus:border-green-500 min-h-[120px]"
                      maxLength={500}
                    />
                    <p className="text-sm text-blue-600">{feedbackText.length}/500 characters</p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting Feedback..." : "Submit Weekly Feedback"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WeeklySummary;
