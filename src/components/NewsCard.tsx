"use client";
import type { NewsData } from "@/lib/types";
import React from "react";
import { Card, CardContent } from "./ui/card";

interface NewsCardProps {
  data: NewsData;
}

function NewsCard({ data }: NewsCardProps) {
  return (
    <Card
      className="overflow-hidden transition-colors
    hover:bg-accent/50"
    >
      <CardContent>
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block space-y-2"
        >
          <h3 className="font-semibold line-clamp-2">
            {data.title || "Untitled Article"}
          </h3>
          <p
            className="text-sm text-muted-foreground line-clamp-3
                "
          >
            {data.description || "No description available"}
          </p>
          <div
            className="flex items-center justify-between text-xs
                text-muted-foreground"
          >
            <span>{data.source || "Unknown Source"}</span>
            <span>
              {data.publishedAt
                ? new Date(data.publishedAt).toLocaleDateString()
                : "Unknown Date Source"}
            </span>
          </div>
        </a>
      </CardContent>
    </Card>
  );
}

export default NewsCard;
