import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

export interface Language {
  id: string;
  title: string;
}


@Component({
  selector: 'app-header-language',
  templateUrl: './header-language.component.html',
  styleUrls: ['./header-language.component.scss']
})
export class HeaderLanguageComponent implements OnInit {
  languages: Language[] = [
    {
      id: 'ar',
      title: 'Arabic'
    },
    {
      id: 'cn',
      title: 'Chinese'
    },
    {
      id: 'en',
      title: 'English'
    },
    {
      id: 'es',
      title: 'Española'
    },
    {
      id: 'fr',
      title: 'French'
    },
    {
      id: 'de',
      title: 'German'
    },
    {
      id: 'hk',
      title: 'Hong Kong'
    },
    {
      id: 'jp',
      title: 'Japanese'
    },
    {
      id: 'kr',
      title: 'Korea'
    }
  ];
  selectedLanguage: Language;

  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }

  ngOnInit() {
    this.selectedLanguage = this.languages.find(l => l.id === this.translate.currentLang);
  }

  setLanguage(lang: Language) {
    this.selectedLanguage = lang;
    this.translate.use(lang.id);
  }

}
