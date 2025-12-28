// ** React Import
import { useEffect, useMemo, useRef, useState } from "react";

// ** Styles Import
import styles from "./index.module.scss";

// ** Another Import
import Search from "./components/Search";
import ForceGraph2D from "react-force-graph-2d";
import { generateGraphData } from "../../../../data";
import { Graph, Node } from "../../utils/types/graph";
import { forceCollide, forceManyBody } from "d3-force";
import { createGlobalDriftForce } from "../../utils/funtions/createGlobalDriftForce";
import { MIN_ZOOM } from "../../utils/constants";

export default function KnowledgeGraph() {
  const graphData: Graph = useMemo(() => generateGraphData(), []);

  // ** State
  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
  const [placeholder, setPlaceholder] = useState<string>("searching....");

  // ** Hooks
  const fgRef = useRef<any>(null);

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
    fg.d3Force("drift", createGlobalDriftForce(0.005));

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

  useEffect(() => {
    if (!fgRef.current) return;
  
    fgRef.current.zoom(0.12, 0);     // zoom gần trước
    fgRef.current.zoom(MIN_ZOOM, 2000); // trôi ra trong 2s
  }, []);

  const isLinkRelated = (link: any, nodeId: string | null) => {
    if (!nodeId) return false;
    const s = typeof link.source === "object" ? link.source.id : link.source;
    const t = typeof link.target === "object" ? link.target.id : link.target;
    return s === nodeId || t === nodeId;
  };
  
  const isNodeRelated = (nodeId: string, hoverId: string | null) => {
    if (!hoverId) return false;
  
    return (
      nodeId === hoverId ||
      graphData.links.some((l: any) => {
        const s = typeof l.source === "object" ? l.source.id : l.source;
        const t = typeof l.target === "object" ? l.target.id : l.target;
        return (
          (s === hoverId && t === nodeId) ||
          (t === hoverId && s === nodeId)
        );
      })
    );
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
        d3AlphaDecay={0.002}
        graphData={graphData}
        enableZoomInteraction
        autoPauseRedraw={false}
        backgroundColor="#f6f1e7"
        d3VelocityDecay={0.035}
        onNodeHover={(node) => {
          setHoverNodeId(node ? (node as Node).id : null);
          document.body.style.cursor = node ? "pointer" : "default";
        }}
        linkCanvasObject={(link: any, ctx, scale) => {
          const isActive = isLinkRelated(link, hoverNodeId);
      
          ctx.strokeStyle = isActive
            ? "rgba(30, 30, 30, 0.9)"
            : hoverNodeId
            ? "rgba(200, 200, 200, 0.15)"
            : "rgba(180, 180, 180, 0.4)";
      
          ctx.lineWidth = isActive ? 1 / scale : 0.5 / scale;
      
          ctx.beginPath();
          ctx.moveTo(link.source.x, link.source.y);
          ctx.lineTo(link.target.x, link.target.y);
          ctx.stroke();
        }}
        nodeCanvasObject={(node: Node, ctx, scale) => {
          if (node.x == null || node.y == null) return;
      
          const isActive = isNodeRelated(node.id, hoverNodeId);
    
          const fontSize =
            (node.level === 1 ? 24 : node.level === 2 ? 16 : 14) / scale;
      
          ctx.font = `${fontSize}px Inter, system-ui`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = isActive ? "#111" : "#999";
          ctx.fillText(node.label, node.x, node.y);
        }}
      
        // 🔥 CÁI QUAN TRỌNG NHẤT
        nodePointerAreaPaint={(node: Node, color, ctx) => {
          if (node.x == null || node.y == null) return;
      
          const radius =
            node.level === 1 ? 40 :
            node.level === 2 ? 28 : 22;
      
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }}
      />
    </div>
  );
}
