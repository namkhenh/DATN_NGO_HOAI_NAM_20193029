import React from "react";
import {
    DatePicker,
    IDatePicker,
    IDatePickerProps,
    IDatePickerStrings,
    IDatePickerStyleProps,
    IDatePickerStyles,
} from "@fluentui/react";
import "./DatePicker.scss";

interface IIDatePickerProps extends IDatePickerProps {
}

interface IIDatePicker extends IDatePicker { }

interface IIDatePickerStrings extends IDatePickerStrings { }

interface IIDatePickerStyleProps extends IDatePickerStyleProps { }

interface IIDatePickerStyles extends IDatePickerStyles { }

class DatePickerView extends React.Component<IIDatePickerProps> {
    constructor(props: IIDatePickerProps) {
        super(props);
    }

    public render(): JSX.Element {
        const { disabled, className } = this.props
        return (<DatePicker
            {...this.props}
            className={`${disabled ? "common-dropdown-disabled" : "common-dropdown"} ${className}`}
        />);
    }
}

export {
    DatePickerView as DatePicker,
    // IIDatePickerProps as IDatePickerProps,
    // IIDatePicker as IDatePicker,
    // IIDatePickerStrings as IDatePickerStrings,
    // IIDatePickerStyleProps as IDatePickerStyleProps,
    // IIDatePickerStyles as IDatePickerStyles,
};