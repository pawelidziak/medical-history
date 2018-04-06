export interface IncidentModel {
  incidentId?: string;
  userId: string;
  name: string;
  positionOnList: number;
  eventsCount?: number;
}
