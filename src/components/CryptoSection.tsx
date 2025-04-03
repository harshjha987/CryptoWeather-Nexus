"use client";

import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp } from "lucide-react";

function CryptoSection() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle
          className="flex
            items-center gap-2"
        >
          <TrendingUp className="h-5 w-5" />
          Cryptocurrencies
        </CardTitle>
        <CardDescription>Live cryptocurrency prices.</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default CryptoSection;
