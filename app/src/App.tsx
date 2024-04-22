import { useEffect, useRef } from 'react';
import { create } from 'aixui';
 import { TestExtension } from './extensions/TestExtension';
import type { IContext } from '../../src';
import { Context } from '../../src/client/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useDynamic from 'aixui/esm/client/hooks/useDynamic';
//import { Outlet } from '../../src/client/container';

  function Outlet() {
	const Workbench = useDynamic('layout');
	return <>{Workbench}</>;
}
const queryClient = new QueryClient()

 const Container=function({ value }: { value: IContext }) {
	return (

			<QueryClientProvider client={queryClient}>
	<Outlet/>
			</QueryClientProvider>

	);
}
const instance = create({
	extensions: [TestExtension],
	defaultLocale: 'zh-CN',
});
export default function App() {
    const container = useRef<HTMLDivElement>(null);
    useEffect(() => {
        instance.render(container.current);

        return () => {
            instance.dispose();
        };
    }, []);
    return (<div ref={container} />);
}
