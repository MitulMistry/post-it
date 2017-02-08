source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 4.2', '>= 4.2.7.1'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

#gem 'bootstrap-sass'
gem 'bootstrap', '~> 4.0.0.alpha3' #bootstrap 4

source 'https://rails-assets.org' do #goes along with bootstrap ruby gem
  gem 'rails-assets-tether', '>= 1.1.0'
end

gem 'devise'
gem 'active_model_serializers'
#gem 'kaminari'
#gem 'airbrake'
gem 'faker'
#gem 'friendly_id'
#gem 'omniauth-facebook'
gem 'jquery-turbolinks' #fix issues with javascript executing through turbolinks

group :development, :test do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  gem "rspec-rails"
  gem "capybara"
  #gem "selenium-webdriver"
  #gem "better_errors"
  #gem "sprockets_better_errors"
  #gem "binding_of_caller"
  #gem "factory_girl_rails"
  #gem "simplecov"
  #gem "database_cleaner"
  gem "pry"
  #gem "rack_session_access"

  #gem "launchy"
  #gem "capybara-webkit"
  #gem "guard-rspec", require: false
  #gem "thin"

  #gem 'dotenv-rails'
end

group :production do
  #gem "pg"
  #gem "google-analytics-rails"
  #gem "rails_12factor"
end
