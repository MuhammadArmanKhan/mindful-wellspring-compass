
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Shield, AlertTriangle, Users, Activity, TrendingUp, MessageSquare, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [adminComment, setAdminComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has admin role
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [navigate, toast]);

  // Mock data - in real app would come from API
  const dashboardStats = {
    totalUsers: 247,
    activeToday: 89,
    emergencyAlerts: 3,
    avgMoodScore: 3.6
  };

  const recentAlerts = [
    {
      id: "1",
      userId: "user123@example.com",
      reason: "Feeling overwhelmed and anxious",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: "responded"
    },
    {
      id: "2",
      userId: "user456@example.com",
      reason: "Having dark thoughts",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: "pending"
    },
    {
      id: "3",
      userId: "user789@example.com",
      reason: "",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "resolved"
    }
  ];

  const recentActivity = [
    { userId: "user123@example.com", action: "Mood tracked", mood: 4, timestamp: new Date(Date.now() - 10 * 60 * 1000) },
    { userId: "user456@example.com", action: "Breathing exercise", mood: null, timestamp: new Date(Date.now() - 25 * 60 * 1000) },
    { userId: "user789@example.com", action: "Mood tracked", mood: 2, timestamp: new Date(Date.now() - 40 * 60 * 1000) },
    { userId: "user321@example.com", action: "Journal entry", mood: null, timestamp: new Date(Date.now() - 60 * 60 * 1000) },
  ];

  const userProfiles = [
    {
      id: "user123@example.com",
      name: "Sarah M.",
      joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      avgMood: 3.8,
      lastActive: new Date(Date.now() - 10 * 60 * 1000),
      exercisesCompleted: 45,
      riskLevel: "low"
    },
    {
      id: "user456@example.com",
      name: "Alex R.",
      joinDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      avgMood: 2.4,
      lastActive: new Date(Date.now() - 45 * 60 * 1000),
      exercisesCompleted: 12,
      riskLevel: "medium"
    },
    {
      id: "user789@example.com",
      name: "Jordan K.",
      joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      avgMood: 4.2,
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      exercisesCompleted: 78,
      riskLevel: "low"
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    toast({
      title: "Logged Out",
      description: "Goodbye! Have a great day.",
    });
    navigate("/");
  };

  const handleSendComment = async (userId: string) => {
    if (!adminComment.trim()) {
      toast({
        title: "Please enter a comment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Admin comment sent:", {
        userId,
        comment: adminComment,
        adminId: localStorage.getItem("userEmail"),
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Comment Sent",
        description: "Your message has been added to the user's record.",
      });

      setAdminComment("");
      setSelectedUser(null);
      setIsSubmitting(false);
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="destructive">Pending</Badge>;
      case "responded":
        return <Badge className="bg-yellow-500">Responded</Badge>;
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge variant="destructive">High Risk</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium Risk</Badge>;
      case "low":
        return <Badge className="bg-green-500">Low Risk</Badge>;
      default:
        return <Badge variant="secondary">{risk}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" className="bg-white/50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                User View
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="bg-white/50">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{dashboardStats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{dashboardStats.activeToday}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Emergency Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{dashboardStats.emergencyAlerts}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Avg Mood Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{dashboardStats.avgMoodScore}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/60">
            <TabsTrigger value="alerts" className="text-slate-900">Emergency Alerts</TabsTrigger>
            <TabsTrigger value="activity" className="text-slate-900">User Activity</TabsTrigger>
            <TabsTrigger value="users" className="text-slate-900">User Management</TabsTrigger>
          </TabsList>

          {/* Emergency Alerts Tab */}
          <TabsContent value="alerts">
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <AlertTriangle className="h-6 w-6 mr-2 text-red-600" />
                  Recent Emergency Alerts
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Monitor and respond to user emergency alerts in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-slate-900">{alert.userId}</p>
                          <p className="text-sm text-slate-600">
                            {alert.timestamp.toLocaleString()}
                          </p>
                        </div>
                        {getStatusBadge(alert.status)}
                      </div>
                      {alert.reason && (
                        <p className="text-slate-700 bg-slate-50 p-2 rounded italic">
                          "{alert.reason}"
                        </p>
                      )}
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Contact User
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark Resolved
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Activity Tab */}
          <TabsContent value="activity">
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <Activity className="h-6 w-6 mr-2 text-green-600" />
                  Real-time User Activity
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Monitor user engagement and wellbeing activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-slate-900">{activity.userId}</p>
                          <p className="text-sm text-slate-600">{activity.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.mood && (
                          <div className="text-lg mb-1">
                            {activity.mood === 1 && "😢"}
                            {activity.mood === 2 && "😟"}
                            {activity.mood === 3 && "😐"}
                            {activity.mood === 4 && "😊"}
                            {activity.mood === 5 && "😄"}
                          </div>
                        )}
                        <p className="text-xs text-slate-500">
                          {activity.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users">
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-900">
                    <Users className="h-6 w-6 mr-2 text-purple-600" />
                    User Profiles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfiles.map((user) => (
                      <div key={user.id} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-slate-900">{user.name}</h3>
                            <p className="text-sm text-slate-600">{user.id}</p>
                            <p className="text-xs text-slate-500">
                              Joined: {user.joinDate.toLocaleDateString()}
                            </p>
                          </div>
                          {getRiskBadge(user.riskLevel)}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-2 bg-slate-50 rounded">
                            <div className="text-lg font-bold text-slate-900">{user.avgMood}</div>
                            <div className="text-xs text-slate-600">Avg Mood</div>
                          </div>
                          <div className="text-center p-2 bg-slate-50 rounded">
                            <div className="text-lg font-bold text-slate-900">{user.exercisesCompleted}</div>
                            <div className="text-xs text-slate-600">Exercises</div>
                          </div>
                          <div className="text-center p-2 bg-slate-50 rounded">
                            <div className="text-xs text-slate-600">Last Active</div>
                            <div className="text-xs font-medium text-slate-900">
                              {user.lastActive.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedUser(user.id)}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Add Comment
                          </Button>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Export Data
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add Comment Modal */}
              {selectedUser && (
                <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900">Add Comment for {selectedUser}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Enter your comment or feedback for this user..."
                        value={adminComment}
                        onChange={(e) => setAdminComment(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleSendComment(selectedUser)}
                          disabled={isSubmitting}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isSubmitting ? "Sending..." : "Send Comment"}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSelectedUser(null);
                            setAdminComment("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
