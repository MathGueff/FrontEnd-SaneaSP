import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    //Verifica se o localStorage está disponível enquanto carrega a página para evitar erro SSR 
    verifyLocalStorageAvailable() : boolean{
        return typeof window !== 'undefined' && !!window.localStorage;
    }

    get(item : string){
        if(!this.verifyLocalStorageAvailable()) return null

        try {
            return localStorage.getItem(item)
        } catch (error) {
            console.warn(error)
            return null
        }    
    }

    set(item : string, value : string){
       if(!this.verifyLocalStorageAvailable()) return
        
        try {
            localStorage.setItem(item,value)
        } catch (error) {
            console.warn(error)
        }    
    }

    remove(item : string){
        if(!this.verifyLocalStorageAvailable()) return
        
        try {
            localStorage.removeItem(item)
        } catch (error) {
            console.warn(error)
        }    
    }
}