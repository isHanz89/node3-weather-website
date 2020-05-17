console.log('Client side javascript file is loaded!')

//Example: using fetch API
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {

//         if (data.error) {
//             console.log(data.error)
//         }
//         else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

//to store the form element 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//setting addEventListener for form submit
weatherForm.addEventListener('submit', (e) => {

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    e.preventDefault() //prevent the postback!!

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + encodeURI(location)).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = "Error: " + data.error
            }
            else {
                // console.log(data.location)
                // console.log(data.forecast)
                messageOne.textContent = "Location: " + data.location
                messageTwo.textContent = "Forecast: " + data.forecast
            }
        })
    })

    //console.log(location)
})