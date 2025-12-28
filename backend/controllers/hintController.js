const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    Get Hint from LLM
// @route   POST /api/hint
const getHint = async (req, res) => {
    const { query, assignmentId, question } = req.body;

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_key_here') {
        console.warn("GEMINI_API_KEY is not set or is using the default placeholder.");
        return res.json({
            hint: "Hints are currently unavailable (API Key missing). Please check table schema."
        });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
            You are a helpful SQL tutor. 
            The student is trying to solve: "${question}".
            Their current query is: "${query}".
            
            Provide a short, helpful hint to guide them towards the solution. 
            Do NOT give them the full answer code. 
            Focus on concepts (e.g., "Have you checked the WHERE clause?", "Remember to order by salary").
            Keep it under 2 sentences.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ hint: text });
    } catch (error) {
        console.error("Gemini API Error (likely invalid Key or Model):", error.message);
        // Return 200 with a fallback message so the frontend doesn't break
        res.json({
            hint: "Hints are currently unavailable (AI Service Error). Try checking your query syntax or the table schema!"
        });
    }
};

module.exports = { getHint };
