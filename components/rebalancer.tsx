"use client";

import { createDynamicTerminal } from "ink-web/next";
import { MacWindow } from "@/components/ui/mac-window";

const Terminal = createDynamicTerminal(
  () => import("./rebalancer-terminal").then((m) => m.RebalancerTerminal),
  { rows: 30, loading: "spinner" },
);

export default function Rebalancer() {
  return (
    <MacWindow title="Rebalance">
      <div className="overflow-x-auto overscroll-x-none">
        <div style={{ minWidth: 760 }}>
          <Terminal />
        </div>
      </div>
    </MacWindow>
  );
}
