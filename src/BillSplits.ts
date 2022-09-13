import logger from './config/logger';
import { paidAmountType, extract } from './extract'
import listOfBills from './constants';

type inputData = typeof listOfBills;

type summarizeAmount = {
  [key: string]: number;
};

type summarizedByUsers = {
  user: string;
  average: number;
  paid: number;
};

type billSplitsType = [summarizedByUsers[], string[], string[]];

class billSplits {
  
  listOfBills:inputData;

  constructor(listOfBills) {
    this.listOfBills = listOfBills;
  }

  extractBills = async () => {
    console.log("inside extractBills");
    //Function create the list of objects from the bill
    logger.log('info', 'The lists are calculated from the input data');
    const billItems: paidAmountType[][] = this.listOfBills.map(extract);
    return billItems;
  }

  summarizeBills = async (billData:paidAmountType[][]) => {
    //the amount value is added based on keys in map
    logger.log('info', 'Bills are summarized based on users');
    //const billData = await this.extractBills();

    const summarizeAmount: summarizeAmount = {};

    billData.forEach((bills) => {
      bills.forEach((amountPaid) => {  
        if (!Object.keys(summarizeAmount).includes(amountPaid['paidBy'])) {
          summarizeAmount[amountPaid['paidBy']] = amountPaid['amount'];
        } else {
          summarizeAmount[amountPaid['paidBy']] += amountPaid['amount'];
        }
      })
    });
    
    return summarizeAmount;
  }

  billSplits = async (dataMap:summarizeAmount) => {
    //The final bill split is calculated
    logger.log('info', 'Bills are splitted and debt is calculated');

    const finalBill: string[] = [];
    const debtCalculation: string[] = [];
    const summarizeByUsersList: summarizedByUsers[] = [];

    //the bill is splitted and the debt amount is calculated
    const paidBy = Object.keys(dataMap);
    const listInitial: string[] = paidBy.slice();
    const amount = Object.values(dataMap);
    //paidBy and amount is extracted into a list
    const totalAmount: number = amount.reduce((acc, curr) => curr + acc);
    let share: number = Math.round(totalAmount / paidBy.length);
    //Share per paidBy is calculated
    const sortedPaidBy: string[] = paidBy.sort((p1, p2) => dataMap[p1] - dataMap[p2]);
    const sortedValuesPaid: number[] = sortedPaidBy.map((person) => dataMap[person]- share);

    //the amount of values are also sorted for debt calculation
    finalBill.push('PaidBy ' + ' Share ' + ' Amount ' + ' Remaining ');
    for (var payee in paidBy) {
      let users: summarizedByUsers = { user: '', average: 0, paid: 0 };
      finalBill.push(listInitial[payee] + '\t' + share + '\t' + amount[payee] + '\t' + (amount[payee] - share));
      users['user'] = listInitial[payee];
      users['average'] = share;
      users['paid'] = amount[payee];
      summarizeByUsersList.push(users);
    }
    
    console.log('\n');
    let start: number = 0;
    let end: number = sortedPaidBy.length - 1;
    let debt: number = 0;

    while (start < end) {
      debt = Math.min(-sortedValuesPaid[start], sortedValuesPaid[end]);
      sortedValuesPaid[start] += debt;
      sortedValuesPaid[end] -= debt;
      //Final part of the bill calculation of owing the debt is calculated
      debtCalculation.push(sortedPaidBy[start] + ' owes ' + sortedPaidBy[end] + ' ' + debt);
      if (sortedValuesPaid[start] === 0) {
        start++;
      }
      if (sortedValuesPaid[end] === 0) {
        end--;
      }
    }
     
    logger.log('info', 'Output is returned as objects');
    return [summarizeByUsersList, finalBill, debtCalculation];
  }
}

export default billSplits;

