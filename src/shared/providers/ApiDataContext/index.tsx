import React from "react";
import { useRouter } from "next/router";
type GetServerData = <S>() => S;
const ServerDataCtx = React.createContext<{
  getData: GetServerData;
  // updateData<S = { [key: string]: any }>(updater: (data: S) => S): void;
}>(null as any);

export const useServerCtx = () => {
  const serverCtx = React.useContext(ServerDataCtx);
  return serverCtx;
};

export const useServerData = <R, S = any>(selector: (state: S) => R) => {
  const { getData } = useServerCtx();
  const data = getData<S>();
  const value = selector(data);
  return value;
};

// export const useUpdateServerData = () => {
//   const { updateData } = useServerCtx();

//   return updateData;
// };

export const ServerDataProvider: React.FC<{
  data: { [Key: string]: any };
}> = React.memo((props) => {
  const { data = {} } = props;

  const ctxValue = React.useMemo(() => {
    const getData = <S,>() => data as S; // dataRef.current as S;
    return { getData };
  }, [data]);

  return (
    <ServerDataCtx.Provider value={ctxValue}>
      {props.children}
    </ServerDataCtx.Provider>
  );
});
