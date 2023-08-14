import {
    Dropdown,
    IDropdown,
    IDropdownOption,
    IDropdownProps,
    IDropdownStyleProps,
    IDropdownStyles,
    IDropdownSubComponentStyles,
    TooltipHost,
    TooltipOverflowMode
} from "@fluentui/react";
import "./DropDown.scss";
import React from "react";

// interface IIDropdownProps<T> extends IDropdownProps {
//     alwaysShowTooltip?: boolean;
//     options: (IDropdownOption & T)[];
//     onChange?: (event: React.FormEvent<HTMLDivElement>, option?: (IDropdownOption & T), index?: number) => void;
//     placeholder?: string;
//     ref?: any;
//     timeDropdown?: any
// }

interface IIDropdownOption extends IDropdownOption {

}

interface IIDropdownStyleProps extends IDropdownStyleProps { }

interface IIDropdownStyles extends IDropdownStyles { }

interface IIDropdownSubComponentStyles extends IDropdownSubComponentStyles { }

interface IIDropdown extends IDropdown { }

class DropdownView extends React.Component<IDropdownProps> {

    constructor(props: IDropdownProps) {
        super(props);
    }

    private onRenderOption = (option: IDropdownOption): JSX.Element => {
        const { key, text, data } = option;
        return (<div className={`dropdown-option-item`}>
            <TooltipHost
                key={key}
                content={data.title || text}
                overflowMode={ TooltipOverflowMode.Parent}
                closeDelay={100}
            >
                <div className="dropdown-option-item">
                    <span className="common-shortdisplay">{text}</span>
                </div>
            </TooltipHost>
        </div>);
    };

    public render(): JSX.Element {
        const {
            placeholder,
            selectedKey,
            selectedKeys,
            className,
            disabled,
            multiSelect,
            options,
            calloutProps
        } = this.props;
        let seletedItem: IIDropdownOption | undefined;
        const seletedItems: IIDropdownOption[] = [];
        options.forEach((option) => {
            if (multiSelect) {
                selectedKeys!.forEach((selectedOptionKey) => {
                    if (selectedOptionKey === option.key) {
                        seletedItems.push(option);
                    }
                });
            } else {
                if (option.key === selectedKey) {
                    seletedItem = option;
                }
            }
        });
        const dropdownTitle: string = multiSelect
            ? seletedItems.map((option) => option.text).join(", ")
            : seletedItem ? seletedItem.text : "";
        const CommonDropdownStyles = {
            label: {
                paddingBottom: 8
            }
        }
        return (<Dropdown
            {...this.props}
            styles={Object.assign(this.props.styles || {}, CommonDropdownStyles)}
            title={dropdownTitle}
            options={this.getOptions()}
            calloutProps={{ className: `ms - Callout - main ${calloutProps?.className || ""}` }
            }
            placeholder = { placeholder || "Chọn một giá trị"}
            selectedKey = { selectedKey }
            className = {`${disabled ? "common-dropdown-disabled" : "common-dropdown"} ${className} ${this.props.errorMessage ? "common-error-border" : ""}`}
            // onRenderCaretDown = { this.props.timeDropdown ? this.props.onRenderCaretDown : () => <Icon iconName="fas-caret-down" /> }
            // onRenderOption = { this.onRenderOption }
        />);
    }

    private getOptions = (): IIDropdownOption[] => {
    return this.props.options.map(item => {
        return {
            ...item,
            data: { title: item.title },
            title: ''
        }
    });
}
}

export {
    DropdownView as Dropdown,
    // IIDropdownProps as IDropdownProps,
    // IIDropdownOption as IDropdownOption,
    // IIDropdownStyleProps as IDropdownStyleProps,
    // IIDropdownStyles as IDropdownStyles,
    // IIDropdownSubComponentStyles as IDropdownSubComponentStyles,
    // IIDropdown as IDropdown,
};