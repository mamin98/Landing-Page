/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const fragment = document.createDocumentFragment(); // similar to <div> 
const navList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

 const createAnchor = (id, name)=> {
    
    let htmltext = `<a class='menu__link' data-id='${id}'>${name}</a>`;
    return htmltext;
} 

const nav_bar_position = section => {
    return Math.floor(section.getBoundingClientRect().top);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const create_Nav_Menu = () =>{
    for(let section of sections){
        const newItem = document.createElement('li');
        const itemId = section.getAttribute('id');
        const itemName = section.getAttribute('data-nav');
        newItem.innerHTML = createAnchor(itemId, itemName);

        fragment.appendChild(newItem);
    }
    const childList = document.getElementById('navbar__list');
    childList.appendChild(fragment);
}

// Add class 'active'
const add_active_Class = (cond, sec) => {
    if(cond){
        sec.classList.add('your-active-class');
        sec.style.cssText= 'box-shadow: 20px 20px 50px 15px #0f3057; border:1px solid green; border-radius:1px';
        const secId = sec.id.slice(7.8) -1;
        navList.childNodes[secId].style.cssText = 'background-color: #fff';
    }
}

// Remove class 'active'
 const remove_active_Class = sec => {
        sec.classList.remove('your-active-class');
        sec.setAttribute('style',
        'box-shadow: none; border:none; border-radius:none;');
        const secId = sec.id.slice(7.8) -1;
        navList.childNodes[secId].setAttribute('style', 'background-color: none;');   
}

// Scroll to anchor ID using scrollTO event

const set_section_navbar = () =>{
    for (let index = 0; index <sections.length; index++) {
        const element = nav_bar_position(sections[index]);
        display = () => element < 250 && element >= -250;

        remove_active_Class(sections[index]);
        add_active_Class(display(), sections[index]);
    }
 }

  const scroll_Element = (event) => {
    if(event.target.nodeName === 'A'){
        const secScroll = event.target.getAttribute('data-id');
        const sec = document.getElementById(secScroll);
        sec.scrollIntoView({
            behavior: "smooth"
        });
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

navList.addEventListener('click', function(e){
    scroll_Element(e)
  })

// Build menu 
  
  create_Nav_Menu();

// Scroll to section on link click
window.addEventListener('scroll' ,set_section_navbar);
// Set sections as active