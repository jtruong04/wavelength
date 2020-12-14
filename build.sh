docker build -t wavelength .
heroku login --interactive
heroku container:login
heroku container:push web -a wvlngth
heroku container:release web -a wvlngth