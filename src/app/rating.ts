export interface Rating {
	UserID: number;
	MovieID: string;
	Source: string;
	Value: number;
	Comment: string;
	Username: string;
	UpdatedAt: Date;
}