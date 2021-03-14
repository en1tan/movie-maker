import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService, IResponseData } from './main.service';

export interface IMovieData {
  name: String;
  link: String;
};

export interface IMovieDetails {
  title: string;
  poster: string;
  link: string;
  genre: string;
  type: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: MainService) { }
  response: IResponseData;
  movies: IMovieDetails[];
  newMovieForm: FormGroup;
  link = "";
  name = "";
  loggedIn: boolean = false;
  isLoading: boolean;

  ngOnInit() {
    this.getAllMovies();

    this.newMovieForm = this.fb.group({
      link: ["", Validators.required],
      name: ["", Validators.required]
    });
  }

  getAllMovies() {
    this.isLoading = !this.isLoading;
    this.service.getAllMovies().subscribe((res) => {
      this.movies = res.data;
      this.isLoading = !this.isLoading;
    })
  }

  saveMovie(form: IMovieData) {
    this.isLoading = !this.isLoading;
    this.service.saveMovie(form).subscribe((res) => {
      this.response = res;
      this.newMovieForm.reset();
      this.getAllMovies();
      this.isLoading = !this.isLoading;
    })
  }

  toggleStatus() {
    this.loggedIn = !this.loggedIn;
  }
}
