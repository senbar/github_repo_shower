# GithubRepoShower

You can either run this app as production from docker or ng development server

## Docker build


First build image
`docker build -t repo-shower-image .`

Then run it
`docker run --name repo-shower-container -d -p 8080:80 repo-shower-image`

Website should be visible under `localhost:8080`

## Angular build 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

