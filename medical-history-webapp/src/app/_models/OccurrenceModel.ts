export class OccurrenceModel {
  constructor(public name: string, public UID?: string) {
  }
}

export interface OccurrenceModelTest {
  list: Array<string>;
}
