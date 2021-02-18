import { makeAutoObservable } from 'mobx';

const tft:boolean[]=[true,true,true,true,true,true,true,true]

export class FilterStore {
    // sidebarOpen = true;
    //
    filterArray2=tft

    constructor() {
        makeAutoObservable(this);
    }

    setFilterArray(index:number):void{
        this.filterArray2[index]=!this.filterArray2[index]
    }

    //
    // setSidebarOpen(isOpen: boolean): void {
    //     this.sidebarOpen = isOpen;
    // }
}

const filterStore = new FilterStore();

export default filterStore;
