import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react';
import {ButtonColorType, ButtonSizeType, ButtonVariantType, LoadingPosition} from '../../model/enum/buttonEnum';

interface ISubmitButtonProps {
    id?: string;
    className?: string;
    key?: string;
    text?: string;
    promise?: () => Promise<any>;
    buttonVariantType: ButtonVariantType;
    disable?: boolean;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    loading?: boolean;
    size?: ButtonSizeType;
    color?: ButtonColorType;
    href?: string;
    loadingPosition?: LoadingPosition
    hidden?: boolean
    fullWidth?: boolean
}

class SubmitButton extends React.Component<ISubmitButtonProps> {
    render() {
        const { id, key, promise, buttonVariantType, disable, size, startIcon, endIcon, href, color, loading, loadingPosition, hidden, text, className, fullWidth } = this.props
        return (
            <LoadingButton
                id={id}
                className={className}
                key={key}
                onClick={promise}
                variant={buttonVariantType}
                disabled={disable}
                size={size}
                color={color}
                startIcon={startIcon}
                endIcon={endIcon}
                href={href}
                loading={loading}
                loadingPosition={loadingPosition}
                hidden={hidden}
                fullWidth={fullWidth}
            >
                {text}
            </LoadingButton>
        );
    }
}

export default SubmitButton;