import React from "react";

import "../index.css";

export default class Avatar extends React.Component {
  render() {
    return (
      <div>
	<img src='/images/avatar.png' className="avatar" alt="missing a user" />
      </div>
    );
  }
}

