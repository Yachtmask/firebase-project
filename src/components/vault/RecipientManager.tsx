
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, UserPlus, X, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Recipient {
  id: string;
  name: string;
  email: string;
}

export function RecipientManager() {
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: "1", name: "Sarah Connor", email: "sarah@future.net" }
  ]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const addRecipient = () => {
    if (!newName || !newEmail) return;
    const newR = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      email: newEmail
    };
    setRecipients([...recipients, newR]);
    setNewName("");
    setNewEmail("");
    toast({
      title: "Recipient Added",
      description: `${newName} will receive access to your vault if the switch triggers.`,
    });
  };

  const removeRecipient = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id));
  };

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-headline flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          Beneficiaries
        </CardTitle>
        <CardDescription>Who gets access when the vault drops?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Input 
            placeholder="Name" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)}
            className="bg-secondary/30 border-border/40"
          />
          <Input 
            placeholder="Email Address" 
            value={newEmail} 
            onChange={(e) => setNewEmail(e.target.value)}
            className="bg-secondary/30 border-border/40"
          />
        </div>
        <Button 
          onClick={addRecipient} 
          variant="secondary" 
          className="w-full gap-2 border border-border/40"
        >
          <UserPlus className="w-4 h-4" />
          Add Beneficiary
        </Button>

        <div className="space-y-2 pt-2">
          {recipients.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/10">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.email}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => removeRecipient(r.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
