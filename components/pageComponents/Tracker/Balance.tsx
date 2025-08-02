import React from 'react';
import CurrencyFormat from 'react-currency-format';

type BalanceProps = {
    balance: number;
};

const Balance: React.FC<BalanceProps> = ({ balance }) => {
    return (
        <div className="balance-container">
            <CurrencyFormat
                value={balance}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'₦'}
                renderText={(balance) => <p>{balance}</p>}
            />
        </div>
    );
};

export default Balance;
