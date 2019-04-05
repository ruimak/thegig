import React from "react";
import { logout } from "../../api";
import Button from "@material-ui/core/Button";

//This is the Logout component, a simple button that you can press and immediately log out.

const LogOut = props => {
  return (
    <div>
      <Button
        onClick={logout}
        variant="extendedFab"
        color="primary"
        style={{ marginTop: "4%" }}
      >
        {"See you later!"}
      </Button>
    </div>
  );
};

export default LogOut;
