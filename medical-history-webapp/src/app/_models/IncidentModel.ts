import {EventModel} from './EventModel';

export interface IncidentModel {
  incidentID?: string;
  userID: string;
  name: string;
  positionOnList: number;
  listOfEvents: Array<EventModel>;
}
