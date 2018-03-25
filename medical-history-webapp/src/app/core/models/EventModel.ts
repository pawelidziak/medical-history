export interface EventModel {
  eventId?: string;
  incidentId?: string;
  userId: string;
  title: string;
  desc: string;
  date: Date;
  type: {name: string, color: string};
  incidentName: string;
}
