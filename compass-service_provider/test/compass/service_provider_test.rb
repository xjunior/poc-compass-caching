require "test_helper"

class Compass::ServiceProviderTest < ActiveSupport::TestCase
  test "it has a version number" do
    assert Compass::ServiceProvider::VERSION
  end
end
