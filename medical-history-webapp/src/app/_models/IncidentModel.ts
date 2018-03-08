export class OccurrenceModel {
  constructor(public name: string, public UID?: string) {
  }
}

export interface IncidentModel {
  list: Array<string>;
}
