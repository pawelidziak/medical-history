export interface UserModel {
  full_name: string;
  birthday: string;
  gender: string;
  address: string;
  telephone: number;
  weight: number;
  height: number;
  waist: number;
  hip: number;
  visits_list?: Array<string>;
}
