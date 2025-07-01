
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      console.log("Login attempt:", { email, language });
      
      // Mock role-based redirect
      const mockRole = email.includes("admin") ? "admin" : "user";
      
      toast({
        title: "Login Successful",
        description: `Welcome back! Redirecting to your ${mockRole} dashboard.`,
      });

      // Store language preference
      localStorage.setItem("userLanguage", language);
      localStorage.setItem("userRole", mockRole);
      localStorage.setItem("userEmail", email);

      // Redirect based on role
      if (mockRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-blue-200">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            <span className="text-xl sm:text-2xl font-bold text-blue-900">Wellbeing Support</span>
          </div>
          <CardTitle className="text-xl sm:text-2xl text-blue-900">Welcome Back</CardTitle>
          <CardDescription className="text-blue-700 text-sm sm:text-base">
            Sign in to continue your wellbeing journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900 text-sm sm:text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/70 border-blue-200 focus:border-green-500 text-sm sm:text-base"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-900 text-sm sm:text-base">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/70 border-blue-200 focus:border-green-500 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="text-blue-900 text-sm sm:text-base">Preferred Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-white/70 border-blue-200 focus:border-green-500">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base py-2 sm:py-3"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-xs sm:text-sm text-blue-700">
              Don't have an account?{" "}
              <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                Create one here
              </Link>
            </p>
            <Link to="/" className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 block">
              ← Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
