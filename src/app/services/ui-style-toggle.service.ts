import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {StorageService} from "./local-storage.service";


export enum ThemeMode {
  DEFAULT, DARK, LIGHT
}

/**
 * @author Chad Wilson
 * @description UI style/theme toggle service
 * @module services/ui-style-toggle.service
 **/
@Injectable()
export class UiStyleToggleService {

  public theme$ = new BehaviorSubject<ThemeMode>(ThemeMode.DEFAULT);
  private readonly THEME_KEY = 'THEME';
  private readonly DARK_THEME_VALUE = 'DARK';
  private readonly LIGHT_THEME_VALUE = 'LIGHT';
  private readonly DARK_THEME_CLASS_NAME = 'theme-dark';
  private darkThemeSelected = false;

  constructor(private storage: StorageService) {}

  /*
    If the browser supports matchMedia and the user hasnt specified a theme, 
    we will use prefers-color-scheme to determine which theme to default to.
  */
  public setThemeOnStart() {
    if(this.isThemeSet()) {
      if(this.isDarkThemeSelected()) {
        this.setDarkTheme();
      } else {
        this.setLightTheme();
      }
    }
    // If the browser supports matchMedia and the user hasnt specified a theme
    else if(window.matchMedia) {
      console.log("matchMedia supported set to dark");
      window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? this.setDarkTheme()
        : this.setLightTheme();
    } 
    // Default to dark theme if the browser doesnt support matchMedia
    else if(!window.matchMedia || !this.isThemeSet()) {
      this.setDarkTheme();
    }
    setTimeout(() => {
      document.body.classList.add('animate-colors-transition');
    }, 500);
  }

  public toggle() {
    if (this.darkThemeSelected) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  public isDarkThemeSelected(): boolean {
    this.darkThemeSelected = this.storage.get(this.THEME_KEY) === this.DARK_THEME_VALUE;
    return this.darkThemeSelected;
  }
  public isLightThemeSelected(): boolean {
    return this.storage.get(this.THEME_KEY) === this.LIGHT_THEME_VALUE;
  }
  public isDefaultThemeSelected(): boolean {
    return this.storage.get(this.THEME_KEY) === "DEFAULT";
  }
  public isThemeSet(): boolean {
    return this.storage.get(this.THEME_KEY) === "DARK" || this.storage.get(this.THEME_KEY) === "LIGHT";
  }

  private setLightTheme() {
    this.storage.set(this.THEME_KEY, this.LIGHT_THEME_VALUE);
    document.body.classList.remove(this.DARK_THEME_CLASS_NAME);
    this.darkThemeSelected = false;
    this.theme$.next(ThemeMode.LIGHT);
  }

  private setDarkTheme() {
    this.storage.set(this.THEME_KEY, this.DARK_THEME_VALUE);
    document.body.classList.add(this.DARK_THEME_CLASS_NAME);
    this.darkThemeSelected = true;
    this.theme$.next(ThemeMode.DARK);
  }

}
