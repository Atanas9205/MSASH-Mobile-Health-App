export type SymptomType =
  | 'emotional_state'
  | 'pain_level'
  | 'body_instability'
  | 'headache'
  | 'vision_impairment'
  | 'other';

export interface SymptomRecord {
  id: string;
  user_id: string;
  symptom_type: SymptomType;
  severity: number;
  notes: string;
  recorded_at: string;
  created_at: string;
}

export interface SymptomModule {
  id: SymptomType;
  title: string;
  titleBg: string;
  icon: string;
  color: string;
  description: string;
}
