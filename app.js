// Candidate data
const candidates = [
  { name: "Alice", description: "Experienced leader in community projects.", image: "https://via.placeholder.com/100" },
  { name: "Bob", description: "Focused on environmental sustainability.", image: "https://via.placeholder.com/100" },
  { name: "Charlie", description: "Youth representative, tech-savvy.", image: "https://via.placeholder.com/100" },
  { name: "David", description: "Promotes education and social welfare.", image: "https://via.placeholder.com/100" }
];

let votes = new Array(candidates.length).fill(0);

// PAGES
const loginPage = document.getElementById('loginPage');
const mainPage = document.getElementById('mainPage');
const candidatesContainer = document.getElementById('candidatesContainer');
const voteStatus = document.getElementById('voteStatus');
const resultsDiv = document.getElementById('results');
const homeCandidates = document.getElementById('homeCandidates');

// LOGIN
document.getElementById('loginBtn').addEventListener('click', () => {
  loginPage.classList.remove('active');
  mainPage.classList.add('active');
  loadCandidates();
  loadHomeCandidates();
  showTab('homeTab');
});

// TABS
const tabLinks = document.querySelectorAll('.tablink');
tabLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const tab = e.target.dataset.tab;
    showTab(tab);
  });
});

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  if(confirm("Do you want to logout?")) {
    mainPage.classList.remove('active');
    loginPage.classList.add('active');
    voteStatus.innerHTML = "";
    votes = new Array(candidates.length).fill(0); // reset votes
  }
});

// LOAD VOTING CANDIDATES
function loadCandidates() {
  candidatesContainer.innerHTML = "";
  candidates.forEach((c, index) => {
    const card = document.createElement('div');
    card.className = 'candidate-card';
    card.innerHTML = `<h3>${c.name}</h3>`;
    card.addEventListener('click', () => vote(index));
    candidatesContainer.appendChild(card);
  });
}

// LOAD HOME CANDIDATES
function loadHomeCandidates() {
  homeCandidates.innerHTML = "";
  candidates.forEach(c => {
    const card = document.createElement('div');
    card.className = 'candidate-card';
    card.innerHTML = `
      <img src="${c.image}" alt="${c.name}">
      <h3>${c.name}</h3>
      <p>${c.description}</p>
    `;
    homeCandidates.appendChild(card);
  });
}

// VOTE
function vote(index) {
  votes[index]++;
  voteStatus.innerHTML = `<p>You voted for <strong>${candidates[index].name}</strong>!</p>`;
  animateVoteCard(index);
  loadResults();
}

function loadResults() {
  let html = "<ul>";
  const maxVotes = Math.max(...votes, 1);
  votes.forEach((count, index) => {
    const width = (count / maxVotes) * 100;
    html += `<li>${candidates[index].name}: ${count} votes
               <span class="progress-bar" style="width:${width}%"></span>
             </li>`;
  });
  html += "</ul>";
  resultsDiv.innerHTML = html;
}

function animateVoteCard(index) {
  const card = candidatesContainer.children[index];
  card.style.transform = "scale(1.1)";
  setTimeout(() => card.style.transform = "scale(1)", 300);
}
