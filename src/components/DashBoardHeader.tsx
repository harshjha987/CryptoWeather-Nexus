import React from "react";

function DashBoardHeader() {
  return (
    <div className="flex flex-col gap-2">
      <h1
        className="text-3xl
        font-bold tracking-tight"
      >
        Dashboard
      </h1>
      <p className="text-muted-foreground">
        Monitor weather , cryptocurrencies, and news in real-time.
      </p>
    </div>
  );
}

export default DashBoardHeader;
