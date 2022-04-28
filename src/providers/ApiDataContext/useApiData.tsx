import React from "react";
type GetInitialData = <S>(id: string, entityType: string) => S;
const InitialDataCtx = React.createContext<GetInitialData>(null as any);

export const useGetInitialData = () => {
  const getData = React.useContext(InitialDataCtx);
  return getData;
};

interface Data {
  [entity: string]: { [id: string]: any };
}

export const GetInitialDataProvider: React.FC<{
  data: Data;
}> = React.memo((props) => {
  const dataRef = React.useRef(props.data);
  dataRef.current = props.data;
  const getData = React.useCallback(<S,>(id: string, entityType: string) => {
    const entity = dataRef.current[entityType];
    return (entity ? entity[id] : undefined) as S;
  }, []);

  return (
    <InitialDataCtx.Provider value={getData}>
      {props.children}
    </InitialDataCtx.Provider>
  );
});
