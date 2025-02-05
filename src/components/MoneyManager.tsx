import { useState } from 'react';
import { Plus, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

type Currency = 'USD' | 'INR' | 'GBP';

export default function MoneyManager() {
  const [setTransactions, getTransactions] = useLocalStorage('transactions');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [currency, setCurrency] = useState<Currency>('USD');
  
    var storedTransactions: Array<Transaction>  = [];
    var temp: any = getTransactions();
    if (temp === undefined) {
      setTransactions([]);
    }else{
      storedTransactions = temp;
    }

  // Using fixed exchange rates for demonstration
  // In a production environment, you would want to fetch these from an API
  const EXCHANGE_RATES = {
    USD_TO_INR: 83.12,
    USD_TO_GBP: 0.79,
    INR_TO_USD: 0.0120307988,
    GBP_TO_USD: 1.2658227848,
  };

  function money(A: number): number {
    switch (currency) {
      case 'INR':
        return A * EXCHANGE_RATES.INR_TO_USD;
      case 'GBP':
        return A * EXCHANGE_RATES.GBP_TO_USD;
      default:
        return A;
    }
  }

  const addTransaction = () => {
    if (description.trim() && amount) {
      const newTransaction: Transaction = {
        id: Date.now(),
        description: description.trim(),
        amount: money(parseFloat(amount)),
        type,
        date: new Date().toISOString(),
      };
      storedTransactions = [ newTransaction, ...storedTransactions];
      setTransactions(storedTransactions);
      setDescription('');
      setAmount('');
    }
  };

  const balance = storedTransactions.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0
  );

  const income = storedTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = storedTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const formatCurrency = (amount: number) => {
    switch (currency) {
      case 'INR':
        return `₹${(amount * EXCHANGE_RATES.USD_TO_INR).toFixed(2)}`;
      case 'GBP':
        return `£${(amount * EXCHANGE_RATES.USD_TO_GBP).toFixed(2)}`;
      default:
        return `$${amount.toFixed(2)}`;
    }
  };  

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2D4F3C]">Money Manager</h2>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          className="text-[#2D4F3C] hover:text-[#1A2F24] bg-[#F5F2EA] px-4 py-2 rounded-lg"
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#F5F2EA] p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Balance</div>
          <div className="text-xl font-bold text-[#2D4F3C] flex items-center">
            <Wallet className="w-5 h-5 mr-1" />
            {formatCurrency(balance)}
          </div>
        </div>
        <div className="bg-[#F5F2EA] p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Income</div>
          <div className="text-xl font-bold text-green-600 flex items-center">
            <ArrowUpRight className="w-5 h-5 mr-1" />
            {formatCurrency(income)}
          </div>
        </div>
        <div className="bg-[#F5F2EA] p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Expenses</div>
          <div className="text-xl font-bold text-red-600 flex items-center">
            <ArrowDownRight className="w-5 h-5 mr-1" />
            {formatCurrency(expenses)}
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D4F3C]"
        />
        <input
          type="number"
          min={0}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2D4F3C]"
        />
        <div className="flex space-x-4">
          <button
            onClick={() => setType('income')}
            className={`flex-1 p-3 rounded-lg border-2 ${
              type === 'income'
                ? 'border-[#2D4F3C] bg-[#2D4F3C] text-[#F5F2EA]'
                : 'border-gray-300'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setType('expense')}
            className={`flex-1 p-3 rounded-lg border-2 ${
              type === 'expense'
                ? 'border-[#2D4F3C] bg-[#2D4F3C] text-[#F5F2EA]'
                : 'border-gray-300'
            }`}
          >
            Expense
          </button>
        </div>
        <button
          onClick={addTransaction}
          className="w-full bg-[#2D4F3C] text-[#F5F2EA] px-6 py-3 rounded-lg flex items-center justify-center"
        >
          <Plus className="mr-2" />
          Add Transaction
        </button>
      </div>

      <div className="space-y-3">
        

        {storedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-[#F5F2EA] rounded-lg"
          >
            <div>
              <div className="font-medium">{transaction.description}</div>
              <div className="text-sm text-gray-600">
                {new Date(transaction.date).toLocaleDateString()}
              </div>
            </div>
            <div className={`font-bold ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}