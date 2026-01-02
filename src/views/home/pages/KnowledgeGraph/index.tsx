// ** React Import
import { useEffect, useMemo, useRef, useState } from "react";

// ** Styles Import
import styles from "./index.module.scss";

// ** Another Import
import Search from "./components/Search";
import ForceGraph2D from "react-force-graph-2d";
import { generateGraphData } from "../../../../data";
import { forceCollide, forceManyBody } from "d3-force";
import { Graph, GraphNode } from "../../utils/types/graph";
import { DEFAULT_ZOOM, MIN_ZOOM } from "../../utils/constants";
import { createGlobalDriftForce } from "../../utils/funtions/createGlobalDriftForce";

export default function KnowledgeGraph() {
  const graphData: Graph = useMemo(() => generateGraphData(), []);

  // ** State
  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
  const [placeholder, setPlaceholder] = useState<string>("searching....");

  // ** Hooks
  const fgRef = useRef<any>(null);
  const hoverNodeRef = useRef<string | null>(null);

  // ** useEffect
  useEffect(() => {
    // Feature: INIT FORCES
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
    fg.d3Force("drift", createGlobalDriftForce(0.0008));

    fgRef.current.zoom(0.12, 0); // zoom gần trước
    fgRef.current.zoom(DEFAULT_ZOOM, 2000); // trôi ra trong 2s

    fg.d3ReheatSimulation();
  }, []);

  useEffect(() => {
    // Feature: KEEP SIMULATION ALIVE
    if (!fgRef.current) return;

    let raf: number;
    const loop = () => {
      fgRef.current?.d3ReheatSimulation();
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Feature: RANDOM NODE INTO SEARCH
    if (!graphData?.nodes?.length) return;

    const nodesWithLabel = graphData.nodes.filter(
      (n) => typeof n.label === "string" && n.label.length > 0
    );

    const pickRandom = () => {
      const n =
        nodesWithLabel[Math.floor(Math.random() * nodesWithLabel.length)];
      setPlaceholder(n.label);
    };

    pickRandom();

    const timer = setInterval(pickRandom, 60000);
    return () => clearInterval(timer);
  }, [graphData]);

  // ** Function
  const handleHoverNode = (node: GraphNode | null) => {
    {
      const fg = fgRef.current;
      if (!fg) return;

      // unpin node cũ
      if (hoverNodeRef.current) {
        const prev = graphData.nodes.find((n) => n.id === hoverNodeRef.current);
        if (prev) {
          prev.fx = undefined;
          prev.fy = undefined;
        }
      }

      if (node) {
        node.fx = node.x;
        node.fy = node.y;
        hoverNodeRef.current = node.id;
        setHoverNodeId(node.id);
        document.body.style.cursor = "pointer";
      } else {
        hoverNodeRef.current = null;
        setHoverNodeId(null);
        document.body.style.cursor = "default";
      }

      fg.d3ReheatSimulation();
    }
  };

  return (
    <div className={styles.graphContainer}>
      <div className={styles.graphContainer__search}>
        <Search text={placeholder} />
      </div>

      <ForceGraph2D
        ref={fgRef}
        enableNodeDrag
        minZoom={MIN_ZOOM}
        enablePanInteraction
        graphData={graphData}
        enableZoomInteraction
        autoPauseRedraw={false}
        backgroundColor="#f6f1e7"
        cooldownTicks={Infinity}
        d3AlphaDecay={0.005}
        d3VelocityDecay={0.35}
        onZoom={() => fgRef.current?.d3ReheatSimulation()}
        onNodeDrag={() => fgRef.current?.d3ReheatSimulation()}
        onNodeHover={(node: GraphNode | null) => handleHoverNode(node)}
        linkCanvasObject={(link: any, ctx, scale) => {
          const s = link.source;
          const t = link.target;
          if (!s || !t) return;
        
          ctx.strokeStyle = "rgba(120,110,90,0.12)";
          ctx.lineWidth = 0.6 / scale;
        
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(t.x, t.y);
          ctx.stroke();
        }}        
        nodeCanvasObject={(node: GraphNode, ctx, scale) => {
          if (node.x == null || node.y == null) return;
        
          const isHover = hoverNodeId === node.id;
          const isDimmed = hoverNodeId && !isHover;
        
          const baseSize = node.level === 1 ? 24 : node.level === 2 ? 16 : 14;
          const fontSize = (isHover ? baseSize * 1.2 : baseSize) / scale;
        
          ctx.font = `${fontSize}px Inter, system-ui`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
        
          ctx.globalAlpha = isDimmed ? 0.15 : 1;
          ctx.fillStyle = isHover ? "#111" : "#999";
        
          ctx.fillText(node.label, node.x, node.y);
          ctx.globalAlpha = 1;
        }}        
        // 🔥 CÁI QUAN TRỌNG NHẤT
        nodePointerAreaPaint={(node: GraphNode, color, ctx) => {
          if (node.x == null || node.y == null) return;

          const padding = node.level === 1 ? 200 : node.level === 2 ? 160 : 140;

          ctx.font = `16px Inter`;
          const textWidth = ctx.measureText(node.label).width;

          const w = textWidth + padding * 2;
          const h = padding * 2;

          ctx.fillStyle = color;
          ctx.fillRect(node.x - w / 2, node.y - h / 2, w, h);
        }}
      />
    </div>
  );
}
