# frozen_string_literal: true

Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, only: [ :index, :show, :create, :update, :destroy ], param: :slug do
      collection do
        get :mine
      end
    end
    resources :categories, only: [ :index, :create ]
    resources :users, only: [ :create ]
    resource :session, only: [ :create, :destroy ]
  end
  root "home#index"
  get "*path", to: "home#index", via: :all
end
