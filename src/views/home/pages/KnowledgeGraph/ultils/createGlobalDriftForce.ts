import { Force } from "d3-force";

export function createGlobalDriftForce(
  strength = 0.02,
  noise = 0.6
): Force<any, any> {
  let nodes: any[] = [];

  function force(alpha: number) {
    alpha = Math.max(alpha, 0.02);

    for (const node of nodes) {
      if (node.x == null || node.y == null) continue;

      // mỗi node có hướng riêng, ổn định
      if (!node.__drift) {
        node.__drift = {
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 3
        };
      }

      // dao động nhẹ
      node.__drift.x += (Math.random() - 0.5) * noise;
      node.__drift.y += (Math.random() - 0.5) * noise;

      // giới hạn hướng
      const len = Math.hypot(node.__drift.x, node.__drift.y) || 1;
      node.__drift.x /= len;
      node.__drift.y /= len;

      node.vx += node.__drift.x * strength * alpha * 60;
      node.vy += node.__drift.y * strength * alpha * 60;
    }
  }

  force.initialize = (_nodes: any[]) => {
    nodes = _nodes;
  };

  return force;
}
