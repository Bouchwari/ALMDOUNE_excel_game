export type ExerciseType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'drag_drop'
  | 'excel_grid'
  | 'true_false';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  hint?: string;
  explanation?: string;

  // multiple_choice & true_false
  options?: string[];
  correctIndex?: number;

  // fill_blank
  correctAnswer?: string;
  placeholder?: string;

  // drag_drop
  parts?: string[];
  correctOrder?: number[];

  // excel_grid
  gridData?: string[][];
  correctCell?: { row: number; col: number };
  correctCellValue?: string;
  gridInstruction?: string;
}
