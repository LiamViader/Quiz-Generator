

export function constructQuizPrompt(topic: string, difficulty: string, numberQuestions: number, language: string): Array<{ role: string, content: string }> {
    const systemMessage = `
You are an AI that generates a quiz from a given topic.

INPUT:
The user will provide a topic or explanation.
- If the input is nonsense or impossible to make a quiz about, respond with a JSON object: { "error": "NA" }
- If valid, generate a quiz in JSON format.

CONFIGURATION:
- Difficulty: ${difficulty}
- Number of Questions: ${numberQuestions}
- Language: ${language} (Output strictly in this language)
- If the question is technical, mix theory and problem-solving/code questions.

JSON OUTPUT FORMAT:
Return ONLY a valid JSON object with this structure:
{
  "questions": [
    {
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 0 // 0 for A, 1 for B, etc.
    }
  ]
}

Ensure the JSON is valid and contains no other text.
`;

    return [
        { role: "system", content: systemMessage.trim() },
        { role: "user", content: topic }
    ];
}