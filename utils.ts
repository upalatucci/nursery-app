import { add, format } from "date-fns";

export const formatDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

export const convertToDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-");
  return new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10)
  );
};

export const shiftDate = (baseDate: Date, index: number): string => {
  const data = format(
    add(baseDate, { hours: 5, minutes: index * 35 }),
    "HH:mm"
  );
  return data;
};
