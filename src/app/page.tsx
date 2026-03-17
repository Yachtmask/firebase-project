
"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Navbar } from "@/components/navbar";
import { CountdownCard } from "@/components/vault/CountdownCard";
import { VaultFiles } from "@/components/vault/VaultFiles";
import { RecipientManager } from "@/components/vault/RecipientManager";
import { Skull, ShieldCheck, Zap, Lock, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {!connected ? (
          <div className="max-w-4xl mx-auto space-y-24 py-12">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold border border-primary/20">
                <Skull className="w-4 h-4" />
                Dead Man's Switch Vault
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                Control your legacy.<br />Automatically.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                GhostDrop is a decentralized dead man's switch. Encrypt your most sensitive files and set a release trigger. If you go dark, your people get the keys.
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-8 text-lg font-bold rounded-2xl">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold rounded-2xl border-white/10">
                  Read Protocol
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Lock className="w-6 h-6 text-accent" />}
                title="End-to-End Encryption"
                description="Files are encrypted client-side using WebCrypto. Only your recipients can decrypt them."
              />
              <FeatureCard 
                icon={<ShieldCheck className="w-6 h-6 text-accent" />}
                title="Aptos Secured"
                description="Identity and switch logic handled on-chain for maximum reliability and zero downtime."
              />
              <FeatureCard 
                icon={<Zap className="w-6 h-6 text-accent" />}
                title="Shelby Compatible"
                description="Built on the latest Shelby standards for cross-chain data interoperability and security."
              />
            </div>

            {/* Teaser Image */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/ghostdrop/1200/600" 
                alt="GhostDrop Interface Preview" 
                className="w-full opacity-40 grayscale"
                data-ai-hint="dark digital interface"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <EyeOff className="w-16 h-16 text-white/20 mx-auto" />
                  <p className="text-white/40 font-mono tracking-widest uppercase text-sm">Waiting for connection...</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 py-4">
            {/* Left Sidebar / Dashboard Stats */}
            <div className="lg:col-span-4 space-y-6">
              <CountdownCard />
              <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-headline font-bold">Vault Intelligence</h3>
                </div>
                <div className="space-y-3">
                  <StatRow label="Active Switches" value="1" />
                  <StatRow label="Stored Data" value="1.24 GB" />
                  <StatRow label="Integrity Score" value="99.9%" />
                </div>
                <Button variant="link" className="px-0 text-accent h-auto font-bold text-sm">View Shelby Audit Trail &rarr;</Button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-headline font-bold">Digital Vault</h2>
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest bg-secondary/50 px-3 py-1 rounded-full border border-border/40">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Protocol Active
                </div>
              </div>
              <div className="grid md:grid-cols-1 gap-6">
                <VaultFiles />
                <RecipientManager />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border/40 py-8 bg-black/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Skull className="w-4 h-4" />
            <span className="font-bold">GhostDrop</span>
            <span>&copy; 2024 Protocol</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">Github</a>
            <a href="#" className="hover:text-primary transition-colors">Shelby Standards</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-card border border-border/40 hover:border-accent/30 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-headline font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-bold">{value}</span>
    </div>
  );
}
