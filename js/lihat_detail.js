const url_document = window.location.href
const params = parseURLParams(url_document)
let id = params.id[0]
let url_ajax = `${url}?apikey=${apiKey}&i=${id}`

const titlePage = document.querySelector('#title-page')
titlePage.innerHTML = `Detail Page | `

function callAjax() {
    console.log('Oke')
    let ajax = new XMLHttpRequest()
    ajax.onreadystatechange = function() {
        if ( ajax.readyState === 4 && ajax.status === 200 ) {
            let data = JSON.parse(this.responseText)
            console.log(data)
        }
    }
    ajax.open('GET', url_ajax, true)
    ajax.send()
}
