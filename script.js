const songs = [
  { title: "Hey Minnale", file: "Hey Minnale.mp3", url: "https://res.cloudinary.com/xk50zkai/video/upload/v1795266395/Hey_Minnale.mp3", c1: "#8d2f46", c2: "#e59678" },
  { title: "Tamilselvi", file: "Tamilselvi.mp3", url: "https://res.cloudinary.com/xk50zkai/video/upload/v1795266390/Tamilselvi.mp3", c1: "#1d7181", c2: "#ddbd72" },
  { title: "Ooroda Oththa Don", file: "Ooroda Oththa Don.mp3", url: "https://res.cloudinary.com/xk50zkai/video/upload/v1795266388/Ooroda_Oththa_Don.mp3", c1: "#b54b35", c2: "#3d1b43" },
  { title: "Single Pasanga", file: "Single-Pasanga-MassTamilan.org.mp3", url: "https://res.cloudinary.com/xk50zkai/video/upload/v1795266383/Single-Pasanga-MassTamilan.org.mp3", c1: "#4c64ad", c2: "#e5a067" },
  { title: "Senjitaley", file: "Senjitaley.mp3", url: "https://res.cloudinary.com/xk50zkai/video/upload/v1795266383/Senjitaley.mp3", c1: "#a8445f", c2: "#efb55f" },
  { title: "Enna Nadanthalum", file: "Enna-Nadanthalum-MassTamilan.com.mp3", url: "https://res.cloudinary.com/xk50zkai/video/upload/v1795266382/Enna-Nadanthalum-MassTamilan.com.mp3", c1: "#246b53", c2: "#91bda2" },
  { title: "Pallikoodam - The Farewell Song", file: "Pallikoodam-The-Farewell-Song-MassTamilan.org.mp3", url: "https://res.cloudinary.com/xk50zkai/video/upload/v1795266379/Pallikoodam-The-Farewell-Song-MassTamilan.org.mp3", c1: "#7a4b8b", c2: "#e0b5ae" },
  { title: "Karuppa Kooda Va", file: "Karuppa Kooda Va.mp3", url: "https://res.cloudinary.com/xk50zkai/video/upload/v1795266378/Karuppa_Kooda_Va.mp3", c1: "#4b5e31", c2: "#cf9d55" },
  { title: "Erangi Vandhu", file: "Erangi Vandhu.mp3", url: "https://res.cloudinary.com/xk50zkai/video/upload/v1795266377/Erangi_Vandhu.mp3", c1: "#b5474a", c2: "#eea452" },
  { title: "Machi Engalukku Ellam", file: "Machi-Engalukku-Ellam-MassTamilan.com.mp3", url: "https://res.cloudinary.com/xk50zkai/video/upload/v1795266376/Machi-Engalukku-Ellam-MassTamilan.com.mp3", c1: "#3a668f", c2: "#b7cbd0" },
  { title: "Adiye Sakkarakatti", file: "Adiye-Sakkarakatti-MassTamilan.com.mp3", url: "https://res.cloudinary.com/xk50zkai/video/upload/v1795266358/Adiye-Sakkarakatti-MassTamilan.com.mp3", c1: "#7d2c4c", c2: "#f18b75" }
];

const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const heroPlay = document.getElementById("heroPlay");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");
let currentIndex = 0;

