
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timer, ShieldCheck, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function CountdownCard() {
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds
  const [lastCheckIn, setLastCheckIn] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    setTimeLeft(86400);
    setLastCheckIn(new Date());
    toast({
      title: "Check-in Successful",
      description: "Your vault drop has been delayed by 24 hours.",
    });
  };

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / 86400) * 100;

  return (
    <Card className="overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-headline flex items-center gap-2">
            <Timer className="w-5 h-5 text-accent" />
            Dead Man's Switch
          </CardTitle>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
            <ShieldCheck className="w-3 h-3 text-green-500" />
            Secured via Shelby
          </div>
        </div>
        <CardDescription>
          Your vault drops if this timer hits zero. Check in daily to reset.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center py-4">
          <div className="flex gap-4">
            <TimeUnit label="Hours" value={hours} />
            <span className="text-4xl font-bold pt-1">:</span>
            <TimeUnit label="Min" value={minutes} />
            <span className="text-4xl font-bold pt-1">:</span>
            <TimeUnit label="Sec" value={seconds} />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium px-1">
            <span className={timeLeft < 3600 ? "text-destructive flex items-center gap-1" : "text-muted-foreground"}>
              {timeLeft < 3600 && <AlertCircle className="w-3 h-3" />}
              Vault Status: {timeLeft < 3600 ? "Critical" : "Stable"}
            </span>
            <span className="text-muted-foreground">86,400s Remaining</span>
          </div>
          <Progress value={progress} className="h-2 bg-secondary" />
        </div>

        <Button 
          onClick={handleCheckIn}
          className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg font-semibold shadow-lg shadow-primary/20"
        >
          I'm Alive - Reset Timer
        </Button>

        {lastCheckIn && (
          <p className="text-center text-xs text-muted-foreground">
            Last check-in: {lastCheckIn.toLocaleTimeString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function TimeUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-bold font-mono tracking-tighter">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{label}</div>
    </div>
  );
}
