Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :measurements
      resources :categories, only: [:index]
      resources :users do
        resources :categories do
          resources :readings    
        end
      end
    end
  end
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
