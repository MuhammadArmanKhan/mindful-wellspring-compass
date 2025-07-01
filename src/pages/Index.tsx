
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Users, BarChart3, Bell, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-blue-900">Wellbeing Support</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Link to="/login">
              <Button variant="outline" className="bg-white/50 w-full sm:w-auto">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Heart className="h-16 w-16 text-green-600 mx-auto mb-8" />
          <h2 className="text-4xl sm:text-6xl font-bold text-blue-900 mb-6">
            Your Mental Health 
            <span className="text-green-600"> Matters</span>
          </h2>
          <p className="text-xl text-blue-700 mb-8 leading-relaxed">
            A comprehensive wellbeing support system designed to help you track your mood, 
            access guided exercises, and connect with professional support when you need it most.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 w-full sm:w-auto">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-white/50 text-lg px-8 py-4 w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-blue-900 text-center mb-12">
          Comprehensive Support for Your Wellbeing
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all">
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-blue-900">Mood Tracking</CardTitle>
              <CardDescription className="text-blue-700">
                Monitor your emotional wellbeing with our simple daily check-ins and mood analytics.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-blue-900">Guided Exercises</CardTitle>
              <CardDescription className="text-blue-700">
                Access breathing exercises, journaling prompts, and mindfulness activities.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-blue-900">Emergency Support</CardTitle>
              <CardDescription className="text-blue-700">
                24/7 crisis support with immediate access to professional help when needed.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all">
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-blue-900">Progress Insights</CardTitle>
              <CardDescription className="text-blue-700">
                Weekly summaries and personalized feedback from mental health professionals.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all">
            <CardHeader className="text-center">
              <Bell className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle className="text-blue-900">Smart Notifications</CardTitle>
              <CardDescription className="text-blue-700">
                Gentle reminders and motivational messages to support your daily wellness routine.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all">
            <CardHeader className="text-center">
              <Smartphone className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <CardTitle className="text-blue-900">Mobile Ready</CardTitle>
              <CardDescription className="text-blue-700">
                Access your support system anywhere with our fully responsive mobile design.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Prioritize Your Mental Health?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who have already started their wellness journey with us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/register">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4 w-full sm:w-auto">
                Get Started Today
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-4 w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-green-400" />
            <span className="text-lg font-semibold">Wellbeing Support</span>
          </div>
          <p className="text-blue-200 mb-4">
            Professional mental health support and wellness tracking.
          </p>
          <div className="space-y-2">
            <p className="text-blue-300 text-sm">Crisis Support Available 24/7</p>
            <p className="text-blue-300 text-sm">988 - Suicide & Crisis Lifeline | 741741 - Crisis Text Line</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
