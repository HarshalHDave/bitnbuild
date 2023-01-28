// import React, { useState, useEffect, useContext, createContext } from "react";

// interface Spaces {
//   zones: Set<string>;
//   blocks: Set<string>;
//   racks: Set<string>;
// }
// const appContext = createContext<Spaces | null>(null);

// export function SpaceContextProvider({ children }: any) {
//   const context = useSpaceContext();
//   return <appContext.Provider value={context}>{children}</appContext.Provider>;
// }

// export const useSpaceManageContext = () => {
//   return useContext(appContext);
// };
// const Data = [
//     {
//       zone: "A",
//       block: "Aab",
//       rack: "1st",
//     },
//     {
//       zone: "B",
//       block: "Bab",
//       rack: "1st",
//     },
//     {
//       zone: "A",
//       block: "Aac",
//       rack: "2nd",
//     },
//     {
//       zone: "C",
//       block: "Cab",
//       rack: "3rd",
//     },
//   ];
// function useSpaceContext() {
//   const [zones, setzones] = useState<Set<string> | null>(null);
//   useEffect(() => {
//     const setOfZones = new Set<string>();
//     Data.forEach((val) => {
//         setOfZones.add(val.zone);
//     })
//     setzones(setOfZones);
//   }, []);
//   export{
//     zones
//   }
// }
