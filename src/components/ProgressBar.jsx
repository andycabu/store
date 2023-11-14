const ProgressBar = ({ progress }) => {
  return (
    <div style={{ width: "100%", backgroundColor: "#ddd" }}>
      <div
        style={{
          height: "20px",
          width: `${progress}%`,
          backgroundColor: "blue",
        }}
      ></div>
    </div>
  );
};
export default ProgressBar;