function initial(title) {
  return title.trim().charAt(0).toUpperCase();
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

function setRangeFill(range) {
  const percent = ((range.value - range.min) / (range.max - range.min)) * 100;
  range.style.setProperty("--fill", `${percent}%`);
}

function renderCards() {
  const grid = document.getElementById("trackGrid");
  grid.innerHTML = songs.slice(0, 10).map((song, index) => `
    <article class="track-card" data-index="${index}">
      <div class="card-cover" style="--c1:${song.c1};--c2:${song.c2}">
        ${initial(song.title)}
      </div>
      <strong>${song.title}</strong>
      <small>Tamil Hits · Playlist</small>
      <button class="card-play" type="button" aria-label="Play ${song.title}" data-index="${index}">▶</button>
    </article>
  `).join("");
}

function renderTable() {
  const table = document.getElementById("songTable");
  table.innerHTML = songs.map((song, index) => `
    <div class="song-row" data-index="${index}">
      <span class="row-number">${index + 1}</span>
      <div class="row-title">
        <div class="row-cover" style="--c1:${song.c1};--c2:${song.c2}">${initial(song.title)}</div>
        <div style="min-width:0">
          <strong>${song.title}</strong>
          <small>Tamil Hits</small>
        </div>
      </div>
      <span class="row-album">Tamil Hits</span>
      <span class="row-duration" data-duration-index="${index}">--:--</span>
    </div>
  `).join("");
}

function loadSong(index, autoplay = true) {
  currentIndex = (index + songs.length) % songs.length;
  const song = songs[currentIndex];
  document.getElementById("nowTitle").textContent = song.title;
  document.getElementById("nowInitial").textContent = initial(song.title);
  const nowCover = document.getElementById("nowCover");
  nowCover.style.background = `linear-gradient(145deg, ${song.c1}, ${song.c2})`;
  audio.src = song.url;
  if (autoplay) {
    audio.play().catch(() => {
      playButton.textContent = "▶";
      heroPlay.textContent = "▶";
    });
  }
  document.title = `${song.title} · Spotify`;
}

function togglePlay() {
  if (!audio.src) loadSong(currentIndex);
  if (audio.paused) audio.play().catch(() => {});
  else audio.pause();
}

renderCards();
renderTable();
loadSong(0, false);
audio.volume = Number(volumeBar.value);
setRangeFill(progressBar);
setRangeFill(volumeBar);

document.getElementById("trackGrid").addEventListener("click", (event) => {
  const target = event.target.closest("[data-index]");
  if (target) {
    const index = Number(target.dataset.index);
    loadSong(index);
  }
});
document.getElementById("songTable").addEventListener("click", (event) => {
  const row = event.target.closest(".song-row");
  if (row) loadSong(Number(row.dataset.index));
});
playButton.addEventListener("click", togglePlay);
heroPlay.addEventListener("click", () => {
  if (audio.src && !audio.paused) audio.pause();
  else togglePlay();
});
document.getElementById("prevButton").addEventListener("click", () => loadSong(currentIndex - 1));
document.getElementById("nextButton").addEventListener("click", () => loadSong(currentIndex + 1));
document.getElementById("shuffleButton").addEventListener("click", () => {
  let next = currentIndex;
  while (next === currentIndex) next = Math.floor(Math.random() * songs.length);
  loadSong(next);
});
document.getElementById("repeatButton").addEventListener("click", () => {
  audio.loop = !audio.loop;
  document.getElementById("repeatButton").style.color = audio.loop ? "#1ed760" : "";
});
document.getElementById("heartButton").addEventListener("click", (event) => {
  event.currentTarget.classList.toggle("saved");
  event.currentTarget.textContent = event.currentTarget.classList.contains("saved") ? "♥" : "♡";
});

audio.addEventListener("play", () => {
  playButton.textContent = "Ⅱ";
  heroPlay.textContent = "Ⅱ";
});
audio.addEventListener("pause", () => {
  playButton.textContent = "▶";
  heroPlay.textContent = "▶";
});
audio.addEventListener("loadedmetadata", () => {
  document.getElementById("duration").textContent = formatTime(audio.duration);
});
audio.addEventListener("timeupdate", () => {
  document.getElementById("currentTime").textContent = formatTime(audio.currentTime);
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    setRangeFill(progressBar);
  }
});
audio.addEventListener("ended", () => loadSong(currentIndex + 1));
audio.addEventListener("error", () => {
  const song = songs[currentIndex];
  if (audio.src && !audio.src.endsWith(encodeURI(song.file))) {
    audio.src = `songs/${encodeURI(song.file)}`;
  }
});
progressBar.addEventListener("input", () => {
  setRangeFill(progressBar);
  if (audio.duration) audio.currentTime = (progressBar.value / 100) * audio.duration;
});
volumeBar.addEventListener("input", () => {
  audio.volume = Number(volumeBar.value);
  setRangeFill(volumeBar);
});
