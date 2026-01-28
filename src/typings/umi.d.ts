declare module 'umi' {
	export interface InitialState {
		currentUser?: {
			family_name?: string;
			given_name?: string;
			email?: string;
			[key: string]: any;
		};
		[key: string]: any;
	}

	export function useModel(namespace?: string, selector?: (state: any) => any): any;

	export const history: any;
}
