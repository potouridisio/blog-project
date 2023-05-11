import { createPortal } from 'react-dom';

export default function Portal({ children, container = document.body }) {
  return createPortal(children, container);
}
