import { RotatingLines } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}

export default Loading;
