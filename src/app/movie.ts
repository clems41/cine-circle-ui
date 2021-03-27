import { Rating } from './rating';

export interface Movie {
	id:       string;
	title:    string;
	year:     string;
	released: Date;
	runtime:  number;
	genres:    string[];
	directors: string[];
	writers:   string[];
	actors:   string[];
	plot:     string;
	languages: string[];
	countries:  string[];
	awards:   string;
	poster:   string;
	userRatings:  Rating[];
	pressRatings:  Rating[];
	metascore:  string;
	imdbvotes:  string;
	type:       string;
	dvd:        Date;
	boxOffice:  number;
	boxOfficeCurrency:  string;
	productions: string[];
	website:    string;
	totalSeasons: number;
  }

  export interface MovieShort {
	  id:       string;
	  title:    string;
	  year:     string;
	  poster:   string;
	  type:     string;
	}


export interface MovieSearch {
	totalResults: number;
	search:    MovieShort[];
  }