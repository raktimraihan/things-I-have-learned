
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
        buttonUI: ".add__btn",
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list", 
        container: ".container"
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
        idIndexList:{
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
            var ID = -1;
            ID = record.lastID+1;
            record.lastID = ID;

            var newItem = new Expense(expenseType, description, value, ID);
            record.allitems[expenseType].push(newItem);
            record.idIndexList[expenseType].push(ID);

            if("EXP".localeCompare(expenseType)===0){
                var localtTotalExpense = 0;
                localtTotalExpense = parseInt(record.totalExpense) + parseInt(value);
                record.totalExpense = localtTotalExpense;

                var localBudget = -1;
                localBudget = (parseFloat(record.budget)-parseFloat(value)); 
                record.budget = parseFloat(localBudget).toFixed(2); 
            }
            else{
                var localTotalIncome = 0;
                localTotalIncome = parseInt(record.totalIncome) + parseInt(value);
                record.totalIncome = localTotalIncome;

                var localBudgetIncome = 0;
                localBudgetIncome = parseFloat(record.budget) + parseFloat(value);
                console.log("lcoalBudget: "+localBudgetIncome);
                record.budget = parseFloat(localBudgetIncome).toFixed(2);
            }

            console.log("Budget = "+record.budget+" Income = "+record.totalIncome+" Expense= "+record.totalExpense);
            return newItem;
        },

        viewItem: function(){
           return record; 
        }
    };



})();

//docu

//button onclick event 
 var eventListenerONClickSubmit = document.querySelector(DOMStringsCollection.buttonUI).addEventListener("click",function(event){
    sequenceOfOperationOnSubmit();
 });

 //onPressEnterEvent
 var eventListenerOnClickEnter = document.addEventListener("keypress", function(event){
    if(event.keyCode === 13){
        sequenceOfOperationOnSubmit();
    } 
 });

 //delete item
 var eventListenerOnDlt = document.querySelector(DOMStringsCollection.container).addEventListener("click", function(event){
    var elementID;
    
    document.querySelector(".item__delete--btn").addEventListener("click", function(event){
        elementID = event.target.parentNode.parentNode.parentNode.id;
        console.log("ID = "+elementID);
        console.log(data.viewItem().idIndexList) 
    });
    
    

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

var insertIntoExpenseORIncomeUI = function(newItem, type){
    var newHTML, element, html; 
    if(type === 'EXP'){
        element = DOMStringsCollection.expenseContainer;
        html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        html = html.replace('%21%', calPercentage(newItem.value, data.viewItem().totalExpense));
    }
    else if(type=='INC'){
        element  = DOMStringsCollection.incomeContainer;
        html = '<div class="item clearfix" id="%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }
    console.log(newItem.id+" "+newItem.description);
    newHTML = html.replace('%id%', newItem.id);
    newHTML = newHTML.replace('%description%', newItem.description);
    newHTML = newHTML.replace('%value%', newItem.value);

    document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

};

var calPercentage = function(value, totalValue){
    return ((parseFloat(value).toFixed(2)/parseFloat(totalValue).toFixed(2))*100).toFixed(0)+"% ";
};

var clearField = function(){
    var arr = document.querySelectorAll(DOMStringsCollection.valueUI+","+DOMStringsCollection.descriptionText);
    //console.log(arr);
    arr.forEach(e=>{
        e.value = "";
    });
    document.querySelector(DOMStringsCollection.typeExpenseOrIncome).options.selectedIndex = 0;
    arr[0],focus();
};

var deleteFromDataStructure = function(){
    
};

var sequenceOfOperationOnSubmit = function(){
    var valueCollectionObj = valueCollectFromUI();
    var value = valueCollectionObj.getInput().valueRe; 
    var description = valueCollectionObj.getInput().descripRe;
    var newItem;

    if(description!=="" && !isNaN(value) && value > 0){
        newItem = data.addItem(valueCollectionObj.getInput().type, description, value);
    }
    insertIntoExpenseORIncomeUI(newItem, valueCollectionObj.getInput().type);
    document.querySelector(DOMStringsCollection.budgetValueUI).textContent = data.viewItem().budget;
    document.querySelector(DOMStringsCollection.budgetIncomeValueUI).textContent = data.viewItem().totalIncome;
    document.querySelector(DOMStringsCollection.budgetExpenseValue).textContent = data.viewItem().totalExpense;
    document.querySelector(DOMStringsCollection.budgetIncomePercentage).textContent = calPercentage(data.viewItem().totalIncome, +data.viewItem().totalExpense+data.viewItem().totalIncome);
    document.querySelector(DOMStringsCollection.budgetExpensePercentahe).textContent = calPercentage(data.viewItem().totalExpense, +data.viewItem().totalExpense+data.viewItem().totalIncome);
    clearField();

};


