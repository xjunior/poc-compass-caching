module Compass
  module ServiceProvider
    class MenuController < ApplicationController
      before_action :configure_cors
      skip_forgery_protection
      
      def index
        if stale?(last_modified: ServiceProvider.menu_items.access_modified_at(request).utc, etag: "hello")
          headers["Cache-Control"] = "max-age=10, public"
          render json: ServiceProvider.menu_items.call(request)
        else
          Rails.logger.debug("Cache hit! " * 10)
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
