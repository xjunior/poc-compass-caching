class MenuItemsBuilder
  def access_modified_at(request)
    1.days.ago
  end
  
  def call(request)
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
  end
end
