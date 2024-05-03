import React from "react";
import '../resources/analytics.css';
import { Progress } from 'antd';

function Analytics({ transactions }) {

    // Total Transactions
    const totalTransactions = transactions.length;
    const totalIncomeTransactions = transactions.filter(transaction => transaction.type === 'income').length;
    const totalExpenseTransactions = transactions.filter(transaction => transaction.type === 'expense').length;
    const totalIncomeTransactionsPercentage = (totalIncomeTransactions / totalTransactions) * 100;
    const totalExpenseTransactionsPercentage = (totalExpenseTransactions / totalTransactions) * 100;

    // Total Turnover
    const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnover = transactions.reduce((acc, transaction) => transaction.type === 'income' ? acc + transaction.amount : acc, 0);
    const totalExpenseTurnover = transactions.reduce((acc, transaction) => transaction.type === 'expense' ? acc + transaction.amount : acc, 0);
    const totalIncomeTurnoverPercentage = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercentage = (totalExpenseTurnover / totalTurnover) * 100;

    // Transaction by Category
    const categories = ['salary', 'freelance', 'food', 'entertainment', 'groceries', 'rent', 'utilities', 'transportation', 'shopping', 'insurance', 'investment', 'savings', 'travel', 'medical', 'education', 'subscription', 'donation', 'gift', 'loan', 'tax'];


    return (
        <div className="analytics">

            { /* A row for transaction-count Cards */}
            <div className="row"> 

                <div className="col-md-4 mt-3">

                    <div className="transactions-count">
                        <h4>Total Transactions : {totalTransactions}</h4>
                        <hr />
                        <h5>Income : {totalIncomeTransactions}</h5>
                        <h5>Expense: {totalExpenseTransactions }</h5>

                        <div className="progress-bars">

                            {totalIncomeTransactionsPercentage ? <Progress className='mx-5' strokeColor='#7cb305' type="circle" percent={totalIncomeTransactionsPercentage.toFixed(0)}/> : <Progress className='mx-5' strokeColor='#7cb305' type="circle" percent={0}/>}
                            {totalExpenseTransactionsPercentage ? <Progress strokeColor='#ff4d4f' type="circle" percent={totalExpenseTransactionsPercentage.toFixed(0)}/> : <Progress strokeColor='#ff4d4f' type="circle" percent={0}/>}

                            {/* <Progress className='mx-5' strokeColor='#7cb305' type="circle" percent={totalIncomeTransactionsPercentage.toFixed(0)}/>
                            <Progress strokeColor='#ff4d4f' type="circle" percent={totalExpenseTransactionsPercentage.toFixed(0)}/> */}
                            
                        </div>

                    </div>

                </div>

                <div className="col-md-4 mt-3">

                    <div className="transactions-count">
                        <h4>Total Turnover : {totalTurnover}</h4>
                        <hr />
                        <h5>Income : {totalIncomeTurnover}</h5>
                        <h5>Expense: {totalExpenseTurnover}</h5>

                        <div className="progress-bars">

                            {totalIncomeTurnoverPercentage ? 
                                <Progress className='mx-5' strokeColor='#7cb305' type="circle" percent={totalIncomeTurnoverPercentage.toFixed(0)}/> : 
                                <Progress className='mx-5' strokeColor='#7cb305' type="circle" percent={0}/>}
                            
                            {totalExpenseTurnoverPercentage ? 
                                <Progress strokeColor='#ff4d4f' type="circle" percent={totalExpenseTurnoverPercentage.toFixed(0)}/> : 
                                <Progress strokeColor='#ff4d4f' type="circle" percent={0}/>}

                            {/* <Progress className='mx-5' strokeColor='#7cb305' type="circle" percent={totalIncomeTurnoverPercentage.toFixed(0)}/>
                            <Progress strokeColor='#ff4d4f' type="circle" percent={totalExpenseTurnoverPercentage.toFixed(0)}/> */}
                            
                        </div>

                    </div>

                </div>

            </div>

            <hr />

            { /* A row for transaction-by-category Cards */}
            <div className="row mt-2">

                {/* Income Transactions by Categories */}
                <div className="col-md-6">

                    <div className="category-analysis">
                        <h4>Income Transactions by Category</h4>

                        {categories.map((category, index) => {
                            
                            // Fetch the amount based on the category && type (which is income) 
                            const amount = transactions.filter(transaction => transaction.type === 'income' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0);

                            return (
                            (amount > 0) && // Show categories with non-zero amount
                            <div className="category-card" key={index}>
                                <h5>{category}</h5>
                                <Progress strokeColor='#0958d9' percent={(( amount / totalIncomeTurnover) * 100).toFixed(0)}/>
                            </div>
                            )
                        })}

                    </div>

                </div>

                {/* Expense Transactions by Categories */}
                <div className="col-md-6">

                    <div className="category-analysis">
                        <h4>Expense Transactions by Category</h4>

                        {categories.map((category, index) => {
                            
                            // Fetch the amount based on the category && type (which is income) 
                            const amount = transactions.filter(transaction => transaction.type === 'expense' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0);

                            return (
                            (amount > 0) && // Show categories with non-zero amount
                            <div className="category-card" key={index}>
                                <h5>{category}</h5>
                                <Progress strokeColor='#0958d9' percent={(( amount / totalExpenseTurnover) * 100).toFixed(0)}/>
                            </div>
                            )
                        })}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Analytics;