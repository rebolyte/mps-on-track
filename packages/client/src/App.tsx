import React from 'react';
import { configure } from 'mobx';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

import { GradRequirements } from './screens';

// don't allow state modifications outside actions
configure({ enforceActions: 'observed' });

const App = () => (
	<div className="bg-gray-200 flex flex-col min-h-full min-w-lg">
		<Tabs>
			<TabList>
				<Tab>On-Track Visualization</Tab>
				<Tab>Student Grade Breakdown</Tab>
				<Tab>At a Glance</Tab>
				<Tab>Courses with Credits</Tab>
			</TabList>

			<TabPanels>
				<TabPanel>
					<div>tab 1</div>
					<GradRequirements />
				</TabPanel>
				<TabPanel>
					<div>tab 2</div>
				</TabPanel>
				<TabPanel>
					<div>tab 3</div>
				</TabPanel>
				<TabPanel>
					<div>tab 4</div>
				</TabPanel>
			</TabPanels>
		</Tabs>
	</div>
);

export default App;
