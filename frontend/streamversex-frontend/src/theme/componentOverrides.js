const componentOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        minHeight: 44,
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      variant: "outlined",
      fullWidth: true,
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
};

export default componentOverrides;