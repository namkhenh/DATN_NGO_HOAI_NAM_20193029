import * as React from 'react';
import './CommandBar.scss'
import { CommandBar, ICommandBarItemProps, ICommandBarProps } from '@fluentui/react/lib/CommandBar';
import { IButtonProps } from '@fluentui/react/lib/Button';
import { setVirtualParent } from '@fluentui/dom-utilities';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

const overflowProps: IButtonProps = { ariaLabel: 'More commands' };

export const CommandBarView = (props: ICommandBarProps) => {
    return (
        <CommandBar
            {...props}
        />
    );
};
