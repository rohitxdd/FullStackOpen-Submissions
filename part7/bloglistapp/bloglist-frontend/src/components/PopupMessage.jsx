const PopupMessage = ({ message }) => {
  let color = message.status === "success" ? "green" : "red";
  return (
    <div
      className="popup-message"
      style={{
        border: `2px solid ${color}`,
      }}
    >
      <h2 style={{ textAlign: "center", color: color }}>{message.text}</h2>
    </div>
  );
};

export default PopupMessage;
