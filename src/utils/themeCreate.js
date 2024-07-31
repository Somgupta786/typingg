import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // Change this to your desired focused color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // Change this to your desired hover color
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // Change this to your desired default color
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "white", // Change this to your desired text color
          fontSize: "20px", // Change this to your desired font size
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white", // Change this to your desired label color
          "&.Mui-focused": {
            color: "white", // Change this to your desired focused label color
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "white",
          "&.Mui-checked": {
            color: "white",
          },
          "& .MuiCheckbox-root": {
            borderColor: "white",
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          '& .MuiFormControlLabel-asterisk': {
            display: 'none', // Hide the asterisk
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          display: "none", // Hide the asterisk globally for all required fields
        },
      },
    },
  },
});
