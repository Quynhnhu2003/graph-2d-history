import type { Node } from "./types/graph";

export function seedInitialPositions(nodes: Node[]) {
    const jitter = (r: number) => (Math.random() - 0.5) * r;
  
    nodes.forEach((node) => {
      let baseRadius = 0;
  
      switch (node.level) {
        case 0:
          baseRadius = 1400;
          break;
        case 1:
          baseRadius = 1000;
          break;
        case 2:
          baseRadius = 650;
          break;
        default:
          baseRadius = 400;
      }
  
      const angle = Math.random() * Math.PI * 2;
  
      node.x =
        Math.cos(angle) * baseRadius +
        jitter(300);
  
      node.y =
        Math.sin(angle) * baseRadius +
        jitter(300);
    });
  }
  