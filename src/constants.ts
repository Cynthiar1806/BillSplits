
const listOfBills = [
    //Bill 1
    {
      name:"Lunch",
      lineItems:[
          {
            paidBy:"A",
            amount: 1000
          },
          {
            paidBy:"B",
            amount: 500
          },
          {
            paidBy:"C",
            amount: 2000
          }
      ]
    },
    //Bill 2
     {
      name:"Dinner",
      lineItems:[
          {
            paidBy:"A",
            amount: 3000
          },
          {
            paidBy:"B",
            amount: 0
          },
          {
            paidBy:"C",
            amount: 0
          }
      ]
    }
   ]
   
   //function summarizeByUsers can return an output in this format
   
   const summarizedByUsers =[
     {
       user:"A",
       average: 2166.67,
       paid: 4000
     },
     {
       user:"B",
       average: 2166.67,
       paid: 500
     },
     {
       user:"C",
       average: 2166.67,
       paid: 2000
     }
    ]
   
   //function settleBills() takes this object and returns in this format
   /*
   *  4000    2166.67     +1833.33
   *   500    2166.67     -1666.67
   *  2000     2166.67     -166.67
   */
 export default listOfBills;