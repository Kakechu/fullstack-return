import { JSX } from "react";

const Notification = ({
  message,
}: {
  message: string | null;
}): JSX.Element | null => {
  if (message === null) {
    return null;
  }
  return <div style={{ color: "red" }}>{message}</div>;
};

export default Notification;
