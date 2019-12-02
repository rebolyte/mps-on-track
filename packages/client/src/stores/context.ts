import { createContext, useContext } from 'react';
import { AppStore } from './appStore';
import { ReportStore } from './reportStore';

export const storesContext = createContext({
	appStore: new AppStore(),
	reportStore: new ReportStore()
});

export const useStores = () => useContext(storesContext);
