import logger from "./config/logger";
import listOfBills from "./constants";

type inputData = typeof listOfBills;

type objectType ={
    [key : string] : number;
};

type paidAmountType ={
    paidBy : string,
    amount : number,
}

type summarizedByUsers ={
    user : string,
    average : number,
    paid : number;
}

type billSplitsType = [summarizedByUsers[],string[],string[]];
class billSplits{
    
    createLists(listOfBills:inputData):paidAmountType[]{ 
        //Function create the list of objects from the bill
        logger.log('info',"The lists are calculated from the input data");
        var listOfObjects:paidAmountType[]=[];

        listOfBills.forEach(function(value){
        value.lineItems.forEach(element => {
        listOfObjects.push(element);
       });
     })

     return listOfObjects;
    }

    summarizeBills(data:paidAmountType[]):objectType{
        //the amount value is added based on keys in map
        logger.log('info',"Bills are summarized based on users");
        let summarizeAmount: objectType = {};

        data.forEach((item)=>{
            if(!(Object.keys(summarizeAmount).includes(item['paidBy']))){
                summarizeAmount[item['paidBy']]=item['amount'];
            }
            else{
                summarizeAmount[item['paidBy']]+=item['amount'];
            }
        })

        return summarizeAmount;
    }

    billSplits(dataMap:objectType):billSplitsType{
        //The final bill split is calculated
        logger.log('info',"Bills are splitted and debt is calculated");
        let finalBill:string[]=[];
        let debtCalculation:string[]=[];
        let summarizeByUsersList : summarizedByUsers[] =[]
        
        //the bill is splitted and the debt amount is calculated
        let paidBy = Object.keys(dataMap);
        let listInitial:string[] = paidBy.slice();
        let amount = Object.values(dataMap);
        //paidBy and amount is extracted into a list 
        let totalAmount:number = amount.reduce((acc, curr) => curr+acc);
        let share:number = Math.round(totalAmount/paidBy.length);
        //Share per paidBy is calculated
        let sortedPaidBy:string[] = paidBy.sort((p1,p2) => dataMap[p1] - dataMap[p2]);
        let sortedValuesPaid:number[] = sortedPaidBy.map((person) => dataMap[person]-share);

        //the amount of values are also sorted for debt calculation
        finalBill.push("PaidBy "+" Share "+" Amount "+" Remaining ");
        for(var d in paidBy){
            let users : summarizedByUsers = {user:'',average:0,paid:0};
            finalBill.push(listInitial[d]+"\t"+share+"\t"+amount[d]+"\t"+(amount[d]-share));
            users['user']=listInitial[d];
            users['average']=share;
            users['paid']=amount[d];
            summarizeByUsersList.push(users);
        }

        console.log("\n");
        let i:number = 0;
        let j:number = sortedPaidBy.length - 1;
        let debt:number=0;

        while (i < j) {
          debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
          sortedValuesPaid[i] += debt;
          sortedValuesPaid[j] -= debt;
          //Final part of the bill calculation of owing the debt is calculated
          debtCalculation.push(sortedPaidBy[i]+" owes "+sortedPaidBy[j]+" "+debt);
          if (sortedValuesPaid[i] === 0) {
            i++;
          }
          if (sortedValuesPaid[j] === 0) {
            j--;
          }
        }
        logger.log('info',"Output is returned as objects");
        return [summarizeByUsersList,finalBill,debtCalculation];
      }
    
}

console.log("BillSplits Program");
logger.log('info',"Bill Splits Calculation");
var bs = new billSplits();  
var arrayList:paidAmountType[] = bs.createLists(listOfBills);
var dataMap:objectType = bs.summarizeBills(arrayList);
var finalSettlement:billSplitsType = bs.billSplits(dataMap);
finalSettlement.forEach(element => {
    element.forEach(item =>{
        console.log(item);
    })
    console.log("\n\n")
});
//Calling the function to split the bills