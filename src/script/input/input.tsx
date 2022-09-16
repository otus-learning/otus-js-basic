import React, { useState } from "react";

type InputProps = {
  type: string;
  onchg: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export class Input extends React.Component<InputProps> {
  render() {
    return <input value={this.props.type} onChange={this.props.onchg} />;
  }
}
