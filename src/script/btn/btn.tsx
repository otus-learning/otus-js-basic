import React, { useState } from "react";

type BtnProps = {
  name: string;
  onclck: () => void;
};

export class Btn extends React.Component<BtnProps> {
  render() {
    return (
      <>
        <button onClick={this.props.onclck}>{this.props.name}</button>
        <br />
      </>
    );
  }
}
