import { PropsWithChildren } from "react";

function Backdrop({ children }: PropsWithChildren) {
  return <div className="backdrop">{children}</div>;
}

export default Backdrop;
