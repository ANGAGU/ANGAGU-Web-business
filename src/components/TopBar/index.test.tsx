import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";

import TopBar from "./index";

let container:any = null;
const sideBarProps = {
  toggleSidebar : () => {} 
}
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("TopBar Page", () => {
  it("renders", () => {
    act(() => {
      render(
        <Router>
          <TopBar toggleSidebar={sideBarProps.toggleSidebar}/>
        </Router>,
        container
      );
    });
  });
});
