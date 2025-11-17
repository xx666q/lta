

export interface Order {
  id: string;
  orderId: string;
  ownerName: string;
  ownerAvatar: string;
  petName: string;
  petAvatar: string;
  petAge: string;
  serviceType: string;
  serviceTime: string;
  status: 'pending' | 'ongoing' | 'completed' | 'cancelled';
  statusText: string;
}

export interface OrderDetail {
  orderId: string;
  ownerName: string;
  ownerPhone: string;
  petName: string;
  petBreed: string;
  petAge: string;
  serviceType: string;
  startTime: string;
  endTime: string;
  status: string;
  specialRequests: string;
  contactInfo: string;
}

