# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

# temporary fix to yarn installation issue on production deployment
# https://github.com/rails/rails/issues/40795
Rake::Task["yarn:install"].clear

namespace :yarn do
  task :install do
    # Do nothing, since there's no yarn
  end
end