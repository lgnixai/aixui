import { useEffect, useRef } from 'react';
import { Display, Split } from 'mo/client/components';
import { useAutoPos, useConnector, useDynamic } from 'mo/client/hooks';
import type { ILayoutController } from 'mo/controllers/layout';
import { Toaster } from 'sonner';
import { Allotment } from "allotment";

import "allotment/dist/style.css";
import 'normalize.css';
import '../../classNames/common.css';
import variables from './index.scss';

export type IWorkbenchProps = ILayoutController;

export default function Workbench({ onSideChange, onEditorChange }: IWorkbenchProps) {
    const layout = useConnector('layout');
    const StatusBar = useDynamic('statusBar');
    const MenuBar = useDynamic('menuBar');
    const ActivityBar = useDynamic('activityBar');
    const AuxiliaryBar = useDynamic('auxiliaryBar');
    // const AuxiliaryBarTab = useDynamic('auxiliaryBarTab');
    const Sidebar = useDynamic('sidebar');
    const Panel = useDynamic('panel');
    const Editor = useDynamic('editor');
    const ContextMenu = useDynamic('contextMenu');

    const ref = useRef<HTMLElement>(null);

    const [sideRef, sidePos, sideChange] = useAutoPos<HTMLDivElement>(layout.splitPanePos);
    const [editorRef, editorPos, editorChange] = useAutoPos<HTMLDivElement>(
        layout.panel.panelMaximized ? [0, 'auto'] : layout.horizontalSplitPanePos,
        'horizontal'
    );

    useEffect(() => {
        ref.current?.focus();
    }, []);

    return (
        <main className={variables.container} tabIndex={0} ref={ref}>
            {ContextMenu}
            <Display visible={!layout.menuBar.hidden}>{MenuBar}</Display>
            <section className={variables.main}>
                <Display visible={!layout.activityBar.hidden}>{ActivityBar}</Display>
				<Allotment   defaultSizes={[170,500,150]}>
					<Allotment.Pane key="side" minSize={170} maxSize={800} visible={!layout.sidebar.hidden}>
						{Sidebar}
					</Allotment.Pane>
					<Allotment.Pane key="side2">
						<Allotment vertical>
							<Allotment.Pane minSize={150} maxSize={600}>
								{Editor}
							</Allotment.Pane>

							<Allotment.Pane visible={!layout.panel.hidden} minSize={150} maxSize={600}>
								{Panel}
							</Allotment.Pane>
						</Allotment>
					</Allotment.Pane>
					<Allotment.Pane key="side3" visible={!layout.auxiliaryBar.hidden}>
						{AuxiliaryBar}
					</Allotment.Pane>
				</Allotment>

                {/*<Split ref={sideRef} sizes={sidePos} split="vertical" onChange={sideChange(onSideChange)}>*/}
                {/*    <Split.Pane minSize={170} maxSize={800} hidden={layout.sidebar.hidden}>*/}
                {/*        {Sidebar}*/}
                {/*    </Split.Pane>*/}
                {/*    <Split.Pane>*/}
                {/*        <Split*/}
                {/*            ref={editorRef}*/}
                {/*            sizes={editorPos}*/}
                {/*            split="horizontal"*/}
                {/*            onChange={editorChange(onEditorChange)}*/}
                {/*        >*/}
                {/*            <Split.Pane minSize={150} maxSize={600}>*/}
                {/*                {Editor}*/}
                {/*            </Split.Pane>*/}
                {/*            <Split.Pane hidden={layout.panel.hidden}>{Panel}</Split.Pane>*/}
                {/*        </Split>*/}
                {/*    </Split.Pane>*/}
                {/*</Split>*/}
				{/*<Display  visible={!layout.statusBar.hidden}>1232{AuxiliaryBarTab}</Display>*/}

			</section>
            <Display visible={!layout.statusBar.hidden}>{StatusBar}</Display>
            <Toaster className={variables.toaster} expand hotkey={[]} />
        </main>
    );
}
