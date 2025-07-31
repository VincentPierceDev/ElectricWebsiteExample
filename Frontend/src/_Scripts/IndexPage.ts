export {Start}

function Start() {
    const scrollEffects: PageScrollEffects = new PageScrollEffects();
    scrollEffects.scrollEvent(); 
    
    const teamReel: TeamReel = new TeamReel();

    const teamButtonContainer: HTMLDivElement = document.getElementById("team-button-container") as HTMLDivElement;

    teamButtonContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if(target.id === "left-button")
            teamReel.ReelLeft();
        else if(target.id === "right-button")
            teamReel.ReelRight();
    })
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
                if(!entry.isIntersecting) return;
                const target = entry.target as HTMLLIElement;
                target.classList.add("appear");
                observer.unobserve(target);
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

class TeamReel {
    private teamCards: HTMLCollectionOf<HTMLLIElement> | null = null;
    private radialIcons: HTMLCollectionOf<HTMLDivElement> | null = null;
    private currentIndex: number = 0; //index of the left most card currently visible
    private currentReel: number = 0;
    private reelAmnt: number = 5;

    constructor() {
        this.teamCards = document.getElementsByClassName("team-card") as HTMLCollectionOf<HTMLLIElement>;
        this.radialIcons = document.getElementsByClassName("team-radial-indicator") as HTMLCollectionOf<HTMLDivElement>;

        this.radialIcons[this.currentReel].classList.toggle('active');
        
        for(let i: number = this.currentIndex; i < this.reelAmnt; i++) {
            this.teamCards[i].classList.add('visible');
        }
    }

    ReelRight() {
        this.toggleIndicator();
        const previousIndex: number = this.currentIndex;

        //cycle the indexes and ensure they remain within the bounds of the reel
        this.currentReel = (this.currentReel + 1) % this.radialIcons!.length;
        this.currentIndex = (this.currentIndex + this.reelAmnt) % this.teamCards!.length;

        this.toggleIndicator();
        this.turnReel(previousIndex);
    }


    ReelLeft() {
        this.toggleIndicator();
        const previousIndex: number = this.currentIndex;

        //cycle the indexes and ensure they remain within the bounds of the reel
        this.currentReel = (this.currentReel - 1 + this.radialIcons!.length) % this.radialIcons!.length;
        this.currentIndex = (this.currentIndex - this.reelAmnt + this.teamCards!.length) % this.teamCards!.length;

        this.toggleIndicator();
        this.turnReel(previousIndex);
    }

    private toggleIndicator() {
        this.radialIcons![this.currentReel].classList.toggle('active');
    }

    private turnReel(previousIndex: number) {

        //untoggle the ones already showing
        for(let i: number = previousIndex; i < previousIndex + this.reelAmnt; i++) {
            this.teamCards![i].classList.remove('visible');
        }

        //toggle new ones
        for(let i: number = this.currentIndex; i < this.currentIndex + this.reelAmnt; i++) {
            this.teamCards![i].classList.add('visible');
        }

        const teamContainer = document.getElementById('team-section-list');
        teamContainer?.classList.add('clear-background');

        setTimeout(() => {
            teamContainer?.classList.remove('clear-background');
        }, 200);
    }
}

Start();