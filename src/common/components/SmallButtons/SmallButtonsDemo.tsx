import React from "react";
import {SuperSmallButton} from "./SuperSmallButton/SuperSmallButton";

export const SmallButtonsDemo = () => {
    const showalert = () => {
       alert("aaa")
    }
  return<>
      <hr/>
      <h3>Small Buttons</h3>
      <div>
          <SuperSmallButton onClick={showalert} learn />
          <SuperSmallButton onClick={showalert} edit />
          <SuperSmallButton onClick={showalert} delet />
          <SuperSmallButton onClick={showalert} filter />
      </div>
      <div>
          <SuperSmallButton onClick={showalert} disabled learn />
          <SuperSmallButton onClick={showalert} disabled edit />
          <SuperSmallButton onClick={showalert} disabled delet />
          <SuperSmallButton onClick={showalert} disabled filter />
      </div>
      </>
}