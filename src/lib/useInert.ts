import { useEffect, useRef } from 'react';

/** Makes an off-screen panel (closed drawer/menu) inert: unfocusable and hidden from assistive tech. */
export function useInert<T extends HTMLElement>(inactive: boolean) {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current?.toggleAttribute('inert', inactive);
  }, [inactive]);
  return ref;
}
