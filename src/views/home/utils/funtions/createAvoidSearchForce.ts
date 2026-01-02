import { Force } from "d3-force";

export function createAvoidSearchForce(
  fgRef: any,
  searchEl: HTMLDivElement,
  padding = 260
): Force<any, any> {
  let nodes: any[] = [];

  // smoothstep helper
  const smooth = (t: number) => t * t * (3 - 2 * t);

  function force(alpha: number) {
    if (!fgRef.current || !searchEl) return;
    if (alpha < 0.001) return;

    const fg = fgRef.current;
    const rect = searchEl.getBoundingClientRect();

    // 🔹 center (screen)
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // 🔹 ellipse radius
    const rx = rect.width / 2 + padding;
    const ry = rect.height / 2 + padding * 0.9;

    for (const node of nodes) {
      if (node.x == null || node.y == null) continue;

      const p = fg.graph2ScreenCoords(node.x, node.y);
      if (!p) continue;

      const dx = p.x - cx;
      const dy = p.y - cy;

      const d =
        (dx * dx) / (rx * rx) +
        (dy * dy) / (ry * ry);

      // vùng ảnh hưởng rộng → mượt
      if (d < 1.25) {
        const t = Math.min(1, Math.max(0, (1.25 - d) / 1.25));
        const eased = smooth(t);

        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = dx / len;
        const uy = dy / len;

        // 👉 vector tiếp tuyến (trượt biên)
        const tx = -uy;
        const ty = ux;

        // 🔥 lực nhẹ – mượt
        const push = eased * 8;
        const slide = eased * 4;

        // đổi về graph-space
        const g0 = fg.screen2GraphCoords(p.x, p.y);
        const g1 = fg.screen2GraphCoords(
          p.x + ux * push + tx * slide,
          p.y + uy * push + ty * slide
        );

        node.vx += (g1.x - g0.x) * alpha * 0.8;
        node.vy += (g1.y - g0.y) * alpha * 0.8;
      }
    }
  }

  force.initialize = (_nodes: any[]) => {
    nodes = _nodes;
  };

  return force;
}
