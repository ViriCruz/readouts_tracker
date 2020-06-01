Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :categories, only: [:index]
      resources :categories, only: [] do
        resources :measurements
        resources :readings, only: [:index, :create, :update, :destroy]    
      end
    end
  end
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'api/v1/users#create'
  get "api/v1/categories/:category_id/readings/total_time/:day", to: 'api/v1/readings#total_time', as: 'total_time'
  get "api/v1/measurements/:day", to: 'api/v1/measurements#index', as: 'measurements'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
