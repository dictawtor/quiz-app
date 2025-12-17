const levels = document.querySelectorAll('a');
const selectHandler = (e) => {
    const level = e.target.innerText.toLowerCase();
    localStorage.setItem('level', level);
    window.location.assign(" ./index.html");
}   

levels.forEach((level) => {
    level.addEventListener('click', selectHandler);
});