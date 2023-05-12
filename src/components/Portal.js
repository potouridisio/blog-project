import { createPortal } from 'react-dom';

// η Portal είναι ένα component που δέχεται δύο props:
// 1. children: τα παιδιά του component
// 2. container: το DOM element στο οποίο θα γίνει το render των παιδιών
export default function Portal({ children, container = document.body }) {
  return createPortal(children, container);
}
