export type ScheduleRow = {
  id: "mon_fri" | "sat" | "sun";
  dayKey: string;
  hoursKey: string;
};

export const HOURS: readonly ScheduleRow[] = [
  { id: "mon_fri", dayKey: "availability.row.mon_fri.day", hoursKey: "availability.row.mon_fri.hours" },
  { id: "sat",     dayKey: "availability.row.sat.day",     hoursKey: "availability.row.sat.hours"     },
  { id: "sun",     dayKey: "availability.row.sun.day",     hoursKey: "availability.row.sun.hours"     },
] as const;

export const APPOINTMENT_MAILTO =
  "mailto:cvo@app.com?subject=Appointment%20Request%20%E2%80%94%20APP%20Consultancy";
