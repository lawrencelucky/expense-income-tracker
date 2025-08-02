export function generateAIPromptCostCutting(transactions) {
    const expenses = transactions.filter((tx) => tx.type === 'expense');
    const lines = expenses.map((tx) => {
        const amount = Number(tx.amount).toLocaleString('en-NG', {
            currency: 'NGN',
            style: 'currency',
        });
        return `- ₦${amount} – ${tx.description}`;
    });

    return `
        Based on the following list of expenses, suggest 4–5 areas where I can cut down my spending:

        ${lines.join('\n')}

        Be honest but constructive. I want to manage my money better.
    `;
}

export function generateAIPromptBudgetHelp(transactions) {
    const income = transactions.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + Number(tx.amount), 0);

    return `
        I earn ₦${income.toLocaleString('en-NG')} this month. Help me create a basic monthly budget plan.

        Break it into these categories: Savings, Food, Bills, Transport, Leisure, and Miscellaneous.
        Suggest what percentage or amount to allocate to each, and explain your reasoning.
    `;
}

export function generateAIPromptIncomeConsistency(transactions) {
    const incomes = transactions.filter((tx) => tx.type === 'income');
    const lines = incomes.map((tx) => {
        const date = new Date(tx.date).toLocaleDateString('en-NG');
        const amount = Number(tx.amount).toLocaleString('en-NG', {
            currency: 'NGN',
            style: 'currency',
        });
        return `- ${date}: ${amount} – ${tx.description}`;
    });

    return `
        Here are my income records over time:

        ${lines.join('\n')}

        How consistent is my income? Do you notice irregularities or patterns? 
        What should I consider doing if my income is unstable?
    `;
}

export function generateAIPromptOverspending(transactions) {
    const expenses = transactions.filter((tx) => tx.type === 'expense');
    const lines = expenses.map((tx) => {
        const amount = Number(tx.amount).toLocaleString('en-NG', {
            currency: 'NGN',
            style: 'currency',
        });
        return `- ${amount} – ${tx.description}`;
    });

    return `
        These are my expenses:

        ${lines.join('\n')}

        Based on this, am I spending too much on non-essentials like food, entertainment, or impulse buys?
        Give me an honest review and tips on how to manage this better.
    `;
}

export function generateAIPromptSetGoal(transactions) {
    const income = transactions.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + Number(tx.amount), 0);

    return `
        My monthly income is ₦${income.toLocaleString('en-NG')}. 
        I’d like to set a smart financial goal. Suggest 1–2 realistic and measurable goals 
        I can pursue based on my income level.

        Also advise how to track my progress and stay motivated.
    `;
}

export function generateAIPromptNextMonthPlan(transactions) {
    const totalIncome = transactions
        .filter((tx) => tx.type === 'income')
        .reduce((sum, tx) => sum + Number(tx.amount), 0);
    const totalExpense = transactions
        .filter((tx) => tx.type === 'expense')
        .reduce((sum, tx) => sum + Number(tx.amount), 0);

    return `
        This month I earned ₦${totalIncome.toLocaleString('en-NG')} and spent ₦${totalExpense.toLocaleString('en-NG')}.
        How should I plan my finances for next month?

        Give me 2–3 recommendations to manage money better based on this performance.
    `;
}

export function generateAIPromptFinancialRedFlags(transactions) {
    const sorted = [...transactions].sort((a, b) => a.date - b.date);
    const lines = sorted.map((tx) => {
        const type = tx.type === 'income' ? 'Income' : 'Expense';
        const amount = Number(tx.amount).toLocaleString('en-NG', {
            currency: 'NGN',
            style: 'currency',
        });
        return `- ${type}: ${amount} – ${tx.description}`;
    });

    return `
        Here is a list of all my transactions:

        ${lines.join('\n')}

        Based on these, do you see any red flags in my financial behavior (e.g., low savings, overspending, lack of income)?
        Point out any risks I should be aware of and how I can avoid them.
    `;
}

export function generateAIPromptBoostIncome(transactions) {
    const income = transactions.filter((tx) => tx.type === 'income');
    const total = income.reduce((sum, tx) => sum + Number(tx.amount), 0);

    return `
        I currently earn about ₦${total.toLocaleString('en-NG')} monthly through:

        ${income.map((tx) => `- ${tx.description}`).join('\n')}

        Can you suggest 2–3 ways I could potentially boost my income over time?
        Think side hustles, freelancing, passive income, or career growth.
    `;
}
