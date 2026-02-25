import { getFromLocalStorage } from "utils/storage";

export const subscribeToBlogDownloadChannel = ({
  consumer,
  setMessage,
  setProgress,
  generatePdf,
}) => {
  const userId = getFromLocalStorage("userId");
  const blogDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "BlogDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        setMessage("Connected the Cables...");
        generatePdf();
      },
      received(data) {
        const { message, progress } = data;
        setMessage(message);
        setProgress(progress);
      },
    }
  );

  return blogDownloadSubscription;
};
