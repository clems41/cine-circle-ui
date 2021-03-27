export interface Rating {
	userId: number;
	movieId: string;
	source: string;
	value: number;
	comment: string;
	username: string;
	updatedAt: Date;
}