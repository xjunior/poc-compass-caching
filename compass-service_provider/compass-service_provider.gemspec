require_relative "lib/compass/service_provider/version"

Gem::Specification.new do |spec|
  spec.name        = "compass-service_provider"
  spec.version     = Compass::ServiceProvider::VERSION
  spec.authors     = [ "Write your name" ]
  spec.email       = [ "Write your email address" ]
  spec.homepage    = "http://powerhrg.com"
  spec.summary     = "Summary of Compass::ServiceProvider."
  spec.description = "Description of Compass::ServiceProvider."
  spec.license     = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the "allowed_push_host"
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  # spec.metadata["allowed_push_host"] = "Set to 'http://mygemserver.com'"

  spec.metadata["homepage_uri"] = spec.homepage
  # spec.metadata["source_code_uri"] = "Put your gem's public repo URL here."
  # spec.metadata["changelog_uri"] = "Put your gem's CHANGELOG.md URL here."

  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]
  end

  spec.add_dependency "rails", ">= 7.2.0"
end
