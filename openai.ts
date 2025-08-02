const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true,
});

export async function sendMessageToOpenAI(message: string) {
    try {
        const stream = await openai.chat.completions.create({
            frequency_penalty: 0,
            max_tokens: 1000,
            messages: [
                {
                    content: `You are a smart financial assistant that offers complete, insightful financial advice with examples, patterns, and recommendations.`,
                    role: 'system',
                },
                {
                    content: message,
                    role: 'user',
                },
            ],
            model: 'gpt-3.5-turbo',
            stream: true,
            temperature: 0.7,
            top_p: 1,
        });

        return stream;
    } catch (error) {
        console.error('OpenAI Error:', error);
        throw error;
    }
}
