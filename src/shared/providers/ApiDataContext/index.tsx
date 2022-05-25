import React from "react";

const ServerDataCtx = React.createContext<{
  [key: string]: any;
}>({});

export const useServerCtx = () => {
  const serverCtx = React.useContext(ServerDataCtx);
  return serverCtx;
};

export const useServerData = <R, S = any>(selector: (state: S) => R) => {
  const data = useServerCtx();
  const value = selector(data as S);
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

  return (
    <ServerDataCtx.Provider value={data}>
      {props.children}
    </ServerDataCtx.Provider>
  );
});
