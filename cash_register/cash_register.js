const registerStatus = {
    open : 'OPEN',
    closed: 'CLOSED',
    insufficient_funds: 'INSUFFICIENT_FUNDS'
};
const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

function checkCashRegister(price, cash, cid) {
    let cashRegister = { status: ' ', change: cid};
    let changeNeeded = parseFloat(cash - price).toFixed(2);
    let changeAvailable = getTotalChange(cid);
    cashRegister.status = getRegisterStatus(changeNeeded,changeAvailable);

    if(cashRegister.status === 'INSUFFICIENT_FUNDS'){
        cashRegister.change = [];
        return cashRegister;
    }
    cashRegister.change = getCustomerChange(changeNeeded,cid);

    if(cashRegister.status === 'CLOSED'){
        cashRegister.change = [...cid];
    }
     if(changeNeeded > getTotalChange(cashRegister.change)){
        cashRegister.change = [];
        cashRegister.status = 'INSUFFICIENT_FUNDS'
    }
    return cashRegister;
}
function getCustomerChange(changeNeeded,changeInRegister){
    const change = [];
    for (let i = changeInRegister.length-1; i >=0 ;i--){
        const currencyName = changeInRegister[i][0];
        const currencyTotal = changeInRegister[i][1];
        const currencyValue = currencyUnit[currencyName];
        let currencyAmount = (currencyTotal /currencyValue).toFixed(2);
        let currencyReturn =0;

        while (changeNeeded >= currencyValue && currencyAmount > 0){
            changeNeeded -= currencyValue;
            changeNeeded = changeNeeded.toFixed(2);
            currencyAmount--;
            currencyReturn++;
        }
        if(currencyReturn >0){
            change.push([currencyName, currencyReturn * currencyValue]);
        }
    }
    return change;

}

function getTotalChange(changeInRegister){
    let total = 0;
    changeInRegister.map(item => {
        total += item[1];
    })
    return total.toFixed(2);
}

function getRegisterStatus(changeNeeded,changeAvailable){
    if (Number(changeNeeded) < Number(changeAvailable)){
        return registerStatus.open;
    }
    else if (Number(changeNeeded) > Number(changeAvailable)){
        return registerStatus.insufficient_funds;
    }
        return registerStatus.closed;
}
// checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);