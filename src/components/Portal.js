import { createPortal } from 'react-dom';

/**
 * A component that renders its children into a separate DOM node outside the parent component.
 *
 * @typedef {object} PortalProps
 * @property {React.ReactNode} children - The children to render within the portal.
 * @property {HTMLElement} [container=document.body] - The DOM element to which the children will be appended.
 *
 * @param {PortalProps} props - The props for the Portal component.
 *
 * @returns {React.ReactPortal} - The React portal that renders the children.
 */
export default function Portal({ children, container = document.body }) {
  return createPortal(children, container);
}
