/*eslint-env browser*/
/* eslint no-console: "off" */
var dateObj = new Date();

//get current month and year
var monthAndYear = (function(){
    var year = dateObj.getFullYear().toString();
    var month = dateObj.getMonth();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var currentMonth = months[month];
    return{
        getYear: function(){
            return {
                yearNow: year,
                monthName: currentMonth
            };   
        
        }
        
    };
})();

//IFEE

//budget controller
var budgetController= (function(){
    var expense = function(type, description, value, id){
        this.type = type;
        this.description = description;
        this.value = value;
        this.id = id;
        
    };
    
    var income = function(type, description, value, id){
        this.type = type;
        this.description = description;
        this.value = value;
        this.id = id;
        
    };
    
    var allAmountCollection = {
        totalBudget : 0,
        allIncome: [],
        allExpense: [],
        percentage: 0,
        
    };
    
    return{
        addItem: function(){
            var input = UIController.getinput();
            var type = input.type;
            var description = input.description;
            var value = input.value;
            var newItem, ID
            
            if(type == 'exp'){
                console.log('Expense Processing');
                ID = allAmountCollection.allExpense.pop();
                if(ID==null) {
                    ID = 'E-0'; 
                }
                else{
                    var IDCharArray = ID.id.split('-');
                    IDCharArray[1] +=1;
                    ID = IDCharArray[0].concat(IDCharArray[1]);
                }
                newItem = new expense(type, description, value, ID);
                allAmountCollection.allExpense.push(newItem);
            }
            
            else{
                console.log('Income Processing');
                ID = allAmountCollection.allIncome.pop();
                if(ID==null) {
                    ID = 'I-0'; 
                }
                else{
                    IDCharArray = ID.id.split('-');
                    var IDInt = parseInt(IDCharArray[1])+1;
                    ID = IDCharArray[0].concat(IDCharArray[1]);
                }
                newItem = new income(type, description, value, ID);
                allAmountCollection.allIncome.push(newItem);
            }
        },
        
        allIncomeReturn: function(){
            return {
                allIncomeArray: allAmountCollection.allIncome
            };
        },
        
        allExpenseReturn: function(){
            return {
                allExpenseArray : allAmountCollection.allExpense
            };
        }
    };
    
    
    
    
})();

//ui controller
var UIController= (function(){
    var DOMStrings = {
        input : '.add__type',
        addDescription: '.add__description',
        addValue: '.add__value',
        inputButton: '.add__btn',
        totalAmountNav: ".budget__title--month",
        budgetValue: ".budget__value",
        budgetIncomeValue: ".budget__income--value",
        budgetExpensesValue: ".budget__expenses--value",
        budgetIncomePercentage: ".budget__income--percentage",
        budgetExpensePercentage: ".budget__expenses--percentage"
    };
    
    //display month on nav bar
    
    
    return{
        getinput: function(){
            
            return{
                type : document.querySelector(DOMStrings.input).value, //will be either inc or expenses
                description : document.querySelector(DOMStrings.addDescription).value,
                value : document.querySelector(DOMStrings.addValue).value
            };
        },
        
        getDOMStrings: function(){
            return DOMStrings;
        },
        
        init: function(){
            document.querySelector(DOMStrings.totalAmountNav).textContent = monthAndYear.getYear().monthName+', '+ monthAndYear.getYear().yearNow;
            document.querySelector(DOMStrings.budgetValue).textContent = "0"; 
            document.querySelector(DOMStrings.budgetIncomeValue).textContent = "0";
            document.querySelector(DOMStrings.budgetExpensesValue).textContent = "0";
            document.querySelector(DOMStrings.budgetExpensePercentage).textContent = "";
            document.querySelector(DOMStrings.budgetIncomePercentage).textContent = "";
        }
        
    };
    
})();

//global app controler
var controller = (function(budgetCtrl, UICtrl) {
    
        var setupEventListener = function(){
            var DOM = UIController.getDOMStrings();

            document.querySelector(DOM.inputButton).addEventListener('click', function(){
                //console.log('button was clicked');
                controllAtItemFunction();

            }); //button

            document.addEventListener('keypress', function(event){
                if(event.keyCode==13 || event.which == 13){
                    console.log("Enter was pressed.");
                    controllAtItemFunction();
                    budgetCtrl.addItem();
                }

            });


            var controllAtItemFunction = function(){
                var input = UICtrl.getinput();
                budgetCtrl.addItem();
            };
            
            
        
        };
    
        return{
            eventListener: setupEventListener()
        };
    
                  
})(budgetController, UIController);

UIController.init();

