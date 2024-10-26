import dayjs from "dayjs";

export const FromNow = ({ date }: { date?: string }) => {
  return <>{dayjs(date).fromNow()}</>;
};
