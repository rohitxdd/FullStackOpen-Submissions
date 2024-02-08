import { useNotificationContent } from "../context/notificationContext"

const Notification = () => {
  const notificationContent = useNotificationContent()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  // if (false) return null

  return (
    <>
      {notificationContent && <div style={style}>
        <h5 style={{ padding: "0px", margin: "0px" }}>{notificationContent}</h5>
      </div>}
    </>


  )
}

export default Notification
