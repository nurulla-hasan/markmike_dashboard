import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CodeVerification() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResend = async () => {
    console.log("Resending code...");
    // Simulate API call
  };

  const handleSubmit = async () => {
    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    console.log("Verifying code:", code);
    
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        navigate("/auth/reset-password");
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="w-full max-w-112.5">
        <CardHeader>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Verify Your Email</h1>
            <p className="text-sm text-muted-foreground">
              We've sent a 6-digit verification code to your email.
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-8">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value: string) => {
                  setCode(value)
                  setError("")
                }}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            {error && (
              <p className="text-sm text-red-500 text-center font-medium">{error}</p>
            )}

            <Button  
              onClick={handleSubmit} 
              className="w-full"
              loading={isLoading}
              loadingText="Verifying..."
              disabled={isLoading || code.length !== 6}
            >
              Verify Code
            </Button>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResend}
                  className="font-semibold text-red-500 hover:underline"
                >
                  Resend Code
                </button>
              </p>
              
              <Link to="/auth/forgot-password">
                <Button variant="ghost">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
