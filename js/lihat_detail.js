const url_document = window.location.href
const params = parseURLParams(url_document)
let url_ajax = `${url}?apikey=${apiKey}&i=${params.id[0]}`

const titlePage         = document.querySelector('#title-page')
const tahun             = document.querySelector('#tahun')
const formatHari        = document.querySelector('#hari')
const titleCard         = document.querySelector('#title-card')
const descriptionTitle  = document.querySelector('#title-card')
const card  = document.querySelector('#detail-card_description')

tahun.innerText = new Date().getFullYear()

setInterval(() => {
	let tanggal = new Date().getDate()
	let hari    = new Date().getDay()
	let bulan   = new Date().getMonth()
	let tahun   = new Date().getFullYear()
    let [jam, menit, detik] = formatWaktu(
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds()
    )

	formatHari.innerText = `${ubahKeHari(hari)}, ${tanggal} ${ubahKeBulan(bulan)} ${tahun} => ${jam}:${menit}:${detik}`
}, 1000)


function callAjax() {

    let ajax = new XMLHttpRequest()
    ajax.onreadystatechange = function() {
        if ( ajax.readyState === 4 && ajax.status === 200 ) {
            let data = JSON.parse(this.responseText)

            if (data.Response === "True") {
                titlePage.innerHTML        =  `Detail Page | ${data.Title}`
                descriptionTitle.innerHTML = data.Title

                let Actors = data.Actors.split(',')
                                        .map(item => `<li style="color:rgb(75, 74, 74); padding-left:1em; list-style:none;">${item}</li>`)
                                        .join('')
                
                let rootElement = document.querySelector('body')
                rootElement.addEventListener('load',function(event){
                    if (document.querySelector('#actors')) {
                        document.querySelector('#actors').innerHTML = Actors
                    }
                }, true)

                let content = ` <div class="image-description">
                                    <img src="${data.Poster}" alt="${data.Title}">
                                </div>
                                <div class="description_content">
                                    <h3>Detail Movie</h3>
                                    <hr/>
                                    <div class="description_content-group">
                                        <h3>Judul</h3>
                                        <hr/>
                                        <p>${data.Title}</p>
                                    </div>
                                    <div class="description_content-group">
                                        <h3>Tipe dan Genre</h3>
                                        <hr/>
                                        <p>${capitalize(data.Type)} (${data.Genre})</p>
                                    </div>
                                    <div class="description_content-group">
                                        <h3>Rilis Pada</h3>
                                        <hr/>
                                        <p>${data.Released}</p>
                                    </div>
                                    <div class="description_content-group">
                                        <h3>Penulis</h3>
                                        <hr/>
                                        <p>${data.Writer}</p>
                                    </div>
                                    <div class="description_content-group">
                                        <h3>Direktur</h3>
                                        <hr/>
                                        <p>${data.Director}</p>
                                    </div>
                                    <div class="description_content-group">
                                        <h3>Negara</h3>
                                        <hr/>
                                        <p>${data.Country}</p>
                                    </div>
                                    <div class="description_content-group">
                                        <h3>Durasi</h3>
                                        <hr/>
                                        <p>${data.Runtime}</p>
                                    </div>
                                    <div class="description_content-group">
                                        <h3>Aktor</h3>
                                        <hr/>
                                        <ul class="actors" id="actors" style="padding-top:.5em;">
                                            
                                        </ul>
                                    </div>
                                    <div class="description_content-group">
                                        <h3>Negara</h3>
                                        <hr/>
                                        <p>UK, USA, Germany</p>
                                    </div>
                                </div>`
                
                document.getElementById('detail-card_error').innerHTML = ''
                card.innerHTML = content
                
            } else {
                document.getElementById('detail-card_error').innerHTML = '<h2>Maaf, telah terjadi kesalahan.</h2>'
            }
        }
    }
    ajax.open('GET', url_ajax, true)
    ajax.send()
}

function makeList() {
    return true
}