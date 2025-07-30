export {Start}

function Start() {
    const scrollEffects: PageScrollEffects = new PageScrollEffects();
    scrollEffects.scrollEvent();

    

}

//simple class to handle scroll effects on the index page and seperate the logic
class PageScrollEffects {
    specialtyCards: HTMLCollectionOf<HTMLLIElement> | null = null;
    dependencyCards: HTMLCollectionOf<HTMLLIElement> | null = null;

    constructor() {
        this.init();
    }

    init() {
        const serviceSection = document.getElementById("home-service-section") as HTMLElement;
        this.specialtyCards = serviceSection.getElementsByClassName("service-card") as HTMLCollectionOf<HTMLLIElement>;

        this.dependencyCards = document.getElementsByClassName("stat-card") as HTMLCollectionOf<HTMLLIElement>;
    }

    scrollEvent() {
        if(this.specialtyCards)
            this.ListenForScroll(this.specialtyCards);
        if(this.dependencyCards)
            this.ListenForScroll(this.dependencyCards);
    }

    ListenForScroll(target: HTMLCollectionOf<HTMLLIElement>) {
        const observerFunction = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if(!entry.isIntersecting) {
                    return;
                } else if (entry.isIntersecting) {
                    const target = entry.target as HTMLLIElement;
                    target.classList.add("appear");
                    observer.unobserve(target);
                }
            })
        }

        const options: IntersectionObserverInit = {
            threshold: 1
        };

        const onScrollAppear = new IntersectionObserver(observerFunction, options);

        if(target) {
            for(let i: number = 0; i < target.length; i++) {
                onScrollAppear.observe(target[i]);
            }
        }
    }
}



Start();