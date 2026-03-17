
"use client";

import Link from "next/link";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Skull, Wallet, LogOut, ChevronRight } from "lucide-react";
import { formatAddress } from "@/lib/encryption";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { connected, account, wallet, connect, disconnect, wallets } = useWallet();

  const handleConnect = async (walletName: any) => {
    try {
      await connect(walletName);
    } catch (e) {
      console.error("Connection failed", e);
    }
  };

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-2 rounded-xl group-hover:bg-primary/30 transition-colors">
            <Skull className="w-6 h-6 text-primary" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight">GhostDrop</span>
        </Link>

        <div className="flex items-center gap-4">
          {connected && account ? (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 border-primary/20 hover:border-primary/50 bg-primary/5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-mono">{formatAddress(account.address)}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={disconnect}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white gap-2 px-6">
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {wallets?.map((w) => (
                  <DropdownMenuItem key={w.name} onClick={() => handleConnect(w.name)} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={w.icon} alt={w.name} className="w-5 h-5" />
                      <span>{w.name}</span>
                    </div>
                    {w.readyState === "Installed" && <span className="text-[10px] bg-accent/20 text-accent px-1.5 rounded uppercase font-bold">Installed</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
