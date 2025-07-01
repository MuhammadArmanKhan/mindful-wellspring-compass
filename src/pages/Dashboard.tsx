
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, User, Activity, Calendar, AlertTriangle, BarChart3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dailyMessage, setDailyMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
      return;
    }

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);

    // Set daily motivational message
    const messages = [
      "Today is a new opportunity to care for your wellbeing. Take it one moment at a time.",
      "Remember: progress isn't always visible, but every small step matters.",
      "You have the strength to face today's challenges. Trust in your resilience.",
      "Breathe deeply. You are exactly where you need to be right now.",
      "Your mental health matters. Thank you for taking time to check in with yourself."
    ];
    
    const dayOfYear = Math.floor((currentTime.getTime() - new Date(currentTime.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    setDailyMessage(messages[dayOfYear % messages.length]);

    return () => clearInterval(timer);
  }, [navigate, currentTime]);

  const handleLogout = () => {
    localStorage.clear();
    toast({
      title: "Logged Out",
      description: "Take care of yourself. See you soon!",
    });
    navigate("/");
  };

  const timeOfDay = currentTime.getHours() < 12 ? "morning" : currentTime.getHours() < 18 ? "afternoon" : "evening";
  const userEmail = localStorage.getItem("userEmail") || "friend";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-blue-900">Wellbeing Support</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-700">Welcome, {userEmail.split('@')[0]}</span>
            <Button variant="outline" onClick={handleLogout} className="bg-white/50">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">
            Good {timeOfDay}! 
          </h2>
          <p className="text-blue-700 text-lg">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Daily Message Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Heart className="h-6 w-6 mr-2" />
              Your Daily Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 text-lg italic leading-relaxed">
              "{dailyMessage}"
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/mood">
            <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-2" />
                <CardTitle className="text-blue-900">Track Your Mood</CardTitle>
                <CardDescription className="text-blue-700">
                  How are you feeling today? Let's check in with your emotions.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/exercises">
            <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="text-center">
                <Activity className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-blue-900">Guided Exercises</CardTitle>
                <CardDescription className="text-blue-700">
                  Breathing, journaling, and mindfulness exercises for your wellbeing.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/summary">
            <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="text-center">
                <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-blue-900">Weekly Summary</CardTitle>
                <CardDescription className="text-blue-700">
                  See your progress and get feedback from support staff.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Emergency Section */}
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="h-6 w-6 mr-2" />
              Need Immediate Support?
            </CardTitle>
            <CardDescription className="text-red-700">
              If you're experiencing a crisis or need immediate help, don't hesitate to reach out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/emergency" className="flex-1">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6">
                  Emergency Alert
                </Button>
              </Link>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-red-700 font-medium mb-2">Crisis Hotlines:</p>
                <p className="text-red-600">988 - Suicide & Crisis Lifeline</p>
                <p className="text-red-600">741741 - Crisis Text Line</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/60 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Your Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">Mood tracked</span>
                </div>
                <span className="text-green-600 text-sm">Yesterday</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">Breathing exercise completed</span>
                </div>
                <span className="text-blue-600 text-sm">2 days ago</span>
              </div>
              
              <div className="text-center py-4">
                <p className="text-blue-700">Start tracking your activities to see your progress here!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
