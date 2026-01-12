


function safe(choice: any): boolean {
    return choice.hate == "safe" && choice.self_harm == "safe" && choice.sexual == "safe" && choice.violence == "safe";
}

export function constructQuestionsFromChoice(choice: any): Array<any> {
    if (choice.content_filter_results && !safe(choice.content_filter_results)) {
        throw new Error('content not safe');
    }

    const content = choice.message.content;
    let parsedContent;

    try {
        parsedContent = JSON.parse(content);
    } catch (e) {
        // Fallback: try to find JSON object if wrapped in markdown code blocks
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                parsedContent = JSON.parse(jsonMatch[0]);
            } catch (innerE) {
                throw new Error("Failed to parse JSON response");
            }
        } else {
            throw new Error("Failed to parse JSON response");
        }
    }

    if (parsedContent.error === "NA") {
        throw new Error('topic dont make sense');
    }

    if (!parsedContent.questions || !Array.isArray(parsedContent.questions)) {
        throw new Error('Invalid JSON format: missing questions array');
    }

    return parsedContent.questions.map(q => ({
        question: q.question,
        answers: q.options,
        userAnswer: null,
        correctAnswer: q.correctAnswerIndex
    }));
}