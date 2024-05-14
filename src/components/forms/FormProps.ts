export interface FormObjectProps<T> {
    object?: T,
    onCreate?: (value: T) => void;
}
