import { Force } from "d3-force";

export function createGlobalDriftForce(
  strength = 0.0012
): Force<any, any> {
  let nodes: any[] = [];

  function force(alpha: number) {
    // giữ alpha thấp → trôi nhẹ
    const k = Math.max(alpha, 0.02);

    for (const node of nodes) {
      if (node.x == null || node.y == null) continue;

      if (!node.__drift) {
        const angle = Math.random() * Math.PI * 2;
        node.__drift = {
          x: Math.cos(angle),
          y: Math.sin(angle),
        };
      }

      node.vx += node.__drift.x * strength * k;
      node.vy += node.__drift.y * strength * k;
    }
  }

  force.initialize = (_nodes: any[]) => {
    nodes = _nodes;
  };

  return force;
}
