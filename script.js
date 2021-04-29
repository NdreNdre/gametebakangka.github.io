// music function
const audio = document.getElementById('song-bgm');
const icon = document.getElementById('icon-music');
const volumes = document.getElementById('volume');
icon.addEventListener('click', function () {
  if (audio.paused) {
    audio.play();
    icon.src = 'img/pause-music.png';
  } else {
    audio.pause();
    icon.src = 'img/play-music.png';
  }
});
volume.addEventListener('input', function () {
  audio.volume = volumes.value / 100;
});

// ------------ content --------------------
const clickSound = new Audio();
const startSound = new Audio();
const startTebak = new Audio();
const salahTebak = new Audio();
const benarTebak = new Audio();
const jawabanAngka = new Audio();
jawabanAngka.volume = 30 / 100;
jawabanAngka.src = 'sound/showanswer1.wav';
startTebak.src = 'sound/gamestart1.wav';
clickSound.src = 'sound/click1.mp3';
startSound.src = 'sound/start1.ogg';
salahTebak.src = 'sound/wrong1.wav';
benarTebak.src = 'sound/correct1.wav';
const container = document.querySelector('.container');
const contentAwal = document.querySelector('.awal');
const contentLevel = document.querySelector('.pilih-level');
const contentKesulitan = document.querySelector('.pilih-kesulitan');
const detailLevel = contentKesulitan.querySelector('h2');
const detailKesulitan = contentKesulitan.querySelector('.isi-detail h1');
const isiDetailKesulitan = contentKesulitan.querySelector('.isi-detail p');
const contentJawab = document.querySelector('.tempat-jawab');
const tampilNyawa = contentJawab.querySelector('h1');
const tampilClue = contentJawab.querySelector('h2');
const tampilLevel = contentJawab.querySelector('h3');
const isiRandomClue = contentJawab.querySelector('p');
const tebakanUser = contentJawab.querySelector('input');
const hasilUser = contentJawab.querySelector('.isi-hasil h1');
const hasilJawaban = contentJawab.querySelector('.isi-jawaban h1');
const ulang = document.getElementById('ulang');
const ulang2 = document.getElementById('repeat');
const contentKelar = document.querySelector('.game-over');
const tampilJawaban = contentKelar.querySelector('h1');

let maxTebakan = 0;
let randomAngka = 0;
let nyawa = 5;
let clue = 0;
let batasClue = 0;
let rangeClue = 0;
let tempHelp = 0;

