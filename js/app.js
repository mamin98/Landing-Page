/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
*/

/**
 * Define Global Variables
 * 
*/

const fragment = document.createDocumentFragment(); // similar to <div> 
const navList = document.getElementById('navbar-List');
const allSections = document.getElementsByTagName('section'); // num of section in html page

/**
 * End Global Variables
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

 const navbar_position = section => {
    return Math.floor(section.getBoundingClientRect().top);
}


// build the nav
const create_navMenu = () =>{

    for(let sec of allSections){
        const listele = document.createElement('li');  
        listele.innerHTML = `<a class='menu-link' 
        sec-id='${sec.getAttribute('id')}'>
        ${sec.getAttribute('data-nav')}</a>`;
       // put link in list item
        fragment.appendChild(listele);
    }
    navList.appendChild(fragment);
}

 
 const queylistitem = document.querySelector('#navbar-List');

// Add class 'active'
 const addactive_Class = (cond, sec) => {
    if(cond){
        sec.classList.add('your-active-class');
        
        sec.setAttribute('style', 
        'box-shadow: 20px 20px 50px 15px #0f3057; border:1px solid green; border-radius:1px');
        const secId = sec.id.slice(7.8) -1;
        queylistitem.childNodes[secId].setAttribute('style', 'background-color: #cc0');
    }
}

// Remove class 'active'
 const removeactive_Class = sec => {
    sec.classList.remove('your-active-class');
    sec.setAttribute('style',
        'box-shadow: none; border:none; border-radius:none;');
        const secId = sec.id.slice(7.8) -1;
        queylistitem.childNodes[secId].setAttribute('style', 'background-color: none;');   
}



/**
 * End Main Functions 
*/

 // Scroll to section on link click
 
 this.addEventListener('click', scrolling = e => {
    let val = e.target;
    if(val.nodeName){
        document.getElementById(val.getAttribute('sec-id')).scrollIntoView({
            top: 50,
            left: 5,
            behavior: "auto",
            bottom: 0
        });
    
    }
});


 queylistitem.addEventListener('scroll', set_secNavbar = () =>{
        const top = 250; let bottom = -250; 
        for (let index = 0; index < allSections.length; index++) {
            
            const ele = navbar_position(allSections[index]);
            display = () => ele < top && ele >= bottom;
    
            removeactive_Class(allSections[index]);
            addactive_Class(display(), allSections[index]);
        }
 }
);


// Build(call) menu 
  
create_navMenu();

 