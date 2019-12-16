const searchButton  = document.querySelector('#search-button')
const searchInput   = document.querySelector('#search-input')
const bodyContent   = document.querySelector('#body-content')
const links         = document.querySelectorAll('.link-item')
const titleBody     = document.querySelector('#title-body')
const tahun         = document.querySelector('#tahun')
const formatHari    = document.querySelector('#hari')
let content         = []

tahun.innerText = new Date().getFullYear()

setInterval(() => {
	let tanggal = new Date().getDate()
	let hari    = new Date().getDay()
	let bulan   = new Date().getMonth()
	let tahun   = new Date().getFullYear()
	let jam     = new Date().getHours()
	let menit   = new Date().getMinutes()
	let detik   = new Date().getSeconds()

	formatHari.innerText = `${ubahKeHari(hari)}, ${tanggal} ${ubahKeBulan(bulan)} ${tahun} => ${jam}:${menit}:${detik}`
}, 1000)

links.forEach(function(element) {
	element.addEventListener('click', function() {
		links.forEach(function(e) {
			e.classList.remove('active')
		})
		element.classList.add('active')
	})
})

searchButton.addEventListener('click', function() {
	let data = convertToCapital(searchInput.value.toLowerCase())

	url = `${url}?apikey=${apiKey}&s=${data}`
	bodyContent.innerHTML = ''
	getAllData(url)
})

searchInput.addEventListener('keyup', function(e) {
	let data = convertToCapital(searchInput.value.toLowerCase())

	if (e.keyCode == 13) {
		url = `${url}?apikey=${apiKey}&s=${data}`
		bodyContent.innerHTML = ''
		titleBody.innerHTML = ''
		getAllData(url)
	}
})


function getAllData(url) {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
				let data = JSON.parse(this.responseText)

				if (data.Response === 'True') {

					titleBody.innerHTML = 'List Movie Favoritmu'
					data = data.Search
					data.forEach(function(e) {
						content.push(`<div class="card">
													<img src="${e.Poster}" alt="" class="image-title"/>
													<h4 class="title">${e.Title}</h4>
													<h4 class="type">${capitalize(e.Type)}</h4>
													<h4 class="released">${e.Year}</h4>
													<a href="lihat_detail.html?id=${e.imdbID}" class="link-card-item">See detail</a>
												</div>`)
					})

					content.forEach(function(e) {
						bodyContent.innerHTML += e
					})

				} else {
					bodyContent.innerHTML = `<h2 style="color: black; margin: 0 auto; align-self: center;">Movie yang anda cari tidak ditemukan!</h2>`
				}
		}
	}

	xhr.open('GET', url, true)
	xhr.send()
}

// ajax.open('GET', 'http://www.omdbapi.com/?apikey=dca61bcc&s=Harry Potter', true)
// ajax.send()