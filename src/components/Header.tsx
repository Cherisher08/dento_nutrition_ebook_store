import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomButton from "./CustomButton";

const Header: React.FC = () => {
  return (
    <AppBar position="static" className="bg-white shadow-md">
      <Toolbar className="flex justify-between items-center">
        <Typography variant="h6" component="div" className="text-gray-800 font-bold">
          Dento Nutrition
        </Typography>
        <Box className="flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="text-gray-400" />
            </div>
            <InputBase
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Box>
        <CustomButton variant="outlined" className="ml-4">
          Admin Login
        </CustomButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
