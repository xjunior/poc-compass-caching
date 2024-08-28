class MenuItemsBuilder
  def cache_time
    50
  end

  def access_modified_at(request)
    File.mtime(Rails.root.join("config/application.rb"))
  end
  
  def call(request)
    [
      {
        label: "Runway",
        items: [
          {
            label: "Groups",
            url: "http://example.com/groups"
          },
          {
            label: "Teams",
            url: "http://example.com/teams"
          }
        ]
      }
    ]
  end
end
