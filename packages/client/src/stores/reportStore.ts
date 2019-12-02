import { observable, action } from 'mobx';

export class ReportStore {
	@observable
	theme = 'light';

	@action
	setTheme(newTheme: string) {
		this.theme = newTheme;
	}
}
