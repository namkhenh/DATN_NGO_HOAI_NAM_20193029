import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import SubmitButton from '../button/SubmitButton';
import CloseIcon from '@mui/icons-material/Close';
import './Dialog.scss'
import {ButtonVariantType, LoadingPosition} from '../../model/enum/buttonEnum';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IDialogProps {
  id?: string;
  className?: string;
  hidden: boolean;
  title: string;
  scroller?: string;
  message?: string;
  customContent?: JSX.Element;
  isIndependentDialogFooter?: boolean;
  closeButtonText?: string;
  close: () => void;
  closeWithPromise?: () => Promise<any>;
  confirmButtonText?: string;
  confirm?: () => void;
  confirmWithPromise?: () => Promise<any>;
  disableConfirmButton?: boolean;
  loading?: boolean;
  startIcon?: JSX.Element
}
export default class DialogView extends React.Component<IDialogProps> {
  // constructor(props: IDialogProps) {
  //     super(props);
  // }

  public render(): JSX.Element {
    const {
      id,
      className,
      scroller,
      hidden,
      message,
      customContent,
      title,
      isIndependentDialogFooter,
      closeButtonText,
      close,
      closeWithPromise,
      confirmButtonText,
      confirm,
      confirmWithPromise,
      disableConfirmButton,
      loading,
    } = this.props;

    return (
      <div>
        <Dialog
          id={id}
          className={className}
          open={!hidden}
          scroll={scroller ? (scroller === 'body' ? 'body' : 'paper') : undefined}
          TransitionComponent={Transition}
          keepMounted
          onClose={close}
          aria-describedby="alert-dialog-slide-description"
        // fullWidth={true}
        >
          <DialogTitle>
            {title}
            <Button onClick={close} variant={ButtonVariantType.Text} sx={{ width: '24px', height: '24px' }}><CloseIcon sx={{ fontSize: '24px' }} /></Button>
          </DialogTitle>
          {message &&
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {message}
              </DialogContentText>
            </DialogContent>
          }
          {customContent ? customContent : null}
          {isIndependentDialogFooter ? null :
            <DialogActions>
              {!!closeWithPromise ? <SubmitButton
                id={`common-dialog-default-${id}`}
                text={closeButtonText || 'Thoát'}
                buttonVariantType={ButtonVariantType.Outlined}
                promise={closeWithPromise}
                loading={loading}
                loadingPosition={LoadingPosition.Center}
              /> : <Button variant={ButtonVariantType.Outlined} onClick={close} className="common-dialog-default">{closeButtonText || 'Thoát'}</Button>
              }
              {confirmWithPromise ? <SubmitButton
                id={`common-dialog-primary-${id}`}
                text={confirmButtonText || 'Đồng ý'}
                buttonVariantType={ButtonVariantType.Contained}
                promise={confirmWithPromise}
                loading={loading}
                loadingPosition={LoadingPosition.Center}
              /> : null
              }
              {confirm ?
                <Button
                  disabled={disableConfirmButton}
                  className="common-dialog-primary"
                  variant={ButtonVariantType.Contained}
                  onClick={confirm}
                >
                  {confirmButtonText || 'Đồng ý'}
                </Button> : null
              }
            </DialogActions>
          }
        </Dialog>
      </div>
    );
  }
}