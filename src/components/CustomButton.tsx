import React from "react";
import { Button, type ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CustomButtonProps extends ButtonProps {
  variant?: "contained" | "outlined" | "text";
}

const StyledButton = styled(Button)<CustomButtonProps>(({ theme, variant }) => ({
  backgroundColor: variant === "contained" ? theme.palette.primary.main : "transparent",
  color: variant === "contained" ? theme.palette.primary.contrastText : theme.palette.primary.main,
  border: variant === "outlined" ? `1px solid ${theme.palette.primary.main}` : "none",
  "&:hover": {
    backgroundColor:
      variant === "contained" ? theme.palette.primary.dark : theme.palette.action.hover,
  },
  padding: "8px 16px",
  borderRadius: "4px",
  textTransform: "none",
}));

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default CustomButton;
