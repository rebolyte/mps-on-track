import React, { FC, useState } from 'react';
import { configure } from 'mobx';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

import { GradRequirements } from './screens';
import { useOnMount } from './utilities';
import api from './api';

// don't allow state modifications outside actions
configure({ enforceActions: 'observed' });

const App: FC = () => {
	const [hasToken, setHasToken] = useState(false);

	const isProd = process.env.APP_ENV && /^prod/i.test(process.env.APP_ENV);

	useOnMount(() => {
		const token = new URLSearchParams(window.location.search).get('token');

		if (token !== null) {
			api.setBearerToken(token);
			setHasToken(true);
		}
	});

	if (!hasToken) {
		return <div>Unauthorized</div>;
	}

	return (
		<div className="bg-gray-200 flex flex-col min-h-full min-w-lg">
			<div className="container mx-auto flex-1 px-2 md:px-8 mt-4">
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

			{!isProd && (
				<footer className="bg-gray-800 mt-4 px-2">
					<code className="text-white mr-4">
						Env: {process.env.APP_ENV} ({process.env.COMMIT_HASH})
					</code>
				</footer>
			)}
		</div>
	);
};

export default App;
