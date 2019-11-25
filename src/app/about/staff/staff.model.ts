export interface StaffArray {
  staffArray: [
    StaffImage
  ];
  deaconArray: [
    StaffImage
  ];
}

export interface StaffImage {
  img: string;
  alt: string;
  name: string;
  position: string;
  description: string;
}
