import { Force } from "d3-force";

export function createAvoidSearchForce(
  fgRef: any,
  containerEl: HTMLDivElement,
  searchEl: HTMLDivElement,
  padding = 240,
  viewportPadding = 120
): Force<any, any> {
  let nodes: any[] = [];

  function force(alpha: number) {
    const fg = fgRef.current;
    if (!fg || !searchEl || !containerEl) return;

    alpha = Math.max(alpha, 0.03);

    // 🔑 viewport từ container
    const viewport = containerEl.getBoundingClientRect();
    const vw = viewport.width;
    const vh = viewport.height;

    // search box rect
    const rect = searchEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const center = fg.screen2GraphCoords(cx, cy);

    const rx = rect.width / 2 + padding;
    const ry = rect.height / 2 + padding;

    for (const node of nodes) {
      if (node.x == null || node.y == null) continue;

      // 👉 chỉ node trong viewport
      const screen = fg.graph2ScreenCoords(node.x, node.y);

      if (
        screen.x < -viewportPadding ||
        screen.y < -viewportPadding ||
        screen.x > vw + viewportPadding ||
        screen.y > vh + viewportPadding
      ) {
        continue;
      }

      const dx = node.x - center.x;
      const dy = node.y - center.y;

      const nx = dx / rx;
      const ny = dy / ry;
      const d = nx * nx + ny * ny;

      if (d < 1.25) {
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
        const ux = dx / dist;
        const uy = dy / dist;

        const overlap = 1.25 - d;

        const push = overlap ** 3 * 40;
        const swirl = overlap * 14;

        const tx = -uy;
        const ty = ux;

        node.vx += (ux * push + tx * swirl) * alpha;
        node.vy += (uy * push + ty * swirl) * alpha;
      }
    }
  }

  force.initialize = (_nodes: any[]) => {
    nodes = _nodes;
  };

  return force;
}

export function createViewportRepelForce(
  fgRef: any,
  strength = 0.3,
  padding = 120
): Force<any, any> {
  let nodes: any[] = [];

  function force(alpha: number) {
    if (!fgRef.current) return;

    const fg = fgRef.current;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const center = fg.screen2GraphCoords(vw / 2, vh / 2);

    for (const node of nodes) {
      if (node.x == null || node.y == null) continue;

      const screen = fg.graph2ScreenCoords(node.x, node.y);

      // 👉 chỉ node đang trong viewport
      if (
        screen.x < -padding ||
        screen.y < -padding ||
        screen.x > vw + padding ||
        screen.y > vh + padding
      ) {
        continue;
      }

      const dx = node.x - center.x;
      const dy = node.y - center.y;

      const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const ux = dx / dist;
      const uy = dy / dist;

      const push = strength * alpha * 40;

      node.vx += ux * push;
      node.vy += uy * push;
    }
  }

  force.initialize = (_nodes: any[]) => {
    nodes = _nodes;
  };

  return force;
}
