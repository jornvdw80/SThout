const dataTemplate = document.querySelector('.data-template');
const container = document.querySelector('.container');
console.log(dataTemplate);


fetch('Data/users.json')
    .then(res => res.json())
    .then(data => {
        data.map(user => {
            const card = dataTemplate.content.cloneNode(true).children[0]
            const name = card.querySelector('.name')
            const email = card.querySelector('.email')
            name.textContent = user.firstname
            email.textContent = user.email
            container.append(card)
        })
    })
    .catch(error => console.error(error))