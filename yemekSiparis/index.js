let carts = document.querySelectorAll('.add-food')
let foods = [
    {
        name: 'Çorba',
        tag: 'corba',
        price: 10,
        inCard: 0
    },
    {
        name: 'Mantı',
        tag: 'manti',
        price: 15,
        inCard: 0
    },
    {
        name: 'Tavuklu Wrap',
        tag: 'wrap',
        price: 25,
        inCard: 0
    },
    {
        name: 'Künefe',
        tag: 'kunefe',
        price: 12,
        inCard: 0
    },
    {
        name: 'Meyve Suyu',
        tag: 'meyve_suyu',
        price: 5,
        inCard: 0
    },
    {
        name: 'Çay',
        tag: 'cay',
        price: 5,
        inCard: 0
    }
];

for(let i = 0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cardNumber(foods[i]);
        totalCost(foods[i]);
    })
}

function cardNumber(food){
    console.log("the cliked:" , foods)
    let foodNumbers = localStorage.getItem('cardNumber');
    foodNumbers = parseInt(foodNumbers);

    if( foodNumbers ) {
        localStorage.setItem('cardNumber' , foodNumbers + 1);        
    } else {
        localStorage.setItem('cardNumber' , 1);
    }

    setItems(food);
}
    
function setItems(food) {
    let cardItem = localStorage.getItem('foodsInCard');
    cardItem = JSON.parse(cardItem);

    if(cardItem != null){

        if(cardItem[food.tag] == undefined){
            cardItem = {
                ...cardItem,
                [food.tag] : food
            }
        }
        cardItem[food.tag].inCard += 1;
    } else {
        food.inCard = 1;
        cardItem = {
            [food.tag] : food
        }
    }
    localStorage.setItem('foodsInCard', JSON.stringify(cardItem));
}

function totalCost(food) {        
    let cardCost = localStorage.getItem('totalCost');

    if(cardCost != null){
        cardCost = parseInt(cardCost);
            localStorage.setItem("totalCost" , cardCost + food.price );
        } else {
            localStorage.setItem("totalCost" , food.price );
        }
    }
        
function displayCard() {
    let cardItems = localStorage.getItem("foodsInCard");
    cardItems = JSON.parse(cardItems);
    let foodContainer = document.querySelector(".foods");
    let cardCost = localStorage.getItem('totalCost');

    if(cardItems && foodContainer) {
        foodContainer.innerHTML = '';
        Object.values(cardItems).map(item => {            
            foodContainer.innerHTML +=  `
            <div class = "food">
                    <img src = "./images/${item.tag}.jpg"/> 
                    <span>${item.name}</span>                   
                </div>
                <div class = "price">${item.price}</div>
                <div class = "quantity">${item.inCard}
                </div>
                <div class = "total">
                    ${item.inCard * item.price},00₺
                </div>
                `;
            });

            foodContainer.innerHTML += `
                <div class = "basketTotalContainer">
                    <h4 class = "basketTotalTitle">
                    Toplam Tutar
                    </h4>
                    <h4 class = "basketTotal">
                     ${cardCost},00₺
                    </h4>
            `
    }
}

function ordered() {
    document.getElementById("ordered").innerHTML = ' sipariş alındı '
}

function orderOk(){    
    let progress = document.querySelector(".progress");
    let cardItem = localStorage.getItem('foodsInCard');
    cardItem = JSON.parse(cardItem);

    if(cardItem != null){   // eğer seçilen ürün varsa sipariş kaydedildi bilgisi gelir
        progress.innerHTML = `
        <div id="output">
            Sipariş Kaydedildi.
        </div>
        `        
    } else {
        progress.innerHTML = `
        <div id="output">
            Lütfen ürün seçiniz!
        </div>
        `    
    }
}

function viewFood(){
    let cardItem = localStorage.getItem('foodsInCard');
    cardItem = JSON.parse(cardItem);
    let foodProgress = document.querySelector(".foodProgress");

    if(cardItem != null){   // eğer seçilen ürün varsa siparişler görüntülenir
        displayCard();        
    } else {
        foodProgress.innerHTML += `
        <div id="output">
            Bekleyen Sipariş Yok!                
        </div>
    `   
    }
}

function progressing(){
    let foodProgress = document.querySelector(".foodProgress");    
    foodProgress.innerHTML += `
    <div id="output">
        Siparişler Hazırlanıyor
    </div>
`
}

function viewMoney(){
    let cardCost = localStorage.getItem('totalCost');
    let foodProgress = document.querySelector(".foodProgress");    
    foodProgress.innerHTML += `
    <div id="output">
        Ücret : ${cardCost},00₺
    </div>
`
}

function cleaned() {
    this.localStorage.clear();
    window.location.reload()
}