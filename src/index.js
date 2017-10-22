require('./index.css');

const root = document.getElementById("root");
root.innerHTML = "<div>Hello World!</div>";

if (module.hot) {
    module.hot.accept();
}
