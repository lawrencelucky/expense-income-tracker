/* eslint-disable react/prop-types */
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import icons from '@/icons';

const Transaction = (props) => {
    return (
        <div className="transaction-container">
            <div className="currency-date-trash">
                <div>
                    <CurrencyFormat
                        value={props.amount}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'₦'}
                        renderText={(amount) => <p className="transaction-amount">{amount}</p>}
                    />
                    <p className="transaction-date">{moment(props.transaction.date).format('MMM Do YY, h:mm a')}</p>
                </div>
                <span className="trash-icon-mobile" onClick={() => props.handleDelete(props.transaction)}>
                    {icons.deleteIcon()}
                </span>
            </div>
            <div className="transaction-description-container">
                <p className={`transaction-type ${props.type === 'expense' ? 'expense' : 'income'}`}>
                    {props.type === 'expense' ? 'Expense' : 'Income'}
                </p>{' '}
                - <p className="transaction-description">{props.description}</p>
            </div>
            <span className="trash-icon" onClick={() => props.handleDelete(props.transaction)}>
                {icons.deleteIcon()}
            </span>
        </div>
    );
};

export default Transaction;
