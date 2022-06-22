import { tValidSkeleton } from "./_interfaces";
export default function ensureDataObject(key: string, skeleton: tValidSkeleton, value: {
    [key: string]: any;
} | string): {
    [key: string]: any;
};
