Compass::ServiceProvider::Engine.routes.draw do
  get "menu" => "menu#index"
  options "menu" => "menu#cors"
end
