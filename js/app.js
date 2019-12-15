const apiKey          = 'dca61bcc'
let url             = 'https://www.omdbapi.com/'
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

function formatWaktu(jam, menit, detik) {
	// console.log(jam)
	if (jam.toString().length == 1) {
		jam = '0'+jam
	}
	if (menit.toString().length == 1) {
		menit = '0'+menit
	}
	if (detik.toString().length == 1) {
		detik = '0'+detik
	}

	return [jam, menit, detik]
}

function ubahKeHari(hari) {
	if( hari == 1) return 'Senin'
	if( hari == 2) return 'Selasa'
	if( hari == 3) return 'Rabu'
	if( hari == 4) return 'Kamis'
	if( hari == 5) return "Jum'at"
	if( hari == 6) return 'Sabtu'
	if( hari == 0) return 'Minggu'
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

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

// const ajax = new XMLHttpRequest();
// ajax.onreadystatechange = function () {
// 	if (ajax.readyState == 4 && ajax.status == 200) {
// 			let data = JSON.parse(this.responseText)
// 			data = data.Search
// 	}
// }