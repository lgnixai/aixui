import { classNames } from 'mo/client/classNames';
import Icon from 'mo/client/components/icon';
import { useConnector } from 'mo/client/hooks';
import type { IAuxiliaryController } from 'mo/controllers/auxiliaryBar';
import { getNameForTitle, searchById, sortByIndex } from 'mo/utils';

import variables from './index.scss';

export type IAuxiliaryBarTabProps = IAuxiliaryController;

export default function AuxiliaryBarTab({ onClick }: IAuxiliaryBarTabProps) {
    const auxiliaryBar = useConnector('auxiliaryBar');
	console.log(333)
    if (!auxiliaryBar.data.length) return null;
	console.log(4444)
    const valid = auxiliaryBar.data.filter((item) => !item.hidden).sort(sortByIndex);
    const current = valid.find(searchById(auxiliaryBar.current));
    return (
        <div className={variables.container}>
			asdfasdf
             <div className={variables.tabs}>
                {valid.map(({ id, name, icon }) => (
                    <div
                        key={id}
                        className={classNames(variables.item, auxiliaryBar.current === id && variables.active)}
                        onClick={() => onClick?.(id)}
                    >
                        <Icon type={icon} title={getNameForTitle(name)}>
                            {name}
                        </Icon>
                    </div>
                ))}
            </div>
        </div>
    );
}

