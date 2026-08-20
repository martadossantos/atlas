export type Source = {
  id: string;
  filename: string;
  location: string; // location in the file, e.g. "Section 2.1, page 17" or "Rows 214–239"
  lastEdited: string;
  type: "internal" | "external";
  folder?: string;
  status?: "stale" | "superseded" | "conflict";
};
 
export type AnswerSegment = {
  text: string;
  citedSourceIds: string[]; // powers hover-highlight; [] = no citation for this segment
};
 
export type DemoPrompt = {
  id: string;
  question: string;
  searchedCount: number;
  noConfidentAnswer: boolean;
  segments: AnswerSegment[];
  sources: Source[];
};
 