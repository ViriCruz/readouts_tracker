Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :categories, only: [:index]
      resources :measurements, only: [:index]
      resources :categories do
        resources :measurements
        resources :readings, only: [:index, :create, :update, :destroy]    
      end
    end
  end
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'api/v1/users#create'
  get "api/v1/categories/:category_id/readings/total_time", to: 'api/v1/readings#total_time', as: 'total_time'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
