export {Start}

function Start(): void {    
    const navBar: HTMLElement = document.getElementById('nav-bar') as HTMLElement;
    
    ScrollDetection(navBar);

    if(screen.width <= 1024) {
        MobileNavToggle(navBar);
    }
}

function ScrollDetection(navBar: HTMLElement): void {

    const logoLink: HTMLAnchorElement = navBar.querySelector('.logo-link') as HTMLAnchorElement;

    const scrollCalculation = () => {
        if (window.scrollY > 150) {
            navBar.classList.add('scroll');
            logoLink.classList.add('remove-shadow');
        } else {
            navBar.classList.remove('scroll');
            logoLink.classList.remove('remove-shadow');
        }
    }

    window.addEventListener('load', scrollCalculation);
    window.addEventListener('scroll', scrollCalculation);
}

function MobileNavToggle(navBar: HTMLElement): void {

    const mobileNavButton: HTMLButtonElement = navBar.querySelector('#nav-mobile-button') as HTMLButtonElement;
    const navList: HTMLUListElement = navBar.querySelector('#nav-list') as HTMLUListElement;

    const buttonBars: NodeListOf<HTMLSpanElement> = mobileNavButton.querySelectorAll('.button-bar');

    const links: NodeListOf<HTMLAnchorElement> = navList.querySelectorAll('a');

    mobileNavButton.addEventListener('click', () => {
        mobileNavButton.classList.toggle('active');
        mobileNavButton.setAttribute('aria-expanded', mobileNavButton.classList.contains('active').toString());
        navList.classList.toggle('open');
        document.body.classList.toggle('no-scroll');

        //animation for the button bars
        buttonBars.forEach((bar: HTMLSpanElement) => {
            bar.classList.toggle('open');
        });
        
        //animation for the links
        links.forEach((link: HTMLAnchorElement) => {
            link.classList.toggle('expand');
        });

    });
}

Start();