export interface CardType {
  success: boolean;
  data: CardData;
}

export interface CardData {
  _id: string;
  createdAt: Date;
  type: string;
  category: string;
  resolution: string;
  timeNeeded: number;
  ngo: Ngo;
  title: string;
  donateReceived: number;
  totalSupporters: number;
  questionsFormat: QuestionsFormat;
  questionsValues: QuestionsValues;
}

export interface Ngo {
  _id: string;
  name: string;
  logo: string;
  state: string;
  country: string;
  social: Social;
  website: string;
  files: { [key: string]: boolean };
}

export interface Social {
  youtube: string;
  facebook: string;
  instagram: string;
}

export interface QuestionsFormat {
  _id: string;
  title: string;
  logo: string;
  category: string;
  gigType: string;
  creditRequired: number;
  desc: string;
  questions: Question[];
  timeNeeded: number;
}

export interface Question {
  id?: number;
  title: string;
  volunteerTitle?: string;
  show?: boolean;
  desc: string;
  note: string;
  url: string;
  key: string;
  mutli: boolean;
  isPopulate: boolean;
  populatePath: string;
  type: string;
  inputType: string;
  displayType?: string;
  minLength?: number;
  maxLength?: number;
  options: any[];
  placeholder?: string;
  template: number;
  isRequired: boolean;
  isQuestion: boolean;
  stepTitle?: string;
  subQuestions?: Question[];
  subQGroupIndex?: number;
  // condition?: Condition;
}

// export interface Condition {}

export interface QuestionsValues {
  fundraiserTitle: string;
  deliverable: string;
  amount: number;
  fundraiserPhoto: string;
  fundraiserVideo: string;
  isFeatured: boolean;
  contactPerson: string;
  contactNumber: string;
  needId: string;
  needTitle: string;
}


//Extend and Fulfilled card