import { forwardRef, useEffect, useRef } from "react";
import { CheckBox } from "grommet";

// checkbox for React-Table

export const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <CheckBox type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );