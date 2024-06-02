let isCollapsed;
let isDark;

//active links
const links = document.querySelectorAll(".link");
// adding active class to the clicking link
links.forEach(link => {
    link.addEventListener("click",()=>{
        document.querySelector(".active").classList.remove("active")
        link.classList.add("active")
    })
});

// dropdown
document.querySelector("#projectList").addEventListener("click",function(){
    const id = this.getAttribute('data-target');
    const cl = this.getAttribute("data-toggle");
    document.getElementById("chevron").classList.toggle("open");
    document.querySelector(`${id}`).classList.toggle(`${cl}`);
});

// get localStorage items
function getItemToLS(){
    return localStorage.getItem("settings");
}
// add localStorage items
function setItemToLS(item,data){
    localStorage.setItem(`${item}`,JSON.stringify(data));
}

//handle sidebar collapsing;
document.querySelector(".sidebar-toggler").addEventListener("click",sidebarToggle);
// toggle side bar
function sidebarToggle(){
    if(!isCollapsed){
        isCollapsed = true;
    }else{
        isCollapsed = false
    }
    sidebarLS(isCollapsed)
    sidebarUI(isCollapsed)
}
//handle sidebar in the UI
function sidebarUI(bool){
    if(bool){
        document.querySelector(".sidebar-toggler").classList.add("no-expand");
        document.querySelector(`#side`).classList.add("collapsed");
    }else{
        document.querySelector(".sidebar-toggler").classList.remove("no-expand");
        document.querySelector(`#side`).classList.remove("collapsed");
    }

}
//handle sidebar in the localstorage
function sidebarLS(val){
    let settings;
    if(!getItemToLS()){
        // if LS doesn't contains any item called setting add it.
        setItemToLS("settings",{collapsed:{isCollapsed:val}})

    }else if(getItemToLS() && !JSON.parse(getItemToLS()).collapsed){
         // if LS contains settings but not collapsed value add it.
        settings = JSON.parse(getItemToLS());
        settings.collapsed = {isCollapsed:val};
        setItemToLS("settings",settings);

    }else{
        // if LS contains settings modify it.
        settings = JSON.parse(getItemToLS());
        settings.collapsed = {isCollapsed:val}
        localStorage.setItem(`settings`,JSON.stringify(settings));
    }
}

//handle theme mode;
const swicther = document.querySelector("#theme-mode");
swicther.addEventListener("click",themeToggle);

// toggle theme mode;
function themeToggle(){
    themeUI(this.checked);
    themeLS(this.checked)
}
// handle theme in the UI
function themeUI(bool){
    if(bool){
        document.body.classList.add("dark");
        swicther.checked = true;
    }else{
        document.body.classList.remove("dark");
        swicther.checked = false;
    }
}
// handle theme in the LS
function themeLS(val){
    if(!getItemToLS()){
        // if LS doesn't contains any item called setting add it.
        setItemToLS("settings",{theme:{isDark:val}});

    }else if(getItemToLS() && !JSON.parse(getItemToLS()).theme){
        // if LS contains settings but not theme value add it.
        settings = JSON.parse(getItemToLS());
        settings.theme = {isDark:val};
        setItemToLS("settings",settings);

    }else{
        // if LS contains theme modify it.
        settings = JSON.parse(getItemToLS());
        settings.theme = {isDark:val}
        localStorage.setItem(`settings`,JSON.stringify(settings));
    }
}
        

window.addEventListener("DOMContentLoaded",()=>{
    const settings = JSON.parse(getItemToLS("settings"));
    if(settings){
        if(settings.theme && settings.collapsed){
            isDark = settings.theme.isDark;
            themeUI(isDark);
            isCollapsed = settings.collapsed.isCollapsed;
            sidebarUI(isCollapsed)
        }
        if(settings.theme && !settings.collapsed){
            isDark = settings.theme.isDark;
            themeUI(isDark);
        }
        if(!settings.theme && settings.collapsed){
            isCollapsed = settings.collapsed.isCollapsed;
            sidebarUI(isCollapsed);

            if(window.matchMedia("(prefers-color-scheme:dark)").matches){
                themeUI(true); 
            }
        }
    }else{
        if(window.matchMedia("(prefers-color-scheme:dark)").matches){
            themeUI(true); 
        }
    }
    
});