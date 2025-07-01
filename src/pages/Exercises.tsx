
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Heart, ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Exercises = () => {
  const [breathingInProgress, setBreathingInProgress] = useState(false);
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const { toast } = useToast();

  const startBreathingExercise = () => {
    setBreathingInProgress(true);
    setBreathingProgress(0);

    const duration = 60000; // 1 minute
    const interval = 100; // Update every 100ms
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setBreathingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setBreathingInProgress(false);
          completeExercise("breathing");
          return 100;
        }
        return prev + increment;
      });
    }, interval);
  };

  const completeExercise = (exerciseType: string) => {
    setCompletedExercises(prev => [...prev, exerciseType]);
    toast({
      title: "Exercise Completed!",
      description: "Great job taking care of your wellbeing. Your progress has been saved.",
    });

    console.log("Exercise completed:", {
      type: exerciseType,
      timestamp: new Date().toISOString(),
      userId: localStorage.getItem("userEmail")
    });
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
            <h1 className="text-2xl font-bold text-blue-900">Guided Exercises</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Take a Moment for Yourself</h2>
          <p className="text-blue-700 max-w-2xl mx-auto">
            These evidence-based exercises are designed to help you manage stress, improve mindfulness, 
            and support your mental wellbeing. Choose what feels right for you today.
          </p>
        </div>

        <Tabs defaultValue="breathing" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/60">
            <TabsTrigger value="breathing" className="text-blue-900">Breathing</TabsTrigger>
            <TabsTrigger value="journaling" className="text-blue-900">Journaling</TabsTrigger>
            <TabsTrigger value="reflection" className="text-blue-900">Reflection</TabsTrigger>
          </TabsList>

          {/* Breathing Exercise */}
          <TabsContent value="breathing">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Heart className="h-6 w-6 mr-2 text-green-600" />
                  Guided Breathing Exercise
                  {completedExercises.includes("breathing") && (
                    <CheckCircle className="h-5 w-5 ml-2 text-green-600" />
                  )}
                </CardTitle>
                <CardDescription className="text-blue-700">
                  A simple 4-7-8 breathing technique to help reduce anxiety and promote relaxation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-blue-700">
                      <li>Inhale through your nose for 4 seconds</li>
                      <li>Hold your breath for 7 seconds</li>
                      <li>Exhale through your mouth for 8 seconds</li>
                      <li>Repeat the cycle</li>
                    </ol>
                  </div>

                  {breathingInProgress && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl mb-4 animate-pulse">🫁</div>
                        <p className="text-lg text-blue-900 font-medium">
                          Focus on your breathing...
                        </p>
                      </div>
                      <Progress value={breathingProgress} className="w-full" />
                      <p className="text-center text-blue-700">
                        {Math.round(breathingProgress)}% Complete
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <Button
                      onClick={startBreathingExercise}
                      disabled={breathingInProgress}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                    >
                      <Clock className="h-5 w-5 mr-2" />
                      {breathingInProgress ? "Exercise in Progress..." : "Start 1-Minute Session"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Journaling Exercise */}
          <TabsContent value="journaling">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Heart className="h-6 w-6 mr-2 text-green-600" />
                  Reflective Journaling
                  {completedExercises.includes("journaling") && (
                    <CheckCircle className="h-5 w-5 ml-2 text-green-600" />
                  )}
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Structured prompts to help you explore your thoughts and feelings in a safe space.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3">Today's Journal Prompts:</h4>
                    <div className="space-y-3 text-green-800">
                      <p>1. What am I grateful for today?</p>
                      <p>2. What emotions have I experienced, and what might have triggered them?</p>
                      <p>3. What is one small thing I can do to care for myself today?</p>
                      <p>4. If I could tell my past self something encouraging, what would it be?</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Tips for journaling:</h4>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>Write without judgment - there's no right or wrong way</li>
                      <li>Focus on your feelings rather than just events</li>
                      <li>Take your time - even 5 minutes can be helpful</li>
                      <li>Consider keeping your journal private and secure</li>
                    </ul>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={() => completeExercise("journaling")}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                    >
                      Mark as Completed
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reflection Exercise */}
          <TabsContent value="reflection">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Heart className="h-6 w-6 mr-2 text-green-600" />
                  Mindful Reflection
                  {completedExercises.includes("reflection") && (
                    <CheckCircle className="h-5 w-5 ml-2 text-green-600" />
                  )}
                </CardTitle>
                <CardDescription className="text-blue-700">
                  A guided practice to help you connect with your inner wisdom and find clarity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-3">Reflection Exercise:</h4>
                    <div className="space-y-4 text-purple-800">
                      <div>
                        <p className="font-medium">Step 1: Ground Yourself (2 minutes)</p>
                        <p className="text-sm">Sit comfortably and notice 5 things you can see, 4 you can hear, 3 you can touch, 2 you can smell, and 1 you can taste.</p>
                      </div>
                      <div>
                        <p className="font-medium">Step 2: Check In (3 minutes)</p>
                        <p className="text-sm">Ask yourself: "How am I really feeling right now?" Notice without trying to change anything.</p>
                      </div>
                      <div>
                        <p className="font-medium">Step 3: Appreciate (2 minutes)</p>
                        <p className="text-sm">Think of three things that went well recently, no matter how small.</p>
                      </div>
                      <div>
                        <p className="font-medium">Step 4: Set an Intention (2 minutes)</p>
                        <p className="text-sm">What quality would you like to bring to the rest of your day? (Kindness, patience, curiosity, etc.)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Remember:</h4>
                    <p className="text-yellow-800">
                      This practice is about awareness, not perfection. Let your thoughts come and go naturally, 
                      like clouds passing through the sky.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={() => completeExercise("reflection")}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                    >
                      Complete Reflection
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Progress Summary */}
        {completedExercises.length > 0 && (
          <Card className="mt-8 bg-green-50/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="text-green-900">Today's Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {completedExercises.map((exercise, index) => (
                  <div key={index} className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-800 capitalize">{exercise}</span>
                  </div>
                ))}
              </div>
              <p className="text-green-700 mt-4">
                Great job taking time for your wellbeing today! Your efforts make a difference.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Exercises;
