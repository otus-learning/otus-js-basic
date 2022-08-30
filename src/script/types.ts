export enum actions {
  sending = "SENDING",
  incoming = "INCONIMG",
  outbound = "OUTBOUND",
}

export type ChatState = {
  messages: Record<string, unknown>[];
};

export type ChatAction = {
  type: string;
  payload: object;
};
