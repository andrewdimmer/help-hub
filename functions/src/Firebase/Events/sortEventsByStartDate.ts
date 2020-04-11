import { EventData } from "./eventTypes";

export const sortEventsByStartDate = (events: EventData[]): EventData[] => {
  if (events.length <= 1) {
    return events;
  }
  const leftArray = sortEventsByStartDate(events.slice(0, events.length / 2));
  const rightArray = sortEventsByStartDate(events.slice(events.length / 2));
  let sortedArray: EventData[] = [];
  while (leftArray.length > 0 && rightArray.length > 0) {
    if (
      new Date(`${leftArray[0].startDate} ${leftArray[0].startTime}`) <=
      new Date(`${rightArray[0].startDate} ${rightArray[0].startTime}`)
    ) {
      const insertMe = leftArray.shift();
      if (insertMe) {
        sortedArray.push(insertMe);
      }
    } else {
      const insertMe = rightArray.shift();
      if (insertMe) {
        sortedArray.push(insertMe);
      }
    }
  }
  sortedArray = sortedArray.concat(leftArray);
  sortedArray = sortedArray.concat(rightArray);
  return sortedArray;
};
