
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, FileText, Trash2, Lock, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { encryptFile } from "@/lib/encryption";

interface VaultFile {
  id: string;
  name: string;
  size: string;
  encryptedAt: string;
}

export function VaultFiles() {
  const [files, setFiles] = useState<VaultFile[]>([
    { id: "1", name: "last_will.pdf", size: "1.2 MB", encryptedAt: "2024-03-20" },
    { id: "2", name: "keys_backup.json.enc", size: "45 KB", encryptedAt: "2024-03-15" }
  ]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Simulate encryption process
      await encryptFile(file);
      
      const newFile: VaultFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        encryptedAt: new Date().toISOString().split('T')[0]
      };
      
      setFiles([newFile, ...files]);
      toast({
        title: "File Encrypted",
        description: `${file.name} is now secure in your GhostDrop vault.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Encryption process encountered an error.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-headline flex items-center gap-2">
            <Lock className="w-5 h-5 text-accent" />
            Encrypted Assets
          </CardTitle>
          <CardDescription>Securely store files for your recipients.</CardDescription>
        </div>
        <div className="relative">
          <Input 
            type="file" 
            className="hidden" 
            id="file-upload" 
            onChange={handleUpload}
            disabled={isUploading}
          />
          <Button 
            asChild 
            variant="outline" 
            size="sm"
            className="border-accent/20 hover:border-accent/50 bg-accent/5"
          >
            <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-2">
              <FileUp className="w-4 h-4" />
              {isUploading ? "Encrypting..." : "Upload File"}
            </label>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {files.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-lg">
              <Shield className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Your vault is currently empty.</p>
            </div>
          ) : (
            files.map((file) => (
              <div 
                key={file.id} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-secondary p-2 rounded-lg text-primary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      {file.size} • Encrypted {file.encryptedAt}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
