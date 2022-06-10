import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BankService from './../services/bank.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [userDetails, setUserDetails] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [transactions, setTransactions] = useState([]);

    const navigate = useNavigate();
    let { username } = useParams();

    useEffect(() => {
        fetchUserAndAccountDetails();
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        const transactionsResponse = await BankService.fetchTransactions(username);
        setTransactions(transactionsResponse.data);
    }

    const fetchUserAndAccountDetails = async () => {
        const response = await BankService.fetchUserAndAccountDetails(username);
        setUserDetails(response.data);
    }

    const makeDeposit = async () => {
        const response = await BankService.makeDeposit(parseInt(depositAmount), username).then((response) => {
            notifySuccess(`Deposit of ${depositAmount} AED is Successful`);
            setUserDetails({ ...userDetails, totalBalance: response.data.balance });
            setDepositAmount('');
        }).catch((e) => {
            notifyError(e.response.data.message);
            setDepositAmount('');
        });
        const transactionsResponse = await BankService.fetchTransactions(username);
        setTransactions(transactionsResponse.data);
    }

    const makeWithdraw = async () => {
        const response = await BankService.makeWithdraw(parseInt(withdrawAmount), username).then((response) => {
            notifySuccess(`Withdraw of ${withdrawAmount} AED is Successful`);
            setUserDetails({ ...userDetails, totalBalance: response.data.balance })
            setWithdrawAmount('');
        }).catch(e => {
            notifyError(e.response.data.message);
            setWithdrawAmount('');
            return
        });
        const transactionsResponse = await BankService.fetchTransactions(username);
        setTransactions(transactionsResponse.data);
    }

    const notifyError = (msg) => toast.error(msg);
    const notifySuccess = (msg) => toast.info(msg);


    return (
        <div>
            <div className="container">
                <div className="block">
                    <h2><b>Welcome Back</b>: {userDetails.name}</h2>
                </div>
                <div className="block">
                    <h2><b>Account No</b>: {userDetails.accountNo}</h2>
                </div>
                <div className="block">
                    <h2><b>Account Balance</b>: {userDetails.totalBalance}</h2>
                </div>
                <div className="block">
                    <div className="field has-addons">
                        <p className="control">
                            <span className="select">
                                <select>
                                    <option>AED</option>
                                </select>
                            </span>
                        </p>
                        <p className="control">
                            <input className="input" type="number" min={0} placeholder="Amount of money" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                        </p>
                        <p className="control">
                            <a className="button is-primary" onClick={makeDeposit}>
                                Deposit
                            </a>
                        </p>
                    </div>
                </div>
                <div className="block">
                    <div className="field has-addons">
                        <p className="control">
                            <span className="select">
                                <select>
                                    <option>AED</option>
                                </select>
                            </span>
                        </p>
                        <p className="control">
                            <input className="input" type="number" min={0} placeholder="Amount of money" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
                        </p>
                        <p className="control">
                            <a className="button is-warning" onClick={makeWithdraw}>
                                Withdraw
                            </a>
                        </p>
                    </div>
                </div>
                <hr></hr>
                <div className="block">
                    <h2><b>Transactions</b></h2>
                </div>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Transaction Type</th>
                            <th>Credit</th>
                            <th>Debit</th>
                            <th>Balance</th>
                            <th>Transaction Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.transactionType}</td>
                                <td>{transaction.depositAmount}</td>
                                <td>{transaction.withdrawAmount}</td>
                                <td>{transaction.balance}</td>
                                <td>{transaction.transactionDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Dashboard