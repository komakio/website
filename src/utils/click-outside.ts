import { MutableRefObject, useRef, useEffect } from 'react';

export function useOnClickOutsideWithRef<T>(
  callback: () => void,
  nodeRef: MutableRefObject<T>,
  additionalPreventClick?: MutableRefObject<any>
) {
  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (
        !nodeRef.current ||
        (nodeRef.current as any).contains(event.target as Node) ||
        (additionalPreventClick &&
          additionalPreventClick.current &&
          (additionalPreventClick.current as any).contains(
            event.target as Node
          ))
      ) {
        return;
      }
      callback();
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [additionalPreventClick, callback, nodeRef]);

  return nodeRef;
}

export function useOnClickOutside<T>(callback: () => void) {
  const nodeRef = useRef<T>();
  return useOnClickOutsideWithRef<T>(callback, nodeRef);
}
