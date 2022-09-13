import listOfBills from "./constants";

type paidAmountType = {
    paidBy: string;
    amount: number;
  };

const extract = (billing):paidAmountType[] => {
    var list = [];
    if (billing) {
        billing.lineItems.forEach(paidBy => {
            list.push(paidBy);
        });
    }
    return list;
}

export { paidAmountType,extract};
