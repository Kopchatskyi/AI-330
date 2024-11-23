interface Style {
    name: string;
    path: string;
}

//path to styles css
const styles: Style[] = [
    { name: "Style 1", path: "css/style.css" },
    { name: "Style 2", path: "css/style2.css" },
    { name: "Style 3", path: "css/style3.css" },
    { name: "Style 4", path: "css/style4.css" },
    { name: "Style 5", path: "css/style5.css" },
];

const curr_link = document.getElementById("list-stylesheet") as HTMLLinkElement;
const css_container = document.getElementById("style-links") as HTMLElement;

if (curr_link && css_container)
{
    styles.forEach((style) => 
    {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = style.name;
        link.style.marginRight = "10px";
        link.style.cursor = "pointer";
        link.onclick = (event) =>
        {
            event.preventDefault();
            curr_link.href = style.path;
            saveStyle(style.path);
        };
        css_container.appendChild(link);
    });
    loadStyle();
}



//localstorage save css
function loadStyle()
{
    const savedStyle = localStorage.getItem("selectedStyle");
    if (savedStyle && curr_link)
    {
        curr_link.href = savedStyle;
    }
}


function saveStyle(stylePath: string)
{
    localStorage.setItem("selectedStyle", stylePath);
}