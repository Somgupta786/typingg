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
export const theme2 = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#F6F6F6", // Change this to your desired focused color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#F6F6F6", // Change this to your desired hover color
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4F4F4F", // Change this to your desired default color
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#F6F6F6", // Change this to your desired text color
          fontSize: "20px", // Change this to your desired font size
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#F6F6F6", // Change this to your desired label color
          "&.Mui-focused": {
            color: "#F6F6F6", // Change this to your desired focused label color
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#4F4F4F",
          "&.Mui-checked": {
            color: "#4F4F4F",
          },
          "& .MuiCheckbox-root": {
            borderColor: "#4F4F4F",
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
