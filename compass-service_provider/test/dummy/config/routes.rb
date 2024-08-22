Rails.application.routes.draw do
  mount Compass::ServiceProvider::Engine => "/compass-service_provider"
end
