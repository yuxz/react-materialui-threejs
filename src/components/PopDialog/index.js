import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function PopDialog(props) {
	const {title, okText, cancelText, isOpen, onClick, children}= props;
  const [open, setOpen] = React.useState(isOpen);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

	const handlePopDialogClick = ()=>{
		setOpen(false);
		onClick();
	};
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">        
        </DialogTitle>
        <DialogContent>
          <DialogContentText>				
					{title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{return onClick()}} color="primary">
					{okText} 
          </Button>
          <Button onClick={()=>{return onClick()}} color="primary">
				  {cancelText}
          </Button >
        </DialogActions>
      </Dialog>
			{children}
    </div>
  );
}
