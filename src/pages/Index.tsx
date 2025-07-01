
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, User, Shield, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-blue-900">Wellbeing Support</h1>
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline" className="bg-white/50">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-blue-900 mb-6">
            Your Journey to Better Wellbeing Starts Here
          </h2>
          <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
            A comprehensive support system designed to help you track your mood, practice mindfulness, 
            and stay connected with professional support when you need it most.
          </p>
          <div className="space-x-4">
            <Link to="/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-white/50">
                I'm Returning
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-blue-900 mb-4">How We Support You</h3>
          <p className="text-blue-700 max-w-2xl mx-auto">
            Our platform combines daily wellness tools with professional support to create a comprehensive care experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-blue-900">Daily Check-ins</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-blue-700">
                Track your mood and receive personalized motivational messages every day
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-blue-900">Guided Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-blue-700">
                Practice breathing, journaling, and reflection with expert-designed exercises
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-red-500 mx-auto mb-2" />
              <CardTitle className="text-blue-900">Emergency Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-blue-700">
                Immediate access to help when you need it most, with instant professional notification
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Bell className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-blue-900">Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-blue-700">
                See your wellbeing journey with weekly summaries and professional feedback
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white/60 backdrop-blur-sm border-t border-blue-200">
        <div className="container mx-auto px-4 py-16 text-center">
          <h3 className="text-3xl font-bold text-blue-900 mb-4">Ready to Take the First Step?</h3>
          <p className="text-blue-700 mb-8 max-w-2xl mx-auto">
            Join thousands of people who are improving their wellbeing with professional support and evidence-based tools.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-green-400" />
            <span className="text-lg font-semibold">Wellbeing Support</span>
          </div>
          <p className="text-blue-200">© 2024 Wellbeing Support. Designed with care for your mental health journey.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
