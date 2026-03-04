export type Course = {
	id: number;
	name: string;
	type: 'solo' | 'group' | 'partner';
	length: number;
	instructor: string;
};

export const API_BASE_URL = 'http://localhost:3000/api' as const;
