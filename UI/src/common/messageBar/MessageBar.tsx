import React, {useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import './MessageBar.scss'
import Slide, {SlideProps} from '@mui/material/Slide';
import {useStateValue} from '../../context/StateProvider';
import {actionType} from '../../context/Reducer';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
}
// interface IMessageBarProps {
//     message: string
//     status: MessageBarStatus
//     open: boolean
// }


// export interface IMessageBar {
//     open: () => void;
// }

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MessageBar() {
    const [stateFromContext, dispatch] = useStateValue();
    // const [open, setOpen] = React.useState<boolean>();
    const [transition, setTransition] = React.useState<
        React.ComponentType<TransitionProps> | undefined
    >(undefined);
    // useEffect(() => {
    //     setOpen(props.open)
    // }, [props.open])


    useEffect(() => {
        handleClick(TransitionLeft)
    })
    const handleClick = (Transition: React.ComponentType<TransitionProps>) => {
        setTransition(() => Transition);
    };
    // useImperativeHandle(ref, () => ({
    //     open: () => {
    //         handleClick(TransitionLeft);
    //         setOpen(true);
    //     }
    // }))

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({type:actionType.SET_MESSAGE_BAR, messageBar: {isOpen:false}})
    };
    
    return (
        <Snackbar open={stateFromContext.messageBar.isOpen} onClose={handleClose} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} sx={{ top: '145px' }} TransitionComponent={transition} key={transition ? transition.name : ''}
        >
            <Alert onClose={handleClose} severity={stateFromContext.messageBar.status} sx={{ width: '100%' }}>
                {stateFromContext.messageBar.text}
            </Alert>
        </Snackbar>
    );
}