contentAwal.style.display = 'block';
container.addEventListener('click', function (e) {
  // menampilkan halaman pilih level
  if (e.target.getAttribute('id') == 'play') {
    contentAwal.style.display = 'none';
    contentLevel.style.display = 'block';
    startSound.play();
  }
  // membuat random angka untuk ditebak nanti
  if (e.target.className == 'btn-level') {
    // menentukan nilai max tebakan (berdasarkan level yang dipilih) dan jumlah random clue
    if (e.target.value == 1) {
      maxTebakan = 20;
      clue = 1;
    } else if (e.target.value == 2) {
      maxTebakan = 40;
      clue = 2;
    } else if (e.target.value == 3) {
      maxTebakan = 60;
      clue = 3;
    }
    randomAngka = Math.round(Math.random() * maxTebakan);
    if (randomAngka == 0) {
      randomAngka += +1;
    }
    clickSound.play();
    // menampilkan halaman pilih kesulitan
    contentLevel.style.display = 'none';
    contentKesulitan.style.display = 'block';
  }
  // menampilkan level yang dipilih
  detailLevel.innerHTML = 'Tebakan : 1 - ' + maxTebakan;
  // jika user kembali dari pilih kesulitan ke level
  if (e.target.getAttribute('id') == 'kembali') {
    contentLevel.style.display = 'block';
    contentKesulitan.style.display = 'none';
    // randomAngka = 0;
    maxTebakan = 0;
    clickSound.play();
  }
  // bunyi-bunyian
  if (e.target.getAttribute('id') == 'close-detail' || e.target.className == 'btn-kesulitan' || e.target.getAttribute('id') == 'close-clue') {
    clickSound.play();
  }
  // detail kesulitan
  if (e.target.className == 'btn-kesulitan' && e.target.value == 1) {
    nyawa = 7;
  } else if (e.target.className == 'btn-kesulitan' && e.target.value == 2) {
    nyawa = 5;
  } else if (e.target.className == 'btn-kesulitan' && e.target.value == 3) {
    nyawa = 3;
  }
  isiDetailKesulitan.innerHTML = 'Nyawa = ' + nyawa + '<br>Random Clue = ' + clue + '<br><br>!!! WARNING !!!<br>CLUE BISA SANGAT RANDOM/ABSURD';

  //   pindah ke tempat jawab
  if (e.target.className == 'mulai-main') {
    contentKesulitan.style.display = 'none';
    contentJawab.style.display = 'block';
    startTebak.play();
  }
  //   random clue generate
  if (e.target.className == 'clue-pop') {
    batasClue = Math.round(Math.random() * 3);
    rangeClue = Math.round(Math.random() * 10 + 1);
    clickSound.play();
    clue--;
    // jika clue sudah habis
    if (clue > -1) {
      // Menampilkan random clue
      if (batasClue == 0 || batasClue == 2) {
        if (randomAngka - rangeClue < 1) {
          isiRandomClue.innerHTML = 'Jawaban > ' + (randomAngka - rangeClue) + '<br><br>ZONK !!!';
        } else {
          isiRandomClue.innerHTML = 'Jawaban > ' + (randomAngka - rangeClue);
        }
      } else if (batasClue == 1 || batasClue == 3) {
        if (randomAngka + rangeClue > maxTebakan) {
          isiRandomClue.innerHTML = 'Jawaban < ' + (randomAngka + rangeClue) + '<br><br>ZONK !!!';
        } else {
          isiRandomClue.innerHTML = 'Jawaban < ' + (randomAngka + rangeClue);
        }
      }
    } else {
      isiRandomClue.innerHTML = 'CLUE ANDA SUDAH HABIS !!!';
      clue = 0;
    }
  }
  // mengambil jawaban user
  if (e.target.className == 'hasil-tebak') {
    if (tebakanUser.value != randomAngka) {
      salahTebak.play();
      if (tebakanUser.value > maxTebakan || tebakanUser.value < 1) {
        hasilUser.innerHTML = 'SALAH <br><br> Jawaban melewati batas';
        tebakanUser.value = '';
      } else if (tebakanUser.value < randomAngka) {
        hasilUser.innerHTML = 'SALAH <br><br> Jawaban terlalu kecil';
        nyawa--;
      } else if (tebakanUser.value > randomAngka) {
        hasilUser.innerHTML = 'SALAH <br><br> Jawaban terlalu besar';
        nyawa--;
      }
    } else if (tebakanUser.value == randomAngka) {
      benarTebak.play();
      hasilUser.innerHTML = 'BENAR !!! <br><br> YEYYY JAWABAN ANDA BENARR<br>';
      tempHelp = 1;
    }
    if (nyawa == 0) {
      hasilUser.innerHTML = 'Kesempatan<br>anda sudah<br>habis !!!';
      nyawa = 0;
    }
  }

  if (nyawa < 1) {
    hasilUser.innerHTML = 'Kesempatan<br>anda sudah<br>habis !!!';
    nyawa = 0;
    if (e.target.className == 'selesai') {
      contentJawab.style.display = 'none';
      contentKelar.style.display = 'block';
      jawabanAngka.play();
    }
  }
  if (tempHelp == 1) {
    if (e.target.className == 'selesai') {
      contentJawab.style.display = 'none';
      contentKelar.style.display = 'block';
      jawabanAngka.play();
    }
  }

  //   menampilkan nyawa dan random clue
  tampilNyawa.innerHTML = 'Nyawa : ' + nyawa;
  tampilClue.innerHTML = 'Random Clue : ' + clue + '<a href="#random-clue"><img src="img/lightbulb1.png" class="clue-pop" /></a>';
  tampilLevel.innerHTML = 'Tebakan : 1 - ' + maxTebakan;
  tampilJawaban.innerHTML = 'Jawabannya Adalah<br><br>' + randomAngka + ' !!!!';
  console.log('Nih jawabannya : ' + randomAngka);
});

ulang.addEventListener('click', function () {
  contentAwal.style.display = 'block';
  contentJawab.style.display = 'none';
  maxTebakan = 0;
  randomAngka = 0;
  nyawa = 0;
  clue = 0;
  batasClue = 0;
  rangeClue = 0;
  tebakanUser.value = '';
  clickSound.play();
});
ulang2.addEventListener('click', function () {
  contentAwal.style.display = 'block';
  contentKelar.style.display = 'none';
  maxTebakan = 0;
  randomAngka = 0;
  nyawa = 0;
  clue = 0;
  batasClue = 0;
  rangeClue = 0;
  tebakanUser.value = '';
  clickSound.play();
});

// selesai.addEventListener('click', function () {
//
// });

// fungsi angka only di inputan
const angkaOnly = document.querySelector('.tempat-jawab input');
angkaOnly.onkeypress = function (e) {
  let angka = e.which ? e.which : e.keyCode;
  if (angka > 31 && (angka < 48 || angka > 57)) return false;
  return true;
};
