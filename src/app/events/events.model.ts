export interface Events {
  events: [
    Event
  ];
}

export interface Event {
  event_title: string;
  event_description: string;
  event_date: string;
  event_time: string;
  event_image: string;
  image_description: string;
}
