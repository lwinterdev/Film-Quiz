import { shuffleArray } from "./Utils";

export type Question = {
    category: string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string;
    type:string
}

export type QuestionState = Question & {answers: string[]}

export const fetchQuizQuestions = async (amount: number, difficulty: any): Promise<QuestionState[]>=> {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=11&difficulty=${difficulty}`; 
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([question.correct_answer,...question.incorrect_answers])
    }))
  };