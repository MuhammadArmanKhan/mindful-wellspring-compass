
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [language, setLanguage] = useState("en");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const navigate = useNavigate();
  const { signUp, loading } = useAuth();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms || !agreePrivacy) {
      toast({
        title: "Agreement Required",
        description: "Please agree to our terms and privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      await signUp(email, password, language);
      navigate("/dashboard");
    } catch (error) {
      // Error handling is done in the useAuth hook
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-blue-200">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-blue-900">Wellbeing Support</span>
          </div>
          <CardTitle className="text-2xl text-blue-900">Create Your Account</CardTitle>
          <CardDescription className="text-blue-700">
            Start your journey to better wellbeing today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/70 border-blue-200 focus:border-green-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-900">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="bg-white/70 border-blue-200 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-blue-900">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white/70 border-blue-200 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="text-blue-900">Preferred Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-white/70 border-blue-200 focus:border-green-500">
                  <SelectValue placeholder="Select your language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms} 
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-blue-700 leading-tight">
                  I agree to the Terms of Service and understand how my data will be used for wellbeing support
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="privacy" 
                  checked={agreePrivacy} 
                  onCheckedChange={(checked) => setAgreePrivacy(checked as boolean)}
                />
                <Label htmlFor="privacy" className="text-sm text-blue-700 leading-tight">
                  I consent to the Privacy Policy and GDPR-compliant data processing for my care
                </Label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-blue-700">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                Sign in here
              </Link>
            </p>
            <Link to="/" className="text-sm text-blue-600 hover:text-blue-700 block">
              ← Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
