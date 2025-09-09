export interface Transcript {
  id?: number;
  created_at?: string;
  original_json:
    | string
    | {
        ts: string;
        speaker: string;
        text: string;
      }[];
  summary?: string;
  sentiment?: {
    score: string;
    reason: string;
  };
  action_items?: {
    owner: string;
    task: string;
    ts: string;
  }[];
}

export interface RequestCreateTranscript {
  transcript: {
    ts: string;
    speaker: string;
    text: string;
  }[];
}
