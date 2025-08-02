import React, { useEffect, useState } from 'react';
import PageHead from '@/components/common/components/PageHead';
import MainLayout from '@/components/layouts/MainLayout';
import { sendMessageToOpenAI } from '@/openai';
import Button from '@/components/common/components/Button';
import { Typography } from 'antd';
import {
    generateAIPromptBoostIncome,
    generateAIPromptBudgetHelp,
    generateAIPromptCostCutting,
    generateAIPromptFinancialRedFlags,
    generateAIPromptIncomeConsistency,
    generateAIPromptNextMonthPlan,
    generateAIPromptOverspending,
    generateAIPromptSetGoal,
} from '@/components/pageComponents/AIAssistant/prompts';
import ReactMarkdown from 'react-markdown';
import Input from '@/components/common/components/Input';

export default function AIPage() {
    const [openAISuggestion, setOpenAISuggestion] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

        setTransactions(transactions);
    }, []);

    async function handleAIRequest(userRequest: string) {
        setSubmitting(true);

        // Reset state
        setMessages([{ sender: 'user', text: userRequest }]);
        setOpenAISuggestion('');

        let prompt = '';

        const predefinedPrompts = {
            'What Can I Cut Down On?': generateAIPromptCostCutting,
            'Build a Simple Budget Plan': generateAIPromptBudgetHelp,
            'How Consistent Is My Income?': generateAIPromptIncomeConsistency,
            'Am I Overspending on Non-Essentials?': generateAIPromptOverspending,
            'Help Me Set a Financial Goal': generateAIPromptSetGoal,
            'Help Me Plan for Next Month': generateAIPromptNextMonthPlan,
            'Are There Any Financial Red Flags?': generateAIPromptFinancialRedFlags,
            'How Can I Boost My Income?': generateAIPromptBoostIncome,
            'Suggest Ways to Boost My Income': generateAIPromptBoostIncome,
        };

        // Use predefined function if matched, otherwise fallback to generic
        const promptGenerator = predefinedPrompts[userRequest];
        if (promptGenerator) {
            prompt = promptGenerator(transactions);
        } else {
            prompt = `Using the following financial transaction data (all amounts are in Nigerian Naira - ₦):\n\n${JSON.stringify(
                transactions,
                null,
                2,
            )}\n\nPlease help answer this question from the user:\n"${userRequest}". Ensure all monetary references are in ₦ (Naira), not dollars or any other currency.`;
        }

        let text = '';
        const res = await sendMessageToOpenAI(prompt);

        if (res) {
            for await (const part of res) {
                const stream = part.choices[0].delta.content;
                if (stream) {
                    text += stream;
                    setOpenAISuggestion(text);
                }
            }

            setMessages((prev) => [...prev, { sender: 'ai', text }]);
        }

        setSubmitting(false);
    }

    return (
        <MainLayout title="Ai Assistant">
            <PageHead title="Ai Assistant" />

            <div className="relative h-[85vh] border-[0.5px] border-novelgreen-10 rounded-lg">
                <div className="px-3 pt-5 bg-[#FAFAF9]  h-[70vh] overflow-y-scroll pb-10 rounded-t-lg">
                    <div className="py-2 px-4 bg-novelgreen-10 inline-block rounded-full">
                        <Typography.Text className="text-white">How can I help you today?</Typography.Text>
                    </div>

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                        >
                            <div
                                className={`px-4 py-2 rounded-xl max-w-[70%] ${
                                    msg.sender === 'user'
                                        ? 'bg-novelgreen-20 border-2 border-novelgreen-10'
                                        : 'bg-novelgreen-10 text-white'
                                }`}
                            >
                                {msg.sender === 'user' ? (
                                    <Typography.Text className={'text-novelblack-10'}>{msg.text}</Typography.Text>
                                ) : (
                                    <ReactMarkdown>{openAISuggestion}</ReactMarkdown>
                                )}
                            </div>
                        </div>
                    ))}

                    {submitting && (
                        <div className="flex justify-start mb-2">
                            <div className="px-4 py-2 bg-novelgreen-10 text-white rounded-xl max-w-[70%]">
                                <ReactMarkdown>{openAISuggestion}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 border-t p-3 bg-white rounded-b-lg">
                    <Input
                        placeholder="Ask for help around your finances"
                        className="!w-full !mb-5"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onPressEnter={() => {
                            if (userInput.trim()) {
                                handleAIRequest(userInput.trim());
                                setUserInput('');
                            }
                        }}
                    />
                    <div className="flex items-center gap-3 flex-wrap ">
                        <div
                            className="px-4 py-2 bg-novelgreen-20 rounded-full inline border-2 border-novelgreen-10 cursor-pointer"
                            onClick={() => handleAIRequest('What Can I Cut Down On?')}
                        >
                            <Typography.Text>What Can I Cut Down On?</Typography.Text>
                        </div>
                        <div
                            className="px-4 py-2 bg-novelgreen-20 rounded-full inline border-2 border-novelgreen-10 cursor-pointer"
                            onClick={() => handleAIRequest('Build a Simple Budget Plan')}
                        >
                            <Typography.Text>Build a Simple Budget Plan</Typography.Text>
                        </div>

                        <div
                            className="px-4 py-2 bg-novelgreen-20 rounded-full inline border-2 border-novelgreen-10 cursor-pointer"
                            onClick={() => handleAIRequest('How Consistent Is My Income?')}
                        >
                            <Typography.Text>How Consistent Is My Income?</Typography.Text>
                        </div>
                        <div
                            className="px-4 py-2 bg-novelgreen-20 rounded-full inline border-2 border-novelgreen-10 cursor-pointer"
                            onClick={() => handleAIRequest('Am I Overspending on Non-Essentials?')}
                        >
                            <Typography.Text>Am I Overspending on Non-Essentials?</Typography.Text>
                        </div>
                        <div
                            className="px-4 py-2 bg-novelgreen-20 rounded-full inline border-2 border-novelgreen-10 cursor-pointer"
                            onClick={() => handleAIRequest('Help Me Set a Financial Goal')}
                        >
                            <Typography.Text>Help Me Set a Financial Goal</Typography.Text>
                        </div>
                        <div
                            className="px-4 py-2 bg-novelgreen-20 rounded-full inline border-2 border-novelgreen-10 cursor-pointer"
                            onClick={() => handleAIRequest('Help Me Plan for Next Month')}
                        >
                            <Typography.Text>Help Me Plan for Next Month</Typography.Text>
                        </div>
                        <div
                            className="px-4 py-2 bg-novelgreen-20 rounded-full inline border-2 border-novelgreen-10 cursor-pointer"
                            onClick={() => handleAIRequest('Are There Any Financial Red Flags?')}
                        >
                            <Typography.Text>Are There Any Financial Red Flags?</Typography.Text>
                        </div>
                        <div
                            className="px-4 py-2 bg-novelgreen-20 rounded-full inline border-2 border-novelgreen-10 cursor-pointer"
                            onClick={() => handleAIRequest('Suggest Ways to Boost My Income')}
                        >
                            <Typography.Text>Suggest Ways to Boost My Income</Typography.Text>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
