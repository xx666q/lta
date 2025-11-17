

export interface Order {
  id: string;
  serviceType: 'daycare' | 'weekcare' | 'hourcare';
  petType: 'dog' | 'cat' | 'small';
  price: number;
  publishTime: string;
  owner: {
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
  };
  pet: {
    name: string;
    avatar: string;
    age: number;
    gender: 'male' | 'female';
    breed: string;
  };
  serviceTime: {
    startDate: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    duration: string;
  };
  specialRequest: string;
}

export type FilterType = 'service-type' | 'pet-type' | 'price';
export type FilterValue = 'all' | 'daycare' | 'weekcare' | 'hourcare' | 'dog' | 'cat' | 'small' | 'low' | 'medium' | 'high';

export type RejectReason = 'time-conflict' | 'pet-type' | 'distance' | 'other';

