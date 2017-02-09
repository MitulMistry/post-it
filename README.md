# Post-It

## Intro
Post-It is a simple note taking application built using a [jQuery][jquery] front end and a [Rails][rails] back end. The front end leverages AJAX to handle user requests spontaneously, communicating to a serialized JSON back end.

## Demo App
You can see a demo version of the application deployed to Heroku here: https://rails-post-it.herokuapp.com/

## Functionality
Once users have set up an account, they can create notes with text and save them without a page reload. Notes can also be sorted by tags.

## Application Info
- Authentication (user registration and login) is handled by the [Rails Devise][devise] gem.
- The back end uses [ActiveRecord][active-record] as the ORM and [ActiveModelSerializers][serializers] for serializing responses as JSON. It uses [PostgreSQL][postgres] for the database via the [pg gem][pg].
- The front end leverages Bootstrap 4 via the [Bootstrap gem][bootstrap-gem] in conjunction with Rails ERB templates. Styling uses [SCSS][scss].

## Install Instructions
To get the application running, install dependencies from the [Gemfile][gemfile] via [Bundler][bundler] by running `bundle install`.

Since the application uses PostgreSQL, you need to have it installed locally on your machine with a user that has table creation privileges. You can get further instructions [here][postgres-local-setup]. If you'd rather not bother with PostgreSQL, you can use an older version of the application that uses SQLite3 [here][old-version-1].

Create the database with `bundle exec rake db:create` and run migrations with `bundle exec rake db:migrate`. You can run `bundle exec rake db:seed` to populate the database with some sample data. Run  `bundle exec rails c` to bring up the console, type in `User.last` to get the last created user's email and you can use that to login with the password "password" and see some sample notes and tags.

## More Info
For more, see this post: http://mitulmistry.github.io/javascript/rails/jquery-rails-app/

[jquery]: https://jquery.com/
[rails]: http://rubyonrails.org/
[devise]: https://github.com/plataformatec/devise
[active-record]: http://guides.rubyonrails.org/active_record_basics.html
[serializers]: https://github.com/rails-api/active_model_serializers
[postgres]: https://www.postgresql.org/
[pg]: https://github.com/ged/ruby-pg
[bootstrap-gem]: https://github.com/twbs/bootstrap-rubygem
[scss]: http://sass-lang.com/
[bundler]: http://bundler.io/
[gemfile]: https://github.com/MitulMistry/post-it/blob/master/Gemfile
[postgres-local-setup]: https://devcenter.heroku.com/articles/heroku-postgresql#local-setup
[old-version-1]: https://github.com/MitulMistry/post-it/tree/0f0001c8e054f6bc3d0da4cb5e98fc4c7a1f1c97
