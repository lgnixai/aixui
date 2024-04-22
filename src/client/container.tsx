import type { IContext } from 'mo/types';

import useDynamic from './hooks/useDynamic';
import { Context } from './context';
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
export  function Outlet() {
    const Workbench = useDynamic('layout');
    return <>{Workbench}</>;
}



export default function Container({ value }: { value: IContext }) {
    return (
        <Context.Provider value={value}>
			<MantineProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
            <Outlet />
			</QueryClientProvider>
			</MantineProvider>
        </Context.Provider>
    );
}
