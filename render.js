////const dataTemplate = document.querySelector('.data-template');
////const container = document.querySelector('.container');
////console.log(dataTemplate);

////fetch('Data/users.json')
////    .then(response => response.json())
////    .then(data => {
////        data.map(user => {
////            const card = dataTemplate.content.cloneNode(true).children[0]
////            const name = card.querySelector('.name')
////            const email = card.querySelector('.email')
////            name.textContent = user.firstname
////            email.textContent = user.email
////            container.append(card)
////        })
////    })
////    .catch(error => console.error(error))

const news = document.querySelector('.data-news');
const container = document.querySelector('.container');

fetch('Data/users.json')
    .then(response => response.json())
    .then(data => {
        data.map(user => {
            const card = news.content.cloneNode(true).children[0]
            const name = card.querySelector('.newsTitle')
            const email = card.querySelector('.newsSubTitle')
            name.textContent = user.firstname
            email.textContent = user.lastname
            email.title = user.website;
            container.append(card)
        })
    })
    .catch(error => console.error(error))