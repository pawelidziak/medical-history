export interface EventModel {
  eventID?: string;
  title: string;
  desc: string;
  date: Date;
  type: {name: string, color: string};
}
