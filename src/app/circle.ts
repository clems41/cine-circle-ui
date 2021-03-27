import { User } from "./user";

export interface Circle {
	id:       number;
	users:    User[];
	name:     string;
	description:     string;
  }