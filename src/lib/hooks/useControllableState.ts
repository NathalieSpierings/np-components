import { useCallback, useState } from "react";

/**
 * State of a component that can be controlled by its parent (`value` + `onChange`), or kept by the component itself
 * (starting from `defaultValue`) when `value` is `undefined`.
 *
 * `setValue` updates the component's own state when uncontrolled, and always calls `onChange`.
 */
export function useControllableState<T>(value: T | undefined, defaultValue: T, onChange?: (value: T) => void) {
    const [internal, setInternal] = useState(defaultValue);
    const isControlled = value !== undefined;

    const setValue = useCallback((next: T) => {
        if (!isControlled) {
            setInternal(next);
        }

        onChange?.(next);
    }, [isControlled, onChange]);

    return [isControlled ? value : internal, setValue, isControlled] as const;
}
