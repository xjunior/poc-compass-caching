module Compass
  module ServiceProvider
    class Engine < ::Rails::Engine
      isolate_namespace Compass::ServiceProvider
    end
  end
end
