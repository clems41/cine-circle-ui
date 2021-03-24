import { User } from "./user";

export interface Circle {
	ID:       number;
	Users:    User[];
	Name:     string;
	Description:     string;
  }