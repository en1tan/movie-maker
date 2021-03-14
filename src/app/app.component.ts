import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from './main.service';

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
  movieData: IMovieDetails;
  movies: IMovieDetails[];
  newMovieForm: FormGroup;
  link = "";
  name = "";

  ngOnInit() {
    this.getAllMovies();

    this.newMovieForm = this.fb.group({
      link: ["", Validators.required],
      name: ["", Validators.required]
    });
  }

  getAllMovies() {
    this.service.getAllMovies().subscribe((res) => {
      this.movies = res.data
    })

  }

  saveMovie(form: IMovieData) {
    this.movieData = null;
    this.service.saveMovie(form).subscribe((res) => {
      this.movieData = res.data
      this.newMovieForm.reset();
      this.getAllMovies();
    })
  }
}
