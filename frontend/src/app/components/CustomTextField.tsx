import { TextField, TextFieldProps } from '@mui/material';

export default function CustomTextField(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      sx={{
        width: 350,
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: '#247d08ff' },
          '&:hover fieldset': { borderColor: '#247d08ff' },
          '&.Mui-focused fieldset': { borderColor: '#247d08ff' },
        },
      }}
    />
  );
}
