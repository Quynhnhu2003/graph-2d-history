import { DOMAIN_POS } from "../../../utils/constants";
import type {Node} from '../../../utils/types/graph'

export function seedInitialPositions(nodes: Node[]) {
    nodes.forEach((node) => {
      const base = DOMAIN_POS[node.domain];
      if (!base) return;
  
      const r =
        node.level === 1 ? 0 :
        node.level === 2 ? 260 :
        460;
  
      const a = Math.random() * Math.PI * 2;
  
      node.x = base.x + Math.cos(a) * r + (Math.random() - 0.5) * 200;
      node.y = base.y + Math.sin(a) * r + (Math.random() - 0.5) * 200;
    });
  }
  