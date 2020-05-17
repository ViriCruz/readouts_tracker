Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :categories, only: [:index]
      resources :measurements, only: [:index]
      resources :categories do
        resources :measurements
        resources :readings    
      end
      # resources :users, only: [:create] do
        
      # end
    end
  end
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'api/v1/users#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
