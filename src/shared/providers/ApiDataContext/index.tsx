import React from "react";
import { useRouter } from "next/router";
type GetServerData = <S>() => S;
const ServerDataCtx = React.createContext<{
  getData: GetServerData;
  updateData<S = { [key: string]: any }>(updater: (data: S) => S): void;
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

export const useUpdateServerData = () => {
  const { updateData } = useServerCtx();

  return updateData;
};

export const ServerDataProvider: React.FC<{
  data: { [Key: string]: any };
}> = React.memo((props) => {
  const [io, setIo] = React.useState(false);
  const { data = {} } = props;
  const dataRef = React.useRef(Object.freeze(data));
  const { asPath } = useRouter();
  const asPathRef = React.useRef(asPath);
  if (asPath !== asPathRef.current) {
    // if it's a new page route, we should use data from props
    dataRef.current = Object.freeze(data);
    asPathRef.current = asPath;
  }

  const ctxValue = React.useMemo(() => {
    const getData = <S,>() => dataRef.current as S;
    const updateData = (updater: (data: any) => any) => {
      const newData = updater(dataRef.current);
      dataRef.current = Object.freeze(newData);
      setIo(!io);
    };
    return { getData, updateData };
  }, [io]);

  return (
    <ServerDataCtx.Provider value={ctxValue}>
      {props.children}
    </ServerDataCtx.Provider>
  );
});
