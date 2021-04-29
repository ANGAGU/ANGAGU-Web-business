import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

type TextInputProps = {
  value: number;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);
// eslint-disable-next-line consistent-return
const getContents = (caseType: number) => {
  let contents;
  if (caseType === 0) {
    contents = <TextField id="standard-basic" label="Standard" />;
  } else if (caseType === 1) {
    contents = <TextField id="filled-basic" label="Filled" variant="filled" />;
  } else {
    contents = (
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    );
  }
  return contents;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const TextInput: React.FC<TextInputProps> = ({ value }) => {
  const classes = useStyles();
  const caseType = value;
  return (
    <form className={classes.root} noValidate autoComplete="off">
      {getContents(caseType)}
    </form>
  );
};

export default TextInput;
