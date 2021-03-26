import { Rating } from './rating';

export interface Movie {
	ID:       string;
	Title:    string;
	Year:     string;
	Released: Date;
	Runtime:  number;
	Genres:    string[];
	Directors: string[];
	Writers:   string[];
	Actors:   string[];
	Plot:     string;
	Languages: string[];
	Countries:  string[];
	Awards:   string;
	Poster:   string;
	UserRatings:  Rating[];
	PressRatings:  Rating[];
	Metascore:  string;
	Imdbvotes:  string;
	Type:       string;
	Dvd:        Date;
	BoxOffice:  number;
	BoxOfficeCurrency:  string;
	Productions: string[];
	Website:    string;
	TotalSeasons: number;
  }

  export interface MovieShort {
	  ID:       string;
	  Title:    string;
	  Year:     string;
	  Poster:   string;
	  Type:     string;
	}


export interface MovieSearch {
	TotalResults: number;
	Search:    MovieShort[];
  }