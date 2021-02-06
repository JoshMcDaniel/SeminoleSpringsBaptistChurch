export interface SSBCEvents {
  events: Event[];
  services: Event[];
}

export interface SSBCEvent {
  id?: string;
  event_title: string;
  event_description: string;
  event_date: string;
  event_time: string;
  event_image_path: string;
}

export interface ManageEventsDialogInput {
  event: SSBCEvent;
  isEdit: boolean;
}

export interface EventsResponse {
  // Would prefer this to be SSBCEvent[] but express uses _id by default
  events: any[];
}
