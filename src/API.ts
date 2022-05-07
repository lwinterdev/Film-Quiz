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

export enum Difficulty{
    EASY = "easy",
    MEDIUM = "medium",
    HARD= "hard"
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionState[]>=> {
    const endpoint = `https://opentdb.com/api.php?amount=10&category=11`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([question.correct_answer,...question.incorrect_answers])
    }))
  };