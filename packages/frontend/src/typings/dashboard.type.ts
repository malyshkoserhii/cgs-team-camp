export type DashboardType = {
	id: number;
	name: string;
	descr: string | null;
	date: Date;
	private: boolean;
	ownername: string;
};

interface SortingTypes {
	sort: 'ab' | 'ba' | 'date';
}

export type DashboardFindingType = {
	sortType?: SortingTypes;
	findField: string;
};
export type DashboardCreateType = {
	date?: Date;
	descr?: string | null;
	name: string;
	ownername: string;
	private: boolean;
};
export type DashboardUpdateType = Partial<DashboardCreateType> & { id: number };
