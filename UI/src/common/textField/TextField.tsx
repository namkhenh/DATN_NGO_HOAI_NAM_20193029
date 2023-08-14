import {ITextFieldProps, ITextFieldStyles, TextField,} from "@fluentui/react";
import React from "react";
import "./TextField.scss";

interface IITextFieldProps extends ITextFieldProps {
    a?: string;
    unlimitedLength?: boolean;
    format?: RegExp;
    value?: string;
}

interface ITextFieldState {
    hasGetError?: boolean;
}

class TextFieldView extends React.Component<IITextFieldProps, ITextFieldState> {
    constructor(props: IITextFieldProps) {
        super(props);
        this.state = { hasGetError: false };
    }

    public render(): JSX.Element {
        const CommonTextFieldStyles: Partial<ITextFieldStyles> = {
            errorMessage: {
                color: "#D1382A"
            },
            wrapper: {
                'label': {
                    paddingBottom: 8
                }
            }
        }
        const { hasGetError } = this.state;
        const {
            className,
            disabled,
            errorMessage,
            id,
            styles,
            onGetErrorMessage
        } = this.props;
        return (<TextField
            {...this.props}
            aria-describedby={this.props["aria-describedby"]
                ? this.props["aria-describedby"]
                : `${id}-description`}
            onChange={this.onChange}
            errorMessage={errorMessage}
            onGetErrorMessage={onGetErrorMessage
                ? (value) => {
                    const error = onGetErrorMessage(value);
                    this.setState({ hasGetError: !!error });
                    return error;
                }
                : undefined
            }
            className={`${className} ${disabled ? "s-common-input-disabled" : "s-common-input"} ${(errorMessage || hasGetError) && 'common-error-border'}`}
            resizable={false}
            styles={Object.assign(styles || {}, CommonTextFieldStyles)}
        />);
    }

    private onChange: (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void =
        (event, newValue) => {
            const {
                onChange,
                value,
                format,
                onGetErrorMessage
            } = this.props;

            const onGetErrorMessageWrappedOnChange = (event: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                if (onGetErrorMessage) {
                    const error = onGetErrorMessage(newValue || '');
                    this.setState({ hasGetError: !!error });
                }
                return onChange!(event, newValue);
            }

            if (format) {
                if (format.test(newValue!.toString())) {
                    onGetErrorMessageWrappedOnChange(event, newValue);
                } else {
                    onGetErrorMessageWrappedOnChange(event, value);
                }
            } else {
                onGetErrorMessageWrappedOnChange(event, newValue);
            }
        }
}

export {
    TextFieldView as TextField,
};