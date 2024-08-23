class MenuItemsBuilder
  def cache_time
    10
  end

  def access_modified_at(request)
    File.mtime(Rails.root.join("config/application.rb"))
  end

  def call(request)
    {
      label: "Learning Dojo",
      items: [
        {
          label: "Classes",
          url: "http://example.com/classes"
        },
        {
          label: "Students",
          url: "http://example.com/students"
        }
      ]
    }
  end
end
