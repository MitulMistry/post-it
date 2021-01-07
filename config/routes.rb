Rails.application.routes.draw do
  devise_for :users
  resources :tags, except: [:new, :edit]
  resources :notes, except: [:new]
  root 'home#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html  
end
