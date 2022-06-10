import axios from "axios";
import authHeader from "./../util/auth-header";

const API_URL = "http://localhost:8090/";

const fetchUserAndAccountDetails = (username) => {
  return axios.get(API_URL + `user/${username}`,{ headers: authHeader() });
};

const makeDeposit = (amount, username) => {
    return axios.put(API_URL + `user/${username}/events/deposit`, { transactionType:'deposit', amount }, { headers: authHeader() })
}

const makeWithdraw = (amount, username) => {
    return axios.put(API_URL + `user/${username}/events/withdraw`, {  transactionType:'withdraw', amount }, { headers: authHeader() })
}

const fetchTransactions = (username) => {
    return axios.get(API_URL + `user/${username}/transactions`,{ headers: authHeader() });
  };

export default {
    fetchUserAndAccountDetails,
    makeDeposit,
    makeWithdraw,
    fetchTransactions
};