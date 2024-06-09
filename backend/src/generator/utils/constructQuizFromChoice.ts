import { UsernamePasswordCredential } from "@azure/identity";
import { repl } from "@nestjs/core";

function safe(choice:any):boolean{
    return choice.hate=="safe" && choice.self_harm=="safe" && choice.sexual=="safe" && choice.violence=="safe";
}

function formattedQuestions(questions:Array<any>):boolean{
    if(questions.length<=0) return false;
    
    let firstLen=questions[0].answers.length;
    for (let i=0; i<questions.length; i++){
        if(questions[i].answers.length!=firstLen) return false;
        if(questions[i].correctAnswer<0 || questions[i].correctAnswer>=questions[i].answers.length)return false;
    }

    return true;
}

export function constructQuestionsFromChoice(choice:any):Array<any>{ 
    if(safe(choice.content_filter_results)) throw new Error('content not safe');
    const quizMessageWithoutNewLines = choice.message.content.replace(/\n/g, "");
    if(choice.message.content=="NA") throw new Error('topic dont make sense');
    const questions = quizMessageWithoutNewLines.split(/\d+\.\s/).filter(Boolean).map(question => question.replace(/^\s+/,""));
    const finalQuestions=[]
    for(let i=0; i<questions.length;i++) {
        let answers=questions[i].split(/[a-z]\) /).filter(Boolean);
        let correctAnswerSplit=answers[answers.length-1].split(/CA\) /).filter(Boolean);
        let correctAnswer=correctAnswerSplit[correctAnswerSplit.length-1];
        correctAnswer.replace(/CA\) /,"");
        answers.map(question => question.replace(/[a-z]\) /));
        let finalAnswers=[...answers.slice(1,-1),correctAnswerSplit[0]];
        const AsciiA = 'a'.charCodeAt(0);
        let characterAnswer=correctAnswer.charAt(0);
        const AsciiSol = characterAnswer.charCodeAt(0);
        let posCorrectAnswer=AsciiSol-AsciiA;
        let actualFinalQuestion={
            question: answers[0],
            answers: finalAnswers,
            userAnswer: null,
            correctAnswer: posCorrectAnswer
        };
        finalQuestions.push(actualFinalQuestion);
    }
    
    if(!formattedQuestions(finalQuestions)) throw new Error('something went wrong while formatting the quiz');
    
    return finalQuestions;
  
}