require "compass/service_provider/version"
require "compass/service_provider/engine"

module Compass
  module ServiceProvider
    mattr_accessor :menu_items, default: ->(*) { [] }
  end
end
