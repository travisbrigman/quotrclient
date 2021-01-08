import { forwardRef, useEffect, useRef } from "react";
import { CheckBox } from "grommet";

export const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          {/* <input type="checkbox" ref={resolvedRef} {...rest} /> */}
          <CheckBox type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );