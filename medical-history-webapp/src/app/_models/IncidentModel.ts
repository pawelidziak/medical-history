export interface IncidentModel {
  incidentID?: string;
  userID: string;
  name: string;
  positionOnList: number;
  listOfEventsID: Array<string>;
}
