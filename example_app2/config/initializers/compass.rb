Rails.application.config.to_prepare do
  Compass::ServiceProvider.menu_items = MenuItemsBuilder.new
end
