"use client";
import AuthForm from "@/app/mycomponents/authform";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { BookOpenCheck, Cloud, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="container relative flex min-h-[90vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        
        {/* Left Side - Hero Content */}
        <div className="relative hidden h-full flex-col bg-gradient-to-br from-blue-600 to-purple-700 p-10 text-white lg:flex">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          <div className="relative z-20 flex items-center gap-3 text-lg font-medium">
            <BookOpenCheck className="h-8 w-8" />
            SheetBridge
          </div>
          
          <div className="relative z-20 mt-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold leading-tight">
                Transform Your Spreadsheet Management
              </h1>
              <p className="mt-3 text-lg text-white/90">
                Connect, visualize, and collaborate on your Google Sheets data like never before. 
                Get started with your free account today.
              </p>
            </motion.div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { icon: <Cloud className="h-5 w-5" />, text: "Cloud Sync" },
                { icon: <Lock className="h-5 w-5" />, text: "Bank-grade Security" },
                { icon: "🚀", text: "Real-time Updates" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex flex-col items-center gap-1 rounded-lg bg-white/10 p-3 backdrop-blur-sm"
                >
                  {feature.icon}
                  <span className="text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex w-full flex-col justify-center space-y-5 sm:w-[380px]"
          >
            <div className="flex flex-col items-center space-y-2 text-center lg:hidden mb-6">
              <BookOpenCheck className="h-10 w-10 text-blue-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SheetBridge
              </h1>
            </div>

            <Card className="relative overflow-hidden border-0 shadow-lg bg-white/95 backdrop-blur">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 blur pointer-events-none" />
              
              <CardHeader className="space-y-1">
                <h2 className="text-2xl font-bold text-center">
                  Welcome to SheetBridge
                </h2>
                <p className="text-sm text-muted-foreground text-center">
                  {`Enter your credentials to ${"sign in"} to your account`}
                </p>
              </CardHeader>
              
              <CardContent className="grid gap-3">
                <AuthForm />
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                        fill="currentColor"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                        fill="currentColor"
                      />
                    </svg>
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
