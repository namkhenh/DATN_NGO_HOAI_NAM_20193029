import * as React from 'react';
import "./TimePicker.scss"
import {
    TimePicker,
    ITimeRange,
    Text,
    IStackTokens,
    Stack,
    IStackStyles,
    IComboBoxStyles,
    IComboBox,
    ITimePickerProps,
} from '@fluentui/react';

const stackStyles: Partial<IStackStyles> = { root: { width: 500 } };


export const TimePickerView = (props: ITimePickerProps) => {
    return (
        <TimePicker
            {...props}
            useHour12
            autoComplete='on'
            allowFreeform
            required
        />
    );
};
