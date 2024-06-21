const LoadingScreen = (props) => {
  return (
    <div className="select-none font-bungee flex justify-center items-center bg-blue-200 bg-opacity-50 w-screen  h-screen  text-lg md:text-xl font-semibold text-blue-900 p-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {props.message}
    </div>
  );
};
export default LoadingScreen;
