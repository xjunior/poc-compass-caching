module Compass
  module ServiceProvider
    class MenuController < ApplicationController
      before_action :configure_cors
      skip_forgery_protection
      
      def index
        Rails.logger.debug("Request time " + Time.current.to_s)
        Rails.logger.debug("Max age " + ServiceProvider.menu_items.cache_time.to_s + " seconds")
        Rails.logger.debug("Last modified at " + ServiceProvider.menu_items.access_modified_at(request).utc.to_s)

        if stale?(last_modified: ServiceProvider.menu_items.access_modified_at(request).utc, etag: "hello")
          headers["Cache-Control"] = "max-age=10, public"
          render json: ServiceProvider.menu_items.call(request)
        else
          Rails.logger.debug("Cache hit!")
        end
      end

      def cors
        head :ok
      end
      
    private

      def configure_cors
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Cache-Control'
      end
    end
  end
end
