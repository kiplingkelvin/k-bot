import { ChatCompletionRequestMessageRoleEnum } from "openai-edge";

export interface Message {
    role: ChatCompletionRequestMessageRoleEnum;
    content: string;
  }