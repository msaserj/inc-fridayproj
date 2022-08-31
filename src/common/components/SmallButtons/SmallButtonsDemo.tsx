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
          <SuperSmallButton callBack={showalert} learn />
          <SuperSmallButton callBack={showalert} edit />
          <SuperSmallButton callBack={showalert} delet />
          <SuperSmallButton callBack={showalert} filter />
      </div>
      <div>
          <SuperSmallButton callBack={showalert} disabled learn />
          <SuperSmallButton callBack={showalert} disabled edit />
          <SuperSmallButton callBack={showalert} disabled delet />
          <SuperSmallButton callBack={showalert} disabled filter />
      </div>
      </>
}