
//get date value
var dateGlobalObj = new Date();
var monthArray = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var date_now = (function(){
    var yearCurr = dateGlobalObj.getFullYear();
    var monthCurrNumber = dateGlobalObj.getMonth();
    var currMonthName = monthArray[monthCurrNumber];
    return {
        stringValue: "hello",
        year: yearCurr,
        currMonthNameRe: currMonthName
    };
})();

//document string collection
var DOMStringsCollection = (function(){
    
    return{
        monthPlaceHolder: ".budget__title--month",
        budgetValueUI: ".budget__value",
        budgetIncomeValueUI: ".budget__income--value",
        budgetIncomePercentage: ".budget__income--percentage",
        budgetExpenseValue: ".budget__expenses--value",
        budgetExpensePercentahe: ".budget__expenses--percentage",
        typeExpenseOrIncome: ".add__type",
        descriptionText: ".add__description",
        valueUI: ".add__value",
        buttonUI: ".add__btn"
    };
})();


//insert data to UI
var UIController = (function(){
    var DOMString = DOMStringsCollection;
    
    //initialization value to UI
    var init = function(){
        document.querySelector(DOMString.monthPlaceHolder).textContent = date_now.currMonthNameRe+", "+date_now.year;
        document.querySelector(DOMString.budgetValueUI).textContent = 0;
        document.querySelector(DOMString.budgetIncomeValueUI).textContent = 0;
        document.querySelector(DOMString.budgetIncomePercentage).textContent = "0%";
        document.querySelector(DOMString.budgetExpenseValue).textContent = "0";
        document.querySelector(DOMString.budgetExpensePercentahe).textContent = "0%"
    };

    return{
        initialization: init(),
        
    };
})();

var data = (function(){

    var Expense = function(expenseType, description, value, id){
        this.id = id;
        this.expenseType = expenseType;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    var record = {
        allitems: {
            EXP: [],
            INC: []
        },

        totalExpense: 0,
        totalIncome: 0,
        budget: 0,
        lastID: -1,
        percentage: -1
    };

    return{
        addItem: function(expenseType, description, value){
            var ID;

            if(record.lastID === -1){
                ID = 0;
            } else{
                ID = record.lastID+1;
                lastID = ID; //start from array last element
            } 

            var newItem = new Expense(expenseType, description, value, ID);
            console.log(expenseType);
            record.allitems[expenseType].push(newItem);

            console.log(newItem);
            return newItem;
        },

        viewItem: function(){
            
        }
    };



})();

//docu

//button onclick event 
 var eventListenerONClickSubmit = document.querySelector(DOMStringsCollection.buttonUI).addEventListener("click",function(){
    console.log("click"); 
    sequenceOfOperationOnSubmit();
 });

 //onPressEnterEvent
 var eventListenerOnClickEnter = document.addEventListener("keypress", function(event){
    if(event.keyCode === 13){
        console.log("Enter");
        sequenceOfOperationOnSubmit();
    } 
    
 });

 //pressing Enter
var valueCollectFromUI = function(){
    var newItem;
    var expenseType = (document.querySelector(DOMStringsCollection.typeExpenseOrIncome).value).toUpperCase();
    var description = document.querySelector(DOMStringsCollection.descriptionText).value;
    var value =  document.querySelector(DOMStringsCollection.valueUI).value;
    console.log(expenseType+description+value);
    
    return{
        getInput: function(){

            return{
                type: expenseType,
                descripRe: description,
                valueRe: value
            };
        }
    };
};


var sequenceOfOperationOnSubmit = function(){
    var valueCollectionObj = valueCollectFromUI();
    var value = valueCollectionObj.getInput().valueRe; 
    var description = valueCollectionObj.getInput().descripRe;
    var newItem;

    if(description!=="" && !isNaN(value) && value > 0){
        newItem = data.addItem(valueCollectionObj.getInput().type, description, value);
    }
};


