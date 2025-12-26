// ** React Import
import { useEffect, useMemo, useRef, useState } from "react";

// ** Styles Import
import styles from "./index.module.scss";

// ** Lib Import
import ForceGraph2D from "react-force-graph-2d";
import { forceCollide, forceManyBody } from "d3-force";

// ** Data / Utils
import { generateGraphData } from "../../../../data";
import { Graph, Node } from "../../utils/types/graph";
import { createGlobalDriftForce } from "./ultils/createGlobalDriftForce";

export default function KnowledgeGraph() {
  const graphData: Graph = useMemo(() => generateGraphData(), []);

  const fgRef = useRef<any>(null);
  const [hoverNode, setHoverNode] = useState<Node | null>(null);

  /* ---------------- INIT FORCES ---------------- */
  useEffect(() => {
    if (!fgRef.current) return;
    const fg = fgRef.current;

    fg.d3Force(
      "charge",
      forceManyBody()
        .strength((node: any) => {
          if (node.level === 1) return -11000;
          if (node.level === 2) return -6000;
          return -3000;
        })
        .distanceMin(500)
        .distanceMax(18000)
    );

    fg.d3Force("center", null);

    fg.d3Force("link")?.distance((link: any) => {
      const s = link.source;
      const t = link.target;
      const depth = Math.max(s.level, t.level);

      if (depth === 1) return 2800;
      if (depth === 2) return 4200 * 5;
      return 6800 * 4;
    });

    fg.d3Force(
      "collide",
      forceCollide((node: any) => {
        if (node.level === 1) return 120;
        if (node.level === 2) return 90;
        return 70;
      }).strength(1)
    );

    // 🌊 FORCE TRÔI
    fg.d3Force("drift", createGlobalDriftForce(0.005));

    fg.d3ReheatSimulation();
  }, []);

  /* -------- KEEP SIMULATION ALIVE -------- */
  useEffect(() => {
    if (!fgRef.current) return;

    let raf: number;
    const loop = () => {
      fgRef.current?.d3ReheatSimulation();
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ---------------- HELPERS ---------------- */
  const isNeighbor = (a: Node, b: Node) =>
    graphData.links.some(
      (l) =>
        (l.source === a.id && l.target === b.id) ||
        (l.source === b.id && l.target === a.id)
    );

  /* ---------------- RENDER ---------------- */
  return (
    <div className={styles.graphContainer}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        autoPauseRedraw={false}
        enableNodeDrag
        enableZoomInteraction
        enablePanInteraction
        backgroundColor="#fff"
        d3AlphaDecay={0.002}
        d3VelocityDecay={0.035}
        onNodeHover={(n) => setHoverNode(n as Node | null)}
        nodeCanvasObject={(node: Node, ctx, scale) => {
          if (node.x == null || node.y == null) return;

          const active =
            hoverNode &&
            (node.id === hoverNode.id || isNeighbor(node, hoverNode));

          const fontSize =
            (node.level === 1 ? 22 : node.level === 2 ? 16 : 14) / scale;

          ctx.font = `${fontSize}px Inter, system-ui`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = active ? "#111" : "#999";
          ctx.fillText(node.label, node.x, node.y);
        }}
      />
    </div>
  );
}
