let apiKey          = 'dca61bcc'
let url             = 'https://www.omdbapi.com/'
const searchButton  = document.querySelector('#search-button')
const searchInput   = document.querySelector('#search-input')
const bodyContent   = document.querySelector('#body-content')
const links         = document.querySelectorAll('.link-item')
const titleBody     = document.querySelector('#title-body')
const tahun     = document.querySelector('#tahun')
const formatHari     = document.querySelector('#hari')
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
													<a href="" class="link-card-item">See detail</a>
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

let error = new Error()
error.name = "Bukan string!"

function capitalize(string) {
	if (typeof string !== 'string') return error
	return string.replace(string.charAt(0), string.charAt(0).toUpperCase())
}

function convertToCapital(string) {
	if (typeof string !== 'string') return error
	return string.split(' ').map((item, index) => capitalize(item)).join(' ')
}

function hasNumber(myString) {
  return /\d/.test(myString);
}


function ubahKeHari(hari) {
	if( hari === 1) return 'Senin'
	if( hari === 2) return 'Selasa'
	if( hari === 3) return 'Rabu'
	if( hari === 4) return 'Kamis'
	if( hari == 5) return "Jum'at"
	if( hari == 6) return 'Sabtu'
	if( hari == 7) return 'Minggu'
}

function ubahKeBulan(bulan) {
	if ( bulan === 1 ) return 'Januari'
	if ( bulan === 2 ) return 'Februari'
	if ( bulan === 3 ) return 'Maret'
	if ( bulan === 4 ) return 'April'
	if ( bulan === 5 ) return 'Mei'
	if ( bulan === 6 ) return 'Juni'
	if ( bulan === 7 ) return 'Juli'
	if ( bulan === 8 ) return 'Agustus'
	if ( bulan === 9 ) return 'September'
	if ( bulan === 10 ) return 'Oktober'
	if ( bulan === 11 ) return 'November'
	if ( bulan === 12 ) return 'Desember'
}


// const ajax = new XMLHttpRequest();
// ajax.onreadystatechange = function () {
// 	if (ajax.readyState == 4 && ajax.status == 200) {
// 			let data = JSON.parse(this.responseText)
// 			data = data.Search
// 	}
// }

// ajax.open('GET', 'http://www.omdbapi.com/?apikey=dca61bcc&s=Harry Potter', true)
// ajax.send()