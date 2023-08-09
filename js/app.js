const loadApi = (dataLimite) => {
    // loading spiner start
    loadSpiner(true)
    //API fetch
    const url = ' https://openapi.programming-hero.com/api/ai/tools'
    fetch(url)
        .then(res => res.json())
        .then((data) => AIcards(data.data.tools, dataLimite))
}
// Place data to card
const AIcards = (tools, dataLimite) => {
    const cardHolder = document.getElementById('card-holder');
    // primarylable of display items
    const loadMoreBtn = document.getElementById('loadMore')
    if (dataLimite && tools.length > 6) {
        tools = tools.slice(0, 6)
        loadMoreBtn.classList.remove('d-none')
    } else {
        loadMoreBtn.classList.add('d-none')
    }
    // load More btn
    document.getElementById('loadMore').addEventListener('click', function () {
        loadApi()
    })
    tools.forEach(tool => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div class="card p-2 h-100">
                    <img height="150px" src="${tool.image}" bclass="card-img-top" alt="...">
                    <div class="mt-3 mb-0">
                        <h5 class="card-title">Feature</h5>
                        <ol class="mb-0">
                            <li>${tool.features[0]}</li>
                            <li>${tool.features[1]}</li>
                            <li>${tool.features[2]}</li>
                        </ol>
                    </div>
                    <hr>
                    <div class="align-items-center d-flex justify-content-between">
                        <div class="name">
                            <h5>${tool.name} </h5>
                            <p><i class="fa-regular fa-calendar-days"></i> <span class="release-date">${tool.published_in}</span></p>
                        </div>
                        <button onclick="loadApibyId(${tool.id})" class="btn text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-right-long"></i> </button>
                    </div>
                </div>
    `
        cardHolder.appendChild(div)
    });
    // stop spiner
    loadSpiner(false)
}
const loadSpiner = isLoad => {
    const spinerId = document.getElementById('loadingSpiner');
    if (isLoad) {
        spinerId.classList.remove('d-none')
    } else {
        spinerId.classList.add('d-none')
    }
}
const loadApibyId = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id = (id < 10) ? '0' + id : id}`
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => PlaceDetials(data.data))
}
const PlaceDetials = (data) => {

    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
    
        <div
            class="card-body bg-danger-subtle bg-opacity-25 p-5 w-50 container-fluid d-flex flex-column gap-4 rounded">
            <b id="box-description"> ${data.description} </b>
            <div class="d-flex gap-2 paymentPlan">
                <p>${data.pricing[0].plan} ${data.pricing[0].price}</p>
                <p>${data.pricing[1].plan} ${data.pricing[1].price}</p>
                <p>${data.pricing[2].plan} ${data.pricing[2].price}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center gx-3">
                <div>
                    <h4>Fetures</h4>
                    <ul id="features" class="text-secondary" style="margin-left: -10px;">
                        <li>${data.features[1].feature_name}</li>
                        <li>${data.features[2].feature_name}</li>
                        <li>${data.features[3].feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h4>Integrations</h4>
                    <ul id="integration" class="text-secondary">

                    </ul>
                </div>
            </div>
        </div>

    <div class="d-flex flex-column">
        <div class="card h-100" style="width: 100%;">
            <img src="${data.image_link[0]}"
                class="card-img-top h-75" alt="...">
                <div class="card-body">
                    <div
                        class="card-text text-center d-flex flex-column align-items-center justify-content-center">
                        <h4>Hey! How Are You Doing</h4>
                        <p class="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam, ipsa?</p>
                    </div>
                </div>
        </div>
    </div>
`;
    // integrations items 

    const integrationId = document.getElementById('integration');
    const integrations = data.integrations;
    integrations.forEach(eliment => {
        const li = document.createElement('li');
        li.innerText = eliment;
        integrationId.appendChild(li)
    })

};
loadApi(10)































const sortByDateButton = document.getElementById('sort-by-date-btn');
sortByDateButton.addEventListener('click', sortCardsByDate);

function sortCardsByDate() {
    const cardHolder = document.getElementById('card-holder');
    const cards = Array.from(cardHolder.querySelectorAll('.card')).sort(compareByDate);

    // Clear the card holder
    cardHolder.innerHTML = '';

    // Append the sorted cards back to the card holder
    cards.forEach(card => cardHolder.appendChild(card));
}

function compareByDate(a, b) {
    const aDate = new Date(a.querySelector('.release-date').textContent);
    const bDate = new Date(b.querySelector('.release-date').textContent);

    return aDate - bDate;
}
const d = new Date("12/1/2021");
console.log(d)
// Rest of your code...

 // Initial data load


