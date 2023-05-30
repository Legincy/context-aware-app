export const isEqual = (objectA: any, objectB: any) => {
    return JSON.stringify(objectA) === JSON.stringify(objectB);
};
