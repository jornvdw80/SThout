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

const newsTemplate = document.querySelector('.data-news');
const container = document.querySelector('.container');

fetch('Data/users.json')
    .then(response => response.json())
    .then(data => {
        data.map(news => {
            const item = newsTemplate.content.cloneNode(true).children[0]
            const newsItem = item.querySelector('.newsItem')
            const newsInfo = item.querySelector('.newsInfo')
            newsItem.id = '#' + news.id
            newsInfo.id = news.id
            const title = item.querySelector('.newsTitle')
            const subTitle = item.querySelector('.newsSubTitle')
            title.textContent = news.firstname
            subTitle.textContent = news.lastname
            subTitle.title = news.website;
            container.append(listItem)
        })
    })
    .catch(error => console.error(error))